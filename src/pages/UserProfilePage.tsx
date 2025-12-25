import { ConfigProvider, Tabs, List, Avatar, Tag, Breadcrumb } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { allProducts } from '../data/products'
import backIcon from '../pics/actions/back.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px 48px;
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
  background: ${theme.colors.lightBg};
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

const UserName = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: ${theme.colors.foreground};
`

const UserStatus = styled.span`
  font-size: 14px;
  color: ${theme.colors.muted};
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

const BreadcrumbWrapper = styled.div`
  margin-bottom: 24px;
  
  .ant-breadcrumb-link a {
    color: ${theme.colors.muted};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`

const UserProfilePage = () => {
  const user = {
    fullName: 'Alexandra Petrova',
    status: 'Gold member',
    initials: 'AP',
  }

  const favoriteWines = allProducts.slice(0, 5)

  const attendedEvents = [
    {
      id: 1,
      name: 'Champagne & Oysters Night',
      date: '12 декабря 2024',
      location: 'Москва, SX Wine Bar',
      status: 'Посетил',
    },
    {
      id: 2,
      name: 'Champagne Masterclass',
      date: '25 ноября 2024',
      location: 'Nappe',
      status: 'Посетил',
    },
  ]

  const tabItems = [
    {
      key: 'favorites',
      label: 'Избранные вина',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={favoriteWines}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<AntAvatar style={{ backgroundColor: theme.colors.lightBg }}>{item.emoji}</AntAvatar>}
                title={item.name}
                description={`${item.region} • ${item.volume}`}
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'events',
      label: 'Дегустации',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={attendedEvents}
          renderItem={(event) => (
            <List.Item>
              <List.Item.Meta
                title={event.name}
                description={
                  <>
                    <div>{event.date}</div>
                    <div>{event.location}</div>
                  </>
                }
              />
              <Tag color="green">{event.status}</Tag>
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
          <BreadcrumbWrapper>
            <Breadcrumb
              items={[
                { title: <Link to="/"><Avatar size={15} src={backIcon}/>&nbsp;На главную страницу</Link> }
              ]}
            />
          </BreadcrumbWrapper>
          <ProfileHeader>
            <AvatarWrapper>
              {user.initials}
            </AvatarWrapper>
            <UserInfo>
              <UserName>{user.fullName}</UserName>
              <UserStatus>{user.status}</UserStatus>
            </UserInfo>
          </ProfileHeader>
          <StyledTabs items={tabItems} defaultActiveKey="favorites" />
        </Container>
      </main>
      <Footer />
    </PageWrapper>
  )
}

export default UserProfilePage


