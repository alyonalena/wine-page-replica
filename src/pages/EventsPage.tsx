import { useState } from 'react'
import { Typography, Image, Button, Space, Flex, Spin, Avatar, Divider } from 'antd'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { useTelegramId } from '../hooks/useTelegramId'
import NotificationModal from '../components/NotificationModal'
import { TG_API_BASE_URL } from '../lib/api'
import { formatDateTime } from '../lib/date'
import cheers from '../pics/actions/cheers.svg'
import backIcon from '../pics/logo.png'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px 100px;
`

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
`

const BackButton = styled(Button)`
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  line-height: 0.8;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
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

const PageTitle = styled.div`
  animation: slideUp 0.4s ease;
  color: ${theme.colors.foreground};
  font-weight: bold;  
  font-size: 1.6rem;
  margin: 8px 16px;
`

const ResultsCount = styled.span`
  color: ${theme.colors.muted};
  font-size: 0.8rem;
  margin: 0 32px;
`

const ProductCard = styled(Link)`
  background: ${theme.colors.lightBg};
  border-radius: 3px;
  border: 1px solid ${theme.colors.border};
  text-decoration: none;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
`

const AddToCartButton = styled(Button)`
  margin: 0;
  width: 100%;
  height: 40px;
  font-weight: 500;
`

const ProductName = styled.span`
  color: ${theme.colors.foreground};
  font-size: 2rem;
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ImportantInfo = styled.span`
  color: ${theme.colors.primary};
  margin: 0 0 16px;
  overflow: hidden;
  font-weight: bold;
`

const EventsPage = () => {
  const telegramId = useTelegramId();
  const [notificationModal, setNotificationModal] = useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    content: React.ReactNode;
    icon?: React.ReactNode;
  }>({
    isVisible: false,
    type: 'info',
    content: null,
  });
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch(`${TG_API_BASE_URL}/events/`, {
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
  const showSuccessNotification = () => {
    setNotificationModal({
      isVisible: true,
      type: 'success',
      content: <>Спасибо за интерес!<br/><br/>SX Wine свяжется с Вамим в ближайшее время</>,
      icon: <Avatar src={cheers} style={{backgroundColor: '#E7014C', padding: '10px'}} size={70}/>,
    });
  };

  const mutation = useMutation({
    mutationFn: async ({ eventId, telegramId }: { eventId: number; telegramId: number }) => {
      const response = await fetch(`${TG_API_BASE_URL}/notifications/event-interest/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: eventId,
          telegram_id: telegramId,
        }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: (data) => {
      console.log('Event interest notification sent successfully:', data)
      showSuccessNotification()
    },
    onError: (error) => {
      console.error('Error sending event interest notification:', error)
      setNotificationModal({
        isVisible: true,
        type: 'error',
        content: 'Произошла ошибка при отправке запроса. Попробуйте позже.',
      })
    },
  })
  
  const handleAddToCart = (e: React.MouseEvent, eventId: number) => {
    e.preventDefault()
    e.stopPropagation()
    
    mutation.mutate({
      eventId: eventId,
      telegramId: telegramId,
    })
  }

  const getContent = () => {
    if (isError) {
      return (
        <Flex style={{ alignItems: 'center', height: '100vh'}}>
          <Typography.Title>Oops! Something went wrong</Typography.Title>
        </Flex>
      )
    }
    if (isLoading) {
      return (
        <Flex style={{ alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%'}}>
          <Spin/>
        </Flex>
      )
    } else {
      return (
        <Container>
          <NotificationModal
            isVisible={notificationModal.isVisible}
            onClose={() => setNotificationModal({ ...notificationModal, isVisible: false })}
            type={notificationModal.type}
            content={notificationModal.content}
            icon={notificationModal.icon}
          />
          <PageHeader>
            <div>
              <PageTitle>Дегустации</PageTitle>              
              <ResultsCount>в Москве и Санкт-Петербурге</ResultsCount>
            </div>
          </PageHeader> 
          <ProductsGrid>  
            {events.sort((a, b) => new Date(a.date) > new Date(b.date)).map((event) => (
              <ProductCard key={event.id} to={`/event/${event.id}`}>
                <Flex style={{ width: '100%', padding: '8px 16px'}} align={'center'}>
                  <ProductName>{event.name}</ProductName>
                </Flex> 
                <Flex style={{ width: '100%', padding: '8px 16px'}} align={'flex-start'} gap={16}>
                  <div style={{ padding: 0, margin: 0, minWidth: 130}}>
                      <Avatar 
                        alt="SX" 
                        src={event.image.replace('http', 'https')}
                        style={{ width: 130, height: 130, boxShadow: '2px 5px 8px rgba(0, 0, 0, 0.1)' }} 
                      />
                  </div>
                  <Flex 
                      vertical
                      style={{ height: '100%',textAlign: 'left' }}
                    >
                      <div>        
                          <b>{event.city.name}</b><br/>
                          <ImportantInfo>
                            {formatDateTime(event.date, event.time || '19:00')}
                          </ImportantInfo><br/><br/> 
                          
                          <Space style={{ gap:4, lineHeight: '0.9' }}>
                            <Typography.Text type='secondary'>{event.place} • {event.address}</Typography.Text>
                          </Space>
                      </div>
                  </Flex>                  
                </Flex>
                <br/>
                { new Date(event.date) > new Date() && 
                    (
                      <AddToCartButton type="primary" onClick={(e) => handleAddToCart(e, event.id)}>
                        Хочу на эту дегустацию <Avatar src={cheers}/>
                      </AddToCartButton>
                    )
                }
              </ProductCard>
            ))}
          </ProductsGrid>
          <BottomButtonWrapper>
            <BackButton size="large" onClick={() => window.location.href = '/'}>
              <Avatar size={35} src={backIcon}/>
              На главную страницу
            </BackButton>
          </BottomButtonWrapper>
        </Container>
      )
    }
  }
  
  return (
      <PageWrapper>
        <Header />
        <main>
          {getContent()}
        </main>
      </PageWrapper>
  )
}

export default EventsPage
