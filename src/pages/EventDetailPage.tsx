import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Avatar, Button, Tabs, List, Flex, Space, Typography, Spin, Divider } from 'antd'
import { useParams, Link } from 'react-router-dom'
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
import bottle from '../pics/actions/pink.png'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px;
  padding-bottom: 80px;
`

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  background: white;
  border-top: 1px solid ${theme.colors.lightBg};
  box-shadow: 0 -5px 8px rgba(0, 0, 0, 0.2);
`

const BackButton = styled(Button)`
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 24px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`

const ProductInfo = styled.div`
  background: ${theme.colors.lightBg};
  border-radius: 3px;
  border: 1px solid ${theme.colors.border};
  text-decoration: none;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
`

const ButtonsSection = styled.div`
  display: flex;
`

const AddToCartButton = styled(Button)`
  flex: 1;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
`

const TabsSection = styled.div`
  margin: 24px 0 0;
  
  .ant-tabs-nav {
    margin-bottom: 24px;
    
    &::before {
      border-bottom: 1px solid ${theme.colors.border};
    }
  }
  
  .ant-tabs-tab {
    font-size: 16px;
    font-weight: 500;
    color: ${theme.colors.muted};
    padding: 12px 0;
  }
  
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${theme.colors.foreground} !important;
  }
  
  .ant-tabs-ink-bar {
    background: ${theme.colors.primary};
    height: 3px;
  }
`
const ProductName = styled.span`
  color: ${theme.colors.foreground};
  font-weight: bold;
  font-size: 2rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ImportantInfo = styled.span`
  color: ${theme.colors.primary};
  font-weight: bold;
  margin: 0 0 16px;
  overflow: hidden;
