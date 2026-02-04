import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { theme } from '../styles/theme';
import { useTelegramId } from '../hooks/useTelegramId';
import NotificationModal from './NotificationModal';

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
  const [isVisible, setIsVisible] = useState<boolean | null>(null); // null = checking, true = show, false = hide
  const [key, setKey] = useState('');
  const telegramId = useTelegramId();
  const queryClient = useQueryClient();
  const [notificationModal, setNotificationModal] = useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    content: React.ReactNode;
  }>({
    isVisible: false,
    type: 'info',
    content: null,
  });

  // Fetch all persons to check if user exists
  const { data: persons, isLoading: isLoadingPersons } = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await fetch('https://vfqc-bc18-fu02.gw-1a.dockhost.net/api/persons/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        return []
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  // Check if user exists in persons list
  const userExists = useMemo(() => {
    if (!persons || isLoadingPersons) return false;
    return persons.some((person: any) => 
      person.telegram_id !== null && person.telegram_id !== undefined && Number(person.telegram_id) === telegramId
    );
  }, [persons, isLoadingPersons, telegramId]);

  // Mutation to bind telegram
  const bindTelegramMutation = useMutation({
    mutationFn: async ({ telegramId, key }: { telegramId: number; key: string }) => {
      const response = await fetch('https://vfqc-bc18-fu02.gw-1a.dockhost.net/api/auth/bind-telegram/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegram_id: telegramId,
          key: key,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Ошибка при отправке запроса' }));
        throw new Error(errorData.detail || 'Ошибка при отправке запроса');
      }
      return response.json();
    },
    onSuccess: async () => {
      setNotificationModal({
        isVisible: true,
        type: 'success',
        content: 'Успешная верификация! Добро пожаловать!',
      });
      localStorage.setItem('telegramVerified', 'true');
      setIsVisible(false);
      // Invalidate and refetch persons to update the list
      await queryClient.invalidateQueries({ queryKey: ['persons'] });
      // Small delay to ensure data is updated before checking again
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ['persons'] });
      }, 500);
    },
    onError: (error: any) => {
      setNotificationModal({
        isVisible: true,
        type: 'error',
        content: error.message || 'Неверный ключ. Пожалуйста, попробуйте снова.',
      });
    },
  });

  useEffect(() => {
    // Don't check if mutation is in progress
    if (bindTelegramMutation.isPending) {
      return;
    }

    // Check if already verified in localStorage first
    const verified = localStorage.getItem('telegramVerified');
    if (verified === 'true') {
      setIsVisible(false);
      return;
    }

    // Wait for persons data to load
    if (isLoadingPersons) {
      setIsVisible(null);
      return;
    }

    // Once data is loaded, check if user exists
    if (userExists) {
      // User exists, mark as verified and hide modal
      localStorage.setItem('telegramVerified', 'true');
      setIsVisible(false);
    } else {
      // User doesn't exist, show verification modal
      setIsVisible(true);
    }
  }, [persons, isLoadingPersons, telegramId, userExists, bindTelegramMutation.isPending]);

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
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  // Don't render anything while checking
  if (isVisible === null || !isVisible) return null;

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
  );
};

export default TelegramVerificationModal;

