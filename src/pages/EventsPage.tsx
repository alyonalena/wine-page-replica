import { useState } from 'react'
import { Breadcrumb, Typography, Image, Button, Space, Flex, Spin, Avatar, Divider } from 'antd'
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
import backIcon from '../pics/actions/back.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px 16px;
`

const BreadcrumbWrapper = styled.div`
  margin-bottom: 24px;
  
  .ant-breadcrumb-link a {
    color: ${theme.colors.muted};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  line-height: 0.8;
`

const PageTitle = styled(Typography.Title)`
  animation: slideUp 0.4s ease;
`

const ResultsCount = styled.span`
  color: ${theme.colors.primary};
  font-size: 0.9rem;
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
const Title = styled.span`
  color: ${theme.colors.primary};
  font-size: 1.3rem;
`

const ProductCard = styled(Link)`
  background: ${theme.colors.background};
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: ${theme.transitions.default};
  position: relative;
  text-decoration: none;
  display: block;
`

const AddToCartButton = styled(Button)`
  margin: 8px;
  width: 100%;
  height: 40px;
  font-weight: 500;
`

const ProductName = styled.span`
  font-size: 1.2rem;
  color: ${theme.colors.foreground};
  margin: 16px 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ImportantInfo = styled.span`
    font-size: 1.2rem;
  color: ${theme.colors.primary};
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
          <BreadcrumbWrapper>
            <Breadcrumb
              items={[
                { title: <Link style={{ textAlign: 'center' }} to="/"><Avatar size={30} src={backIcon}/>&nbsp;На главную страницу</Link> },
              ]}
            />
          </BreadcrumbWrapper>  
          <Divider/>
          <PageHeader>
            <div>
              <PageTitle level={3}>{'Дегустации'}</PageTitle>              
              <ResultsCount>в Москве и Санкт-Петербурге</ResultsCount>
            </div>
          </PageHeader> 
          <ProductsGrid>  
            {events.map((event) => (
              <ProductCard key={event.id} to={`/event/${event.id}`}>
                <Flex style={{ width: '100%', padding: '8px 16px'}} align={'center'}>
                  <ProductName>{event.name}</ProductName>
                </Flex> 
                <Flex style={{ width: '100%', padding: '8px 16px'}} align={'flex-start'} gap={8}>
                  <div style={{ padding: 0, margin: 0, minWidth: 130}}>
                      <Avatar 
                        alt="SX" 
                        src={event.image}
                        style={{ width: 130, height: 130 }} 
                      />
                  </div>
                  <Flex 
                      vertical
                      style={{ height: '100%',textAlign: 'left' }}
                    >
                      <div>
                         
                      <ImportantInfo>
                            {formatDateTime(event.date, event.time || '19:00')}
                          </ImportantInfo>
                          <Space style={{ gap:4, lineHeight: '0.9' }}>
                            <Typography.Text type='secondary'>{event.city.name} • {event.place} • {event.address}</Typography.Text>
                          </Space><br/>
                      </div>
                  </Flex> 
                </Flex>
                <AddToCartButton type="primary" onClick={(e) => handleAddToCart(e, event.id)}>
                  Хочу на эту дегустацию <Avatar src={cheers}/>
                </AddToCartButton>
              </ProductCard>
            ))}
          </ProductsGrid>
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
        <Footer />
      </PageWrapper>
  )
}

export default EventsPage
