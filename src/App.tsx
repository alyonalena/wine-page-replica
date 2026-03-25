import { ConfigProvider } from 'antd'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import WinesPage from "./pages/WinesPage"
import EventsPage from "./pages/EventsPage"
import WineDetailPage from "./pages/WineDetailPage"
import UserProfilePage from "./pages/UserProfilePage"
import TeamPage from "./pages/TeamPage"
import AboutClubPage from "./pages/AboutClubPage"
import NotFound from "./pages/NotFound"
import ProducersPage from "./pages/ProducersPage"
import EventDetailPage from "./pages/EventDetailPage"
import ProducerDetailPage from "./pages/ProducerDetailPage"
import ClubRulesPage from './pages/ClubRules'
import SubscriptionPage from './pages/SubscriptionPage'
import TelegramVerificationModal from './components/TelegramVerificationModal'
import { useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { Button, Input, Spin } from 'antd'
import { theme } from './styles/theme'
import { useTelegramId } from './hooks/useTelegramId'
import NotificationModal from './components/NotificationModal'
import { getApiBaseUrl } from './lib/api'

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px;
  max-width: 480px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px;
  color: ${theme.colors.foreground};
`;

const ModalText = styled.p`
  font-size: 15px;
  color: ${theme.colors.muted};
  margin: 0 0 24px;
  line-height: 1.6;
`;

const StyledInput = styled(Input)`
  margin-bottom: 24px;
  height: 48px;
  font-size: 16px;
`;

const ConfirmButton = styled(Button)`
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
`;

const queryClient = new QueryClient()

const App = () => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null)
  const [key, setKey] = useState('')
  const telegramId = useTelegramId()

  const [notificationModal, setNotificationModal] = useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    content: React.ReactNode;
  }>({
    isVisible: false,
    type: 'info',
    content: null,
  })

  // Check if user exists in persons list
 /* const userExists = useMemo(() => {
    if (!persons || isLoadingPersons) return false;
    return persons.some((person: any) => 
      person.telegram_id !== null && person.telegram_id !== undefined && Number(person.telegram_id) === telegramId
    );
  }, [persons, isLoadingPersons, telegramId]);
*/
  // Mutation to bind telegram (verifies user by key)
  const bindTelegramMutation = useMutation({
    mutationFn: async ({ telegramId, key }: { telegramId: number; key: string }) => {
      const response = await fetch(`${getApiBaseUrl()}/auth/bind-telegram/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegram_id: telegramId,
          key: key,
        }),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Ошибка при отправке запроса' }))
        throw new Error(errorData.detail || 'Ошибка при отправке запроса')
      }
      return response.json()
    },
    onSuccess: async () => {
      setNotificationModal({
        isVisible: true,
        type: 'success',
        content: 'Успешная верификация! Добро пожаловать!',
      })
      setIsVisible(false)
    },
    onError: (error: any) => {
      setNotificationModal({
        isVisible: true,
        type: 'error',
        content: error.message || 'Неверный ключ. Пожалуйста, попробуйте снова.',
      })
    },
  })

  const { data: authResult, isLoading: isLoadingValidation, isError: isErrorValidation } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const response = await fetch(`${getApiBaseUrl()}/auth/is_valid_user/?telegram_id=${telegramId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })

  useEffect(() => {

    if (authResult == "OK") {
      setIsVisible(false)
    } else {
      if (isLoadingValidation) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }
  }, [authResult, isLoadingValidation])

  const handleConfirm = () => {
    if (!key.trim()) {
      setNotificationModal({
        isVisible: true,
        type: 'warning',
        content: 'Пожалуйста, введите ключ',
      });
      return;
    }
    bindTelegramMutation.mutate({ telegramId, key });
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  }

  if (isVisible === null || !isVisible) {
    return null
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8B1538',
            borderRadius: 3,
            fontFamily:  'Ubuntu, "times new roman", times, roman, serif'
          },
          components: {
            Rate: {
                starColor: '#E7014C',
            },
            Card: {
              fontFamily:  'Ubuntu, "times new roman", times, roman, serif'
            },
            Message: {
              contentBg: '#ffffff',
              borderRadius: 16,
              paddingContentHorizontal: 48,
              paddingContentVertical: 48,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
              fontSize: 15,
            }
          }
        }}
      >
        <Toaster />
        <Sonner />
        <>
          <NotificationModal
            isVisible={notificationModal.isVisible}
            onClose={() => setNotificationModal({ ...notificationModal, isVisible: false })}
            type={notificationModal.type}
            content={notificationModal.content}
            duration={3000}
          />
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>Верификация пользователя</ModalTitle>
              <ModalText>
                Для доступа к приложению необходимо ввести ключ, предоставленный администратором.
              </ModalText>
              <StyledInput
                placeholder="Введите ключ"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={bindTelegramMutation.isPending}
              />
              <ConfirmButton
                type="primary"
                onClick={handleConfirm}
                loading={bindTelegramMutation.isPending}
              >
                Подтвердить
              </ConfirmButton>
            </ModalContent>
          </ModalOverlay>
        </>
        { authResult == "OK" && (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/wines" element={<WinesPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/wine/:id" element={<WineDetailPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/producers" element={<ProducersPage />} />
              <Route path="/about" element={<AboutClubPage />} />
              <Route path="/event/:id" element={<EventDetailPage />} />
              <Route path="/producer/:id" element={<ProducerDetailPage />} />
              <Route path="/rules" element={<ClubRulesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter> 
        )}     
      </ConfigProvider>
    </TooltipProvider>
  </QueryClientProvider>
)}

export default App
