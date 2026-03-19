import { useEffect } from 'react'
import { Tabs, List, Avatar, Tag, Button, Typography, Spin, Flex, Progress } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useLaunchParams } from '@telegram-apps/sdk-react'
import { useNavigate, useLocation } from 'react-router-dom'

import styled from 'styled-components'
import Header from '../components/Header'
import { theme } from '../styles/theme'
import { useTelegramId } from '../hooks/useTelegramId'
import backIcon from '../pics/logo.png'
import bottle from '../pics/actions/pink.png'
import cheers from '../pics/actions/cheers.svg'
import wineIcon from '../pics/actions/wines.png'
import eventIcon from '../pics/actions/events.png'
import cardImage from '../pics/main/card.png'
import { formatDateTime, getEventLabel } from '../lib/date'
import { getApiBaseUrl } from '../lib/api'

import arrowRight from '../pics/actions/arrow-right.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 8px 8px 100px;
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
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
`

const ButtonWrapper = styled.div`
  z-index: 100;
  padding: 0;
  display: flex;
  justify-content: center;
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
  margin: 4px 0 0 0;
  color: #E3E3E3;
  background: rgba(0,0,0,0.8);
`

const UserStatus = styled.span`
  font-size: 11px;
  color: ${theme.colors.primary};
`

const TabLabel = styled.span`
  font-size: 11px;
  color: ${theme.colors.muted};
`

const StyledTabs = styled(Tabs)`
  margin: 8px;
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

const GradeBlock = styled.div`
  font-size: 12px;
  color: white;
  background: ${theme.colors.primary};
  padding:16px;
  border-radius: 0.3rem;
  margin-bottom: 8px;
`

const GoldenBlock = styled.div`
  background: white;
  color: white;
  padding: 24px 8px;
  margin-bottom: 8px;
  background: rgba(0,0,0,0.2);
  border-radius: 2rem;
  text-align: center;
`

const NameCentered = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0 0 0 0;
  color: white;
  width: 100%;
  text-align: center;
