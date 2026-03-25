import styled from 'styled-components'
import { useState } from 'react'
import { Input, Button, Avatar } from 'antd'
import {
  InstagramOutlined,
} from '@ant-design/icons'

import backIcon from '../pics/logo.png'
import { theme } from '../styles/theme'
import NotificationModal from '../components/NotificationModal'
import { getApiBaseUrl } from '../lib/api'
import { useMutation } from '@tanstack/react-query'
import { useTelegramId } from '../hooks/useTelegramId'

const FooterWrapper = styled.footer`
  background: ${theme.colors.foreground};
  color: white;
  padding: 16px 0 ;
  margin-top: 48px;
`

const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr) 1.5fr;
  gap: 40px;
  margin-bottom: 20px;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const FooterText = styled.p`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.6;
  margin: 0 0 16px;
`

const NewsletterForm = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  
  .ant-input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      border-color: ${theme.colors.primary};
    }
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin: 0 0 16px;
`

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: ${theme.transitions.default};
  
  &:hover {
    background: ${theme.colors.primary};
  }
  
  .anticon {
    font-size: 18px;
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`


const Footer = () => {
  const telegramId = useTelegramId()
  const [notificationModal, setNotificationModal] = useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    content: React.ReactNode;
    icon?: React.ReactNode;
  }>({
    isVisible: false,
    type: 'info',
    content: null,
  })

  const [ email, setEmail ] = useState('')

  const showSuccessNotification = () => {
    setNotificationModal({
      isVisible: true,
      type: 'success',
      content: <>Спасибо за интерес!<br/><br/>Вы будете получать новости на указанный адрес!</>,
      icon: <Avatar src={backIcon} style={{backgroundColor: '#E7014C', padding: '10px'}} size={70}/>,
    });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${getApiBaseUrl()}/notifications/subscribe-interest/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegram_id: telegramId,
          email
        }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: (data) => {
      console.log('Wine interest notification sent successfully:', data)
      showSuccessNotification()
    },
    onError: (error) => {
      console.error('Error sending wine interest notification:', error)
      setNotificationModal({
        isVisible: true,
        type: 'error',
        content: 'Произошла ошибка при отправке запроса. Попробуйте позже.',
      })
    },
  })
  
  const onSaveEmail = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (emailPattern.test(email)) {      
      mutation.mutate()
    } else {
      setNotificationModal({
        isVisible: true,
        type: 'error',
        content: <>Введите корректный адрес</>,
        icon: <Avatar src={backIcon} style={{backgroundColor: '#E7014C', padding: '10px'}} size={70}/>,
      })
    } 
  }

  return (
    <FooterWrapper>
      <NotificationModal
        isVisible={notificationModal.isVisible}
        onClose={() => setNotificationModal({ ...notificationModal, isVisible: false })}
        type={notificationModal.type}
        content={notificationModal.content}
        icon={notificationModal.icon}
      />
      <FooterContainer>
        <FooterGrid>   
          <div>
            <SocialLinks>
              <SocialIcon href="https://www.instagram.com/sx_wine"><InstagramOutlined /></SocialIcon>
            </SocialLinks>
            <FooterText>
              Получайте информацию о новинках, акциях и эксклюзивных предложениях
            </FooterText>
            <NewsletterForm>
              <Input placeholder="Ваш email" value={email} onChange={(e) => setEmail(e.target.value) }/>
              <Button type="primary" onClick={onSaveEmail}>Подписаться</Button>
            </NewsletterForm>            
          </div>
        </FooterGrid>        
        <FooterBottom>
          <FooterText>
            По вопросам разработки обращаться:&nbsp;<br/><strong>info@we-solve.ru</strong>
          </FooterText>
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  )
}

export default Footer
