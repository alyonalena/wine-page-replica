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

const App = () => (
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
        <TelegramVerificationModal />
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
      </ConfigProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