`

const UserProfilePage = () => {
  const telegramId = useTelegramId()
  const { state } = useLocation()

  const launchParams = /*useLaunchParams()*/ {}
  const navigate = useNavigate()


  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useQuery({
    queryKey: ['user', telegramId],
    queryFn: async () => {
      const response = await fetch(`${getApiBaseUrl()}/persons/?telegram_id=${telegramId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        return {
          fullName: 'Пользователь',
          status: 'Гость',
          initials: 'U',
        }
      }

      return response.json().then(userList => {
        const currentUser = userList[0]
        return {
          fullName: `${currentUser.firstname || ''} ${currentUser.lastname || ''}`.trim() || currentUser.nickname || 'Пользователь',
          status: currentUser.grade?.name || 'Гость',
          initials: `${currentUser.firstname?.[0] || ''}${currentUser.lastname?.[0] || ''}`.toUpperCase() || currentUser.nickname?.[0]?.toUpperCase() || 'U',
          ...currentUser
        }
      })
    },
  })

  const { data: favoriteWines, isLoading: isLoadingWines, isError: isErrorWines } = useQuery({
    queryKey: ['wines', 'interested', telegramId],
    queryFn: async () => {
      const response = await fetch(`${getApiBaseUrl()}/wines/?interested_telegram_id=${telegramId}`, {
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

  
  const { data: grades, isLoading: isGradeLoading } = useQuery({
    queryKey: ['grades'],
    queryFn: async () => {
      const response = await fetch(`${getApiBaseUrl()}/grades/`, {
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

  const { data: userEvents, isLoading: isUserEventaLoading } = useQuery({
    queryKey: ['userEvents'],
    queryFn: async () => {
      const response = await fetch(`${getApiBaseUrl()}/events/?telegram_id=${telegramId}`, {
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

  const { data: attendedEvents, isLoading: isLoadingEvents, isError: isErrorEvents } = useQuery({
    queryKey: ['events', 'interested', telegramId],
    queryFn: async () => {
      const response = await fetch(`${getApiBaseUrl()}/events/?interested_telegram_id=${telegramId}`, {
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

  const getFeaturesInfo = () => {
    if (user?.subscription) {
      return (      
        <>
          <GradeBlock>
            <GoldenBlock>
            <NameCentered>Подписка {user?.subscription?.name}</NameCentered>
              {`${user?.subscription?.duration} мес. от ${user?.subscription_starts_at || '2026-03-10'}`}
            </GoldenBlock>
          <br/>
          <div>ВАМ ДОСТУПНО:</div>
          <br/>
          {user?.subscription?.features?.map(ft => <div>{`— ${ft.name}`}</div>)}
          <br/>
          </GradeBlock>
        </>
      )
    } else {
      return null
    }   
  }

  const getGradeInfo = () => {
    return (
      <GradeBlock>        
        { 
          grades.map((grade, i) => <>
            <GoldenBlock>
              <NameCentered>{grade.name}</NameCentered>
              <strong>{getEventLabel(Number(grade.required_tastings))}</strong>
              {user.grade.id === grade.id ? (
                <>
                  <div>
                  <br/><hr/><br/>
                  {grade?.description}
                  <br/><br/><hr/><br/>
                  Вы уже посетили: {
                    userEvents?.map(ue => {
                      return ue.image ? (
                        <Avatar
                          key={ue.id}
                          size={30} 
                          src={ue.image.replace('http', 'https')}
                          style={{boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}}
                      />) : (
                        <Avatar
                          key={ue.id}
                          size={30} 
                          src={cheers}
                          style={{backgroundColor: '#E7014C', padding: '10px', boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}}
                      />)
                    })
                  }
                </div>  
                </>
              ) : null}
           
            </GoldenBlock>
            {i < grades.length-1 ? (<NameCentered><CaretDownOutlined/></NameCentered>) : null}
          </>) 
        }
      </GradeBlock>
    )
  }

  const tabItems = [
    {
      key: 'status',
      label: <TabLabel>Подписка & Грейд</TabLabel>,
      children: isLoadingUser ? (
        <Flex style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <Spin />
        </Flex>
      ) : isErrorUser ? (
        <Typography.Text type="danger">Ошибка при загрузке информации</Typography.Text>
      ) : (
        <>
          {getFeaturesInfo()}
          {getGradeInfo()}
        </>
      )
    },
    {
      key: 'events',
      label: <TabLabel>Дегустации</TabLabel>,
      children: isLoadingEvents ? (
        <Flex style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <Spin />
        </Flex>
      ) : isErrorEvents ? (
        <Typography.Text type="danger">Ошибка при загрузке дегустаций</Typography.Text>
      ) : (
        <>
          <Typography.Text type={'secondary'}>Дегустации с Вашим участием:</Typography.Text>
          <br/><br/>
          <List
            itemLayout="horizontal"
            dataSource={userEvents || []}
            renderItem={(event: any) => (
              <List.Item
                extra={<Avatar src={arrowRight} size={30}/>}
                onClick = {() => navigate(`/event/${event.id}`, {state: { from: 'profile', context: 'profile' }})}
              >
                <List.Item.Meta                 
                  avatar={event.image ? (
                    <Avatar
                        size={50} 
                        src={event.image.replace('http', 'https')}
                        style={{boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}}
                      />
                    ): (
                      <Avatar 
                        style={{backgroundColor: '#E7014C', padding: '10px', boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}} 
                        size={50} 
                        src={cheers}/>
                    )}
                  title={
                    <>
                      {event.name}&nbsp;
                      {
                        new Date(event.date) < new Date() ? (
                          <Tag color="success" icon={<CheckCircleOutlined/>} />) : (
                          <Tag color="processing" icon={<ClockCircleOutlined/>} />
                      )}
                    </>
                  }
                  description={
                    <>
                      <div style={{color: "black"}}>{event.city?.name}</div>
                      <div style={{color: "#E7014C"}}>{formatDateTime(event.date, event.time)}</div>
                      <div>{event.place} {event.address ? `• ${event.address}` : ''}</div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: 'requests',
      label: <TabLabel>История запросов</TabLabel>,
      children: isLoadingWines ? (
        <Flex style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <Spin />
        </Flex>
      ) : isErrorWines ? (
        <Typography.Text type="danger">Ошибка при загрузке коллекции вин</Typography.Text>
      ) : (
        <>
          <Typography.Text type={'secondary'}>Вы интересовались винами:</Typography.Text>
          <br/><br/>
          <List
            itemLayout="horizontal"
            dataSource={favoriteWines || []}
            renderItem={(wine: any) => (
              <List.Item              
                extra={<Avatar src={arrowRight} size={30}/>}
                onClick={() => navigate(`/wine/${wine.id}`, {state: {from: 'profile', context: 'profile'}})}
              >
              <List.Item.Meta
                  avatar={ wine.image ? (
                    <Avatar
                        size={50}
                        src={wine.image.replace('http', 'https')}
                        style={{boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}}
                      />
                    ): (
                      <Avatar 
                        style={{backgroundColor: '#F5F5F5', padding: '10px', boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}} 
                        size={50}
                        src={bottle}/>
                    )}
                  title={
                    <>
                      <div>{wine.name}</div>
                      <div>{wine.producer.name}</div>
                      {wine.aging ? <div style={{color: "#E7014C"}}>{wine.aging} г.</div>: (wine.aging_caption ? <div style={{color: "#E7014C"}}>{`${wine.aging_caption}`}</div>: '')}
                    </>
                  }
                  description={`${wine.color?.name} • ${wine.sugar?.name} • ${wine.volume} л.`}
                  />
              </List.Item>
            )}
          />
          <br/><hr/><br/>
          <Typography.Text type={'secondary'}>Вы интересовались дегустациями:</Typography.Text>
          <br/><br/>
          <List
            itemLayout="horizontal"
            dataSource={attendedEvents || []}
            renderItem={(event: any) => (
              <List.Item
                extra={<Avatar src={arrowRight} size={30}/>}
                onClick = {() => navigate(`/event/${event.id}`, {state: { from: 'profile', context: 'profile' }})}
              >
                <List.Item.Meta
                  avatar={event.image ? (
                    <Avatar
                        size={50} 
                        src={event.image.replace('http', 'https')}
                        style={{boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}}
                      />
                    ): (
                      <Avatar 
                        style={{backgroundColor: '#E7014C', padding: '10px', boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}} 
                        size={50} 
                        src={cheers}/>
                    )}
                  title={
                    <>
                      {event.name}&nbsp;
                      {
                        new Date(event.date) < new Date() ? (
                          <Tag color="success" icon={<CheckCircleOutlined/>} />) : (
                          <Tag color="processing" icon={<ClockCircleOutlined/>} />
                      )}
                    </>
                  }
                  description={
                    <>
                      <div style={{color: "black"}}>{event.city?.name}</div>
                      <div style={{color: "#E7014C"}}>{formatDateTime(event.date, event.time)}</div>
                      <div>{event.place} {event.address ? `• ${event.address}` : ''}</div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
  ]



  return (
    <PageWrapper>
      <Header />
      <main>
        <Container>
            {isLoadingUser ? (
              <Flex style={{ alignItems: 'center', gap: 24, width: '100%' }}>
                <Spin />
                <Typography.Text>Загрузка профиля...</Typography.Text>
              </Flex>
            ) : (
              <>
                <Flex 
                  style={{ 
                    width: '100%', 
                    height: '200px',
                    padding: '16px', 
                    backgroundColor: '#333', 
                    borderRadius: '0.3rem',
                    border: '1px solid white',
                    backgroundImage: `url(${cardImage})`,
                    backgroundPosition: 'top center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat', 
                    color: 'white',
                  }} 
                  align={'start'}
                  justify='flex-between'
                  vertical
                >
                  <div style={{ flexGrow: 1, width: '100%', textAlign: 'right'}}>
                    <Typography.Title level={3} style={{ margin: 0, color: "white", lineHeight: 1.1}}>{user?.fullName}</Typography.Title>
                    <Typography.Title level={5} style={{ margin: 0, color: "white", lineHeight: 1.0}}>{user.grade?.name}</Typography.Title>
                  </div>
                  <div
                    style={{ 
                      width: '100%',
                      padding: '0',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ background: 'rgba(0,0,0,0.7)', padding:'8px 8px 2px', borderRadius: '0.3rem'}}>
                      <Progress 
                        percent={((Number(user?.visited_tastings)/Number(user?.grade?.next_grade_required_tastings)))*100}
                        percentPosition={{align: 'start', type: 'inner'}}
                        size={['100%', 30]}
                        strokeColor="#E7014C"
                        format={(percent) => <div style={{paddingLeft: 5}}>{percent}%</div>}
                      />
                    </div>
                    <Flex justify='space-between' style={{ padding: '4px 0'}}>
                      <div style={{ background: 'rgba(0,0,0,0.7)', padding:'8px', borderRadius: '0.3rem'}}>
                        <Typography.Title level={5} style={{ margin: 0, color: "white", lineHeight: 1.0}}>{user.grade?.name}</Typography.Title>
                        <UserStatus>{getEventLabel(Number(user?.visited_tastings))}</UserStatus>
                      </div>
                      <div style={{ background: 'rgba(0,0,0,0.7)', padding:'8px', borderRadius: '0.3rem', textAlign: 'right'}}>
                        <Typography.Title level={5} style={{ margin: 0, color: "white", lineHeight: 1.0}}>{user.grade?.next_grade_name}</Typography.Title>
                        <UserStatus>{getEventLabel(Number(user?.grade?.next_grade_required_tastings))}</UserStatus>
                      </div>
                    </Flex>
                   </div>
                  </Flex>
                <ButtonWrapper>
                  <BackButton size="large" onClick={() => navigate('/events')}>
                    <Avatar size={35} src={eventIcon} style={{ border: '1px solid #606060'}}/>
                      Выбрать дегустацию
                    </BackButton>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <BackButton size="large" onClick={() => navigate('/wines')}>
                    <Avatar size={35} src={wineIcon} style={{ border: '1px solid #606060'}}/>
                      Выбрать вино
                    </BackButton>
                  </ButtonWrapper>
              </>
            )}
          <StyledTabs items={tabItems} defaultActiveKey={state?.from || 'wines'} />
          <BottomButtonWrapper>
            <BackButton size="large" onClick={() => window.location.href = '/'}>
            <Avatar size={35} src={backIcon} style={{ border: '1px solid #606060'}}/>
              На главную страницу
            </BackButton>
          </BottomButtonWrapper>
        </Container>
      </main>
    </PageWrapper>
  )
}

export default UserProfilePage


