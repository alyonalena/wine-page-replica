import { Tabs, List, Avatar, Tag, Button, Typography, Rate, Divider, Spin, Flex } from 'antd'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { useTelegramId } from '../hooks/useTelegramId'
import backIcon from '../pics/actions/back.svg'
import glass from '../pics/actions/glass.svg'
import cheers from '../pics/actions/cheers.svg'
import { formatDateTime } from '../lib/date'
import { TG_API_BASE_URL } from '../lib/api'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px 48px;
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
  background: rgba(0, 0, 0, 0.1);
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


const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`

const AvatarWrapper = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  background: #E5E5E5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const UserName = styled.h3`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: ${theme.colors.foreground};
    color: ${theme.colors.primary};
`

const UserStatus = styled.span`
  font-size: 14px;
`

const StyledTabs = styled(Tabs)`
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

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 16px;
`

const PageTitle = styled(Typography.Title)`
  animation: slideUp 0.4s ease;
`

const DrawerLogo = styled.div`
  font-size: 14px;
  color: ${theme.colors.muted};
  
  span {
    color: ${theme.colors.primary};
    font-weight: bold;
  }
`

const UserProfilePage = () => {
  const telegramId = useTelegramId()

  const { data: persons, isLoading: isLoadingPerson, isError: isErrorPerson } = useQuery({
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

  // Find the current user by telegram_id
  const currentUser = persons?.find((person: any) => person.telegram_id === telegramId)

  // Prepare user data from API or use defaults
  const user = currentUser ? {
    fullName: `${currentUser.firstname || ''} ${currentUser.lastname || ''}`.trim() || currentUser.nickname || 'Пользователь',
    status: currentUser.grade?.name || 'Гость',
    initials: `${currentUser.firstname?.[0] || ''}${currentUser.lastname?.[0] || ''}`.toUpperCase() || currentUser.nickname?.[0]?.toUpperCase() || 'U',
  } : {
    fullName: 'Пользователь',
    status: 'Гость',
    initials: 'U',
  }

  const { data: favoriteWines, isLoading: isLoadingWines, isError: isErrorWines } = useQuery({
    queryKey: ['wines', 'interested', telegramId],
    queryFn: async () => {
      const response = await fetch(`${TG_API_BASE_URL}/wines/?interested_telegram_id=${telegramId}`, {
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
      const response = await fetch(`${TG_API_BASE_URL}/events/?interested_telegram_id=${telegramId}`, {
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

  const tabItems = [
    {
      key: 'favorites',
      label: 'Ваша коллекция вин',
      children: isLoadingWines ? (
        <Flex style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <Spin />
        </Flex>
      ) : isErrorWines ? (
        <Typography.Text type="danger">Ошибка при загрузке коллекции вин</Typography.Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={favoriteWines || []}
          renderItem={(wine: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar style={{backgroundColor: '#E7014C', padding: '10px'}} size={50} src={glass}/>}
                title={wine.name}
                description={`${wine.region?.name || ''} • ${wine.volume || ''}л.`}
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'events',
      label: 'Ваши дегустации',
      children: isLoadingEvents ? (
        <Flex style={{ alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <Spin />
        </Flex>
      ) : isErrorEvents ? (
        <Typography.Text type="danger">Ошибка при загрузке дегустаций</Typography.Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={attendedEvents || []}
          renderItem={(event: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: '#E7014C', padding: '10px' }} size={50} src={cheers}/>}
                title={event.name}
                description={
                  <>
                    <div>{formatDateTime(event.date, event.time)}</div>
                    <div>{event.city?.name} {event.place ? `• ${event.place}` : ''} {event.address ? `• ${event.address}` : ''}</div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      ),
    },
  ]

  return (
    <PageWrapper>
      <Header />
      <main>
        <Container>
          <PageHeader>
              <div>
                <PageTitle level={3}>{'Личный кабинет'}</PageTitle>
              </div>
            </PageHeader>
          <ProfileHeader>
            {isLoadingPerson ? (
              <Flex style={{ alignItems: 'center', gap: 24, width: '100%' }}>
                <Spin />
                <Typography.Text>Загрузка профиля...</Typography.Text>
              </Flex>
            ) : (
              <>
                <AvatarWrapper>
                  {user.initials}
                </AvatarWrapper>
                <UserInfo>
                  <UserName>{user.fullName}</UserName>
                  <UserStatus>
                    <DrawerLogo>Приветствуем Вас! <br/>Ваш статус:&nbsp;
                        {currentUser?.grade?.name && (
                          <span>{user.status}</span>
                        )}
                    </DrawerLogo>
                    {/*<br/><Rate character={<HeartFilled/>} count={3} defaultValue={1} />*/}
                  </UserStatus>
                </UserInfo>
              </>
            )}
          </ProfileHeader>
          <StyledTabs items={tabItems} defaultActiveKey="favorites" />
          <BottomButtonWrapper>
            <BackButton onClick={() => window.location.href = '/'}>
              <Avatar size={50} src={backIcon}/>
              На главную страницу
            </BackButton>
          </BottomButtonWrapper>
        </Container>
      </main>
    </PageWrapper>
  )
}

export default UserProfilePage


