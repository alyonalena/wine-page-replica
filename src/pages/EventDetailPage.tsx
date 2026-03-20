import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Avatar, Button, Tabs, List, Flex, Space, Typography, Spin, Tooltip } from 'antd'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import { theme } from '../styles/theme'
import { useTelegramId, useUserInfo } from '../hooks/useTelegramId'
import NotificationModal from '../components/NotificationModal'
import { getApiBaseUrl } from '../lib/api'
import { formatDateTime } from '../lib/date'
import cheers from '../pics/actions/cheers.svg'
import backIcon from '../pics/actions/events.png'
import subcrIcon from '../pics/actions/subscr.png'
import bottle from '../pics/actions/pink.png'
import backtoLKIcon from '../pics/actions/back.svg'
import arrowRight from '../pics/actions/arrow-right.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 8px 8px 140px;
`

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
`

const BackButton = styled(Button)`
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  padding: 12px 20px 12px 10px;
  color: #E3E3E3;
  background: rgba(0,0,0,0.8);
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
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  border: 1px solid ${theme.colors.border};
  text-decoration: none;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
`

const ButtonsSection = styled.div`
  display: flex;
`

const AddToCartButton = styled(Button)`
  margin: 0 8px 8px 8px;
  height: 40px;
  box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  width: 100%;
`

const AddToCartButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  z-index: 100;
  padding: 0;
  display: flex;
  justify-content: center;
`

const TabsSection = styled.div`
  margin: 24px 8px 0;
  
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
  font-size: 1.4rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
  text-align: center;
`

const ImportantInfo = styled.span`
  color: ${theme.colors.primary};
  font-weight: bold;
  margin: 0 0 16px;
  overflow: hidden;
`

const Alert = styled.span`
  background: ${theme.colors.wineRose};
  border-left: 1px solid ${theme.colors.primary};
  text-decoration: none;
  box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  padding: 16px;
`

const TotalBlock = styled.div`
  margin: 4px 0;
  padding 0;
  color: ${theme.colors.muted};
  font-weight: 0.9rem;
`

const GoldenBlock = styled.div`
  background: white;
  color: white;
  padding:0 16px;
  margin-bottom: 8px;
  background: #B9013D;
  color: black;
  border-radius: 0.3rem;
  text-align: center;
  font-weight: bold;
  font-size: 0.7rem;
  color: white;
  text-align: center;
`

const TabLabel = styled.span`
  font-size: 11px;
  color: ${theme.colors.muted};
