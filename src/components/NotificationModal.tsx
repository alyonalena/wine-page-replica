import { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Avatar } from 'antd';
import { theme } from '../styles/theme';

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

const ConfirmButton = styled(Button)`
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

interface NotificationModalProps {
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  duration?: number;
}

const NotificationModal = ({
  isVisible,
  onClose,
  type = 'info',
  title,
  content,
  icon,
  duration = 0,
}: NotificationModalProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case 'success':
        return 'Успешно!';
      case 'error':
        return 'Ошибка';
      case 'warning':
        return 'Внимание';
      default:
        return 'Уведомление';
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ContentWrapper>
          {icon && <div>{icon}</div>}
          <ModalTitle>{getTitle()}</ModalTitle>
          <ModalText>{content}</ModalText>
          <ConfirmButton type="primary" onClick={onClose}>
            Закрыть
          </ConfirmButton>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NotificationModal;