`


const EventDetailPage = () => {
  const { id } = useParams()
  const [selectedEvent, setSelectedEvent] = useState(null)
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
      const response = await fetch(`${TG_API_BASE_URL}/events`, {
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

  const { data: allPersons, isLoading: isLoadingPersons } = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await fetch(`${TG_API_BASE_URL}/persons`, {
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

  // Fetch interested events for each person and filter those interested in current event
  const { data: eventMembers, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['eventMembers', selectedEvent?.id],
    queryFn: async () => {
      if (!selectedEvent?.id || !allPersons) {
        return []
      }

      // Fetch interested events for each person who has a telegram_id
      const personsWithTelegram = allPersons.filter((person: any) => person.telegram_id !== null)
      
      const memberPromises = personsWithTelegram.map(async (person: any) => {
        try {
          const response = await fetch(`${TG_API_BASE_URL}/events/?interested_telegram_id=${person.telegram_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (!response.ok) {
            return null
          }
          const interestedEvents = await response.json()
          // Check if current event is in their interested events
          const isInterested = interestedEvents.some((event: any) => event.id === selectedEvent.id)
          return isInterested ? person : null
        } catch (error) {
          return null
        }
      })

      const results = await Promise.all(memberPromises)
      return results.filter((person) => person !== null)
    },
    enabled: !!selectedEvent?.id && !!allPersons,
  })

  useEffect(() => {
    const event = events?.find(w => w.id === Number(id))
    setSelectedEvent(event)
  }, [ events, id ])

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
  
  const telegramId = useTelegramId()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!selectedEvent) {
      return
    }
    
    mutation.mutate({
      eventId: selectedEvent.id,
      telegramId: telegramId,
    })
  }


  const getTabs = () => {
    if (!selectedEvent) {
      return []
    }
    return [
      {
        key: 'set',
        label: 'Винный сет',
        children: (
          <List
            itemLayout="horizontal"
            dataSource={selectedEvent?.wine_list || []}
            renderItem={(item: any) => (
              <List.Item>
                  <List.Item.Meta
                      avatar={ item.image ? (
                        <Avatar
                            size={60} 
                            src={item.image.replace('http', 'https')}/>
                        ): (
                          <Avatar 
                            style={{backgroundColor: '#F5F5F5', padding: '10px'}} 
                            size={60} 
                            src={bottle}/>
                        )}
                      title={<>
                        <div>{item.aging ? `${item.name} • ${item.aging}г.`: item.name}</div>
                        <div>{item.producer.name}</div>
                      </>}
                      description={`${item.sugar?.name} • ${item.volume}`}
                  />
              </List.Item>
            )}
          />
        )
      },
      {
        key: 'description',
        label: 'Описание',
        children: (
          <div>
            {selectedEvent.description || '...'}
          </div>
        )
      },
      {
        key: 'members',
        label: 'Участники',
        children: isLoadingMembers || isLoadingPersons ? (
          <Flex style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <Spin />
          </Flex>
        ) : (
          <>
            {eventMembers && eventMembers.length > 0 ? (
              eventMembers.map((member: any) => {
                const initials = `${member.firstname?.[0] || ''}${member.lastname?.[0] || ''}`.toUpperCase() || member.nickname?.[0]?.toUpperCase() || 'U'
                return (
                  <>
                  <Avatar 
                    key={member.id} 
                    style={{backgroundColor: '#E7014C', padding: '10px', margin: '10px'}} 
                    size={30}
                  >
                    {initials}
                  </Avatar>&nbsp;{member.firstname}&nbsp;{member.lastname}
                  </>
                )
              })
            ) : (
              <Typography.Text type="secondary">Пока нет участников</Typography.Text>
            )}
          </>
        ),
      },
    ]
  }
  
  const getContent = () => {

    if (isLoading) {
      return (
        <Flex style={{ alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%'}}>
            <Spin/>
        </Flex>
      )
    }
    if (!selectedEvent) {
      return (
        <PageWrapper>
            <Container>
                <h1>Товар не найден</h1>
                <Link to="/wines">Перейти в коллекцию вин</Link>
            </Container>
        </PageWrapper>
      )
    }
    return (
      <Container>
        <NotificationModal
          isVisible={notificationModal.isVisible}
          onClose={() => setNotificationModal({ ...notificationModal, isVisible: false })}
          type={notificationModal.type}
          content={notificationModal.content}
          icon={notificationModal.icon}
        />
        <ProductLayout>
            <ProductInfo>
              <Flex style={{ width: '100%', padding: '8px 16px'}} align={'center'}>
                  <ProductName>{selectedEvent.name}</ProductName>
                </Flex> 
                <Flex style={{ width: '100%', padding: '8px 16px 24px'}} align={'flex-start'} gap={8}>
                  <div style={{ padding: 0, margin: 0, width: 140}}>
                      <Avatar 
                        alt="SX" 
                        src={selectedEvent.image.replace('http', 'https')}
                        style={{ width: "140px", height: "140px" }} 
                      />
                  </div>
                  <Flex 
                      vertical
                      style={{ height: '100%',textAlign: 'left' }}
                    >
                      <div>
                        <b>{selectedEvent.city.name}</b><br/>
                        <ImportantInfo>
                          {formatDateTime(selectedEvent.date, selectedEvent.time || '19:00')}
                        </ImportantInfo><br/><br/> 
                        
                        <Space style={{ gap:4, lineHeight: '0.9' }}>
                          <Typography.Text type='secondary'>{selectedEvent.place} • {selectedEvent.address}</Typography.Text>
                        </Space>
                      </div>
                  </Flex> 
                </Flex>
                <ButtonsSection>
                    { new Date(selectedEvent.date) > new Date() && 
                      (
                        <AddToCartButton 
                          type="primary" 
                          onClick={(e) => handleAddToCart(e)}
                        >
                          Хочу на эту дегустацию <Avatar src={cheers}/>
                        </AddToCartButton>
                    )}
                </ButtonsSection>
            </ProductInfo>
        </ProductLayout>
        <TabsSection>
            <Tabs items={getTabs()} defaultActiveKey="set" />
        </TabsSection>
        <BottomButtonWrapper>
          <BackButton onClick={() => window.history.back()}>
            <Avatar size={35} src={backIcon}/>
            {' К другим дегустациям'}
          </BackButton>
        </BottomButtonWrapper>
      </Container>
    )
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

export default EventDetailPage
