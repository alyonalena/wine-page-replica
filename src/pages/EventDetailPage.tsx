import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Breadcrumb, Avatar, Button, Tabs, List, Flex, Space, Typography, Spin, message, Divider } from 'antd'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { useTelegramId } from '../hooks/useTelegramId'
import cheers from '../pics/actions/cheers.svg'
import backIcon from '../pics/actions/back.svg'
import bottle from '../pics/actions/pink.png'
import user from '../pics/actions/user.svg'

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
  display: flex;
  flex-direction: column;
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
  margin-top: 48px;
  
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

const ProductName = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.colors.foreground};
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ImportantInfo = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.colors.primary};
  line-height: 0.9;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const EventDetailPage = () => {
  const { id } = useParams()
  const [messageApi, contextHolder] = message.useMessage()
  const [selectedEvent, setSelectedEvent] = useState(null)

  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch("https://severely-superior-monster.cloudpub.ru/api/events", {
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
      const response = await fetch('https://severely-superior-monster.cloudpub.ru/api/persons', {
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
          const response = await fetch(`https://severely-superior-monster.cloudpub.ru/api/events/?interested_telegram_id=${person.telegram_id}`, {
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

  const successWithCustomIcon = () => {
    messageApi.open({
      duration: 2,
      content: <>
        <Avatar src={cheers} style={{backgroundColor: '#E7014C'}}/>&nbsp;Спасибо за интерес!<br/><br/>
        SX Wine свяжется с Вамим в ближайшее время
      </>,
    })
  }

  const mutation = useMutation({
    mutationFn: async ({ eventId, telegramId }: { eventId: number; telegramId: number }) => {
      const response = await fetch('https://severely-superior-monster.cloudpub.ru/api/notifications/event-interest/', {
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
      successWithCustomIcon()
    },
    onError: (error) => {
      console.error('Error sending event interest notification:', error)
      messageApi.error({
        content: 'Произошла ошибка при отправке запроса. Попробуйте позже.',
        duration: 3,
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
        key: 'description',
        label: 'Описание',
        children: (
          <>
            Описание дегустации
          </>
        )
      },
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
                      avatar={<Avatar style={{backgroundColor: '#F5F5F5', padding: '10px'}} size={50} src={bottle}/>}
                      title={item.name}
                      description={`${item.sugar?.name} • ${item.volume}`}
                  />
              </List.Item>
            )}
          />
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
                  <Avatar 
                    key={member.id} 
                    style={{backgroundColor: '#F5F5F5', padding: '10px', margin: '10px'}} 
                    size={50}
                  >
                    {initials}
                  </Avatar>
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
        <Flex style={{ alignItems: 'center', height: '100vh'}}>
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
        {contextHolder}
        <Flex>
          <Breadcrumb
            items={[
              { title: <Link style={{ textAlign: 'center' }} to="/events"><Avatar size={30} src={backIcon}/>&nbsp;К другим дегустациям</Link> },
            ]}
          />
        </Flex>
        {/*<Flex justify='space-between'>
          <div></div>
          <Breadcrumb
            items={[
              { title: <Link style={{ textAlign: 'center' }} to="/events">К другим дегустациям<Avatar shape={'square'} size={20} src={forwardIcon}/></Link> }
            ]}
          />
        </Flex>*/}
        <Divider/>
        <ProductLayout>
            <ProductInfo>
                <Flex style={{ width: '100%' }} align={'center'}>
                    <ProductName>{selectedEvent.name}</ProductName>
                </Flex> 
                <Flex style={{ width: '100%', padding: '8px 16px 24px'}} align={'flex-start'} gap={8}>
                  <div style={{ padding: 0, margin: 0, width: 130}}>
                      <Avatar 
                        alt="SX" 
                        src={selectedEvent.image}
                        style={{ width: "130px", height: "130px" }} 
                      />
                  </div>
                  <Flex 
                      vertical
                      style={{ height: '100%',textAlign: 'left' }}
                    >
                        <div>
                            <ImportantInfo>{selectedEvent.city.name}</ImportantInfo>
                            <Space style={{ gap:4, lineHeight: '0.9' }}>
                              <Typography.Text type='secondary'>{selectedEvent.place} • {selectedEvent.address}</Typography.Text>
                            </Space>
                            <br />  <br /> 
                            <ImportantInfo>{selectedEvent.date} • {selectedEvent.time}</ImportantInfo>
                        </div>
                  </Flex> 
                </Flex>
                <ButtonsSection>
                    <AddToCartButton type="primary" onClick={(e) => handleAddToCart(e)}>
                      Хочу на эту дегустацию <Avatar src={cheers}/>
                    </AddToCartButton>
                </ButtonsSection>
            </ProductInfo>
        </ProductLayout>
        <TabsSection>
            <Tabs items={getTabs()} defaultActiveKey="description" />
        </TabsSection>
      </Container>
    )
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

export default EventDetailPage
