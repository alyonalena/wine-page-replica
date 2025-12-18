import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
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

const AgeTitle = styled.h2`
  font-size: 64px;
  font-weight: 300;
  margin: 0 0 24px;
  color: ${theme.colors.foreground};
`;

const ModalText = styled.p`
  font-size: 15px;
  color: ${theme.colors.muted};
  margin: 0 0 32px;
  line-height: 1.6;
  
  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ConfirmButton = styled(Button)`
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
`;

const AgeVerificationModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (!verified) {
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <AgeTitle>18+</AgeTitle>
        <ModalText>
          Для доступа на сайт необходимо подтвердить свое совершеннолетие и согласие на{' '}
          <a href="#">обработку файлов cookies</a>
        </ModalText>
        <ConfirmButton type="primary" onClick={handleConfirm}>
          Подтверждаю
        </ConfirmButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AgeVerificationModal;
