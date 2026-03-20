import { useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { Button, Input, Spin } from 'antd'
import { theme } from '../styles/theme'
import { useTelegramId } from '../hooks/useTelegramId'
import NotificationModal from './NotificationModal'
import { getApiBaseUrl } from '../lib/api'

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

const TelegramVerificationModal = () => {
  // null = checking, true = show, false = hide
  const [isVisible, setIsVisible] = useState<boolean | null>(null)
  const [key, setKey] = useState('')
  const telegramId = useTelegramId()
  const queryClient = useQueryClient()

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
  )
}

export default TelegramVerificationModal