`

const EventDetailPage = () => {
  const { id } = useParams()
  const { isSXPrime } = useUserInfo()
  const navigate = useNavigate()
  const { state } = useLocation()

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
      const response = await fetch(`${getApiBaseUrl()}/events`, {
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
      const response = await fetch(`${getApiBaseUrl()}/persons`, {
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
    const event = events?.find(w => w.id === Number(id))
    setSelectedEvent(event)
  }, [ events, id ])
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

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
      const response = await fetch(`${getApiBaseUrl()}/notifications/event-interest/`, {
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
        label: <TabLabel>Винный сет</TabLabel>,
        children: (
          <>
            <TotalBlock>Всего позиций: {selectedEvent?.wine_list?.length || 0}</TotalBlock>
            <List
              itemLayout="horizontal"
              dataSource={selectedEvent?.wine_list || []}
              renderItem={(item: any) => (
                <List.Item
                  extra={<Avatar src={arrowRight} size={30}/>}
                  onClick = {() => navigate(`/wine/${item.id}`, {state: {from: 'event', id: selectedEvent.id, context: state?.context}})}
                >
                    <List.Item.Meta
                        avatar={ item.image ? (
                          <Avatar
                              size={50} 
                              src={item.image.replace('http', 'https')}
                              style={{ boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}}/>
                          ): (
                            <Avatar 
                              style={{backgroundColor: '#F5F5F5', padding: '10px', boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}} 
                              size={50} 
                              src={bottle}
                            />
                          )}
                        title={<>
                          <div>{item.name}</div>
                          {item.aging ? <div style={{color: "#E7014C"}}>{item.aging} г.</div>: (item.aging_caption ? <div style={{color: "#E7014C"}}>{`${item.aging_caption}`}</div>: '')}
                          <div>{item.producer.name}</div>
                        </>}
                        description={`${item.color?.name} • ${item.sugar?.name} • ${item.volume} л.`}
                    />
                </List.Item>
              )}
            />
          </>
        )
      },
      {
        key: 'description',
        label: <TabLabel>Описание</TabLabel>,
        children: (
          <div>
            {selectedEvent.description || '...'}
          </div>
        )
      },
      {
        key: 'members',
        label: <TabLabel>Участники</TabLabel>,
        children: isLoadingPersons ? (
          <Flex style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <Spin />
          </Flex>
        ) : (
          <>
            <TotalBlock>Всего участников: {selectedEvent?.participants?.length || 0}</TotalBlock>
            {isSXPrime && selectedEvent?.participants && (selectedEvent?.participants.length > 0) ? (
              selectedEvent?.participants.map((memberId: any) => {
                const member = allPersons.find(({ id }) => id == memberId) || {firstname: 'Неизвестный пользователь'}
                const initials = `${member.firstname?.[0] || ''}${member.lastname?.[0] || ''}`.toUpperCase() || member.nickname?.[0]?.toUpperCase() || 'U'
                return (
                  <Flex align='center'>
                    <Avatar 
                      key={member.id} 
                      style={{backgroundColor: '#E7014C', padding: '15px', margin: '15px', boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}} 
                      size={30}
                    >
                      {initials}
                    </Avatar>
                    <div>
                      {member.firstname}&nbsp;{member.lastname}
                      {(member.subscription.price > 0) && (<div style={{ width: 90}}><GoldenBlock>SX Prime</GoldenBlock></div>)}
                    </div>
                  </Flex>
                )
              })
            ) : ''}
            {!isSXPrime && (
              <>
                <br/>
                <Typography.Text type={'secondary'}>Полный список участников доступен только пользователям с подпиской</Typography.Text>
                <br/><br/>
                <ButtonWrapper>
                  <BackButton size="small" onClick={() => navigate('/subscription')}>
                  <Avatar size={35} src={subcrIcon} style={{ border: '1px solid #606060'}}/>
                    Выбрать подписку
                  </BackButton>
                </ButtonWrapper>
                <br/>
              </>
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
                <Flex style={{ width: '100%', padding: '0 16px 24px'}} align={'center'} gap={16}>
                  <div style={{ padding: 0, margin: 0, width: 140}}>
                      <Avatar 
                        alt="SX" 
                        src={selectedEvent.image.replace('http', 'https')}
                        style={{ width: "140px", height: "140px", boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}}
                      />
                  </div>
                  <Flex 
                      vertical
                      style={{ height: '100%', textAlign: 'left', flexGrow: 1 }}
                    >
                      <div>
                        { selectedEvent.is_prime? (<GoldenBlock>SX Prime Only</GoldenBlock>) : null }
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
                    { (new Date(selectedEvent.date) > new Date()) && ((selectedEvent.is_prime && isSXPrime) || !selectedEvent.is_prime) && (
                        <AddToCartButtonWrapper>
                          <AddToCartButton type="primary" size="large" onClick={(e) => handleAddToCart(e)}>
                            Хочу на эту дегустацию <Avatar src={cheers}/>
                          </AddToCartButton>
                        </AddToCartButtonWrapper>
                    )}
                </ButtonsSection>
            </ProductInfo>
            {new Date(selectedEvent.date) < new Date() && (
              <Alert>Это мероприятие уже завершилось</Alert>
            )}
        </ProductLayout>
        <TabsSection>
            <Tabs items={getTabs()} defaultActiveKey="set" />
        </TabsSection>
        <BottomButtonWrapper>
          <div>
            <BackButton size="large" onClick={() => navigate(`/events`)}>
              <Avatar size={35} src={backIcon} style={{ border: '1px solid #606060'}}/>
                К другим дегустациям
            </BackButton>
          </div>
          { state?.from == 'profile' && (
            <div>
              <BackButton size="large" onClick={() => navigate(`/profile`, {state: {from: 'events'}})}>
                <Avatar size={35} src={backtoLKIcon} style={{ border: '1px solid #606060', background: 'white'}}/>
                  В личный кабинет
              </BackButton>
            </div>
          )}
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
