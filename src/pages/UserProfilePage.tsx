import { Tabs, List, Avatar, Tag, Breadcrumb, Typography, Rate, Divider } from 'antd'

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { allProducts } from '../data/products'
import backIcon from '../pics/actions/back.svg'
import { HeartFilled } from '@ant-design/icons'
import glass from '../pics/actions/glass.svg'
import cheers from '../pics/actions/cheers.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px 16px 48px;
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
    },
    {
      id: 2,
      name: 'Champagne Masterclass',
      date: '25 ноября 2024',
      location: 'Nappe',
    },
  ]

  const tabItems = [
    {
      key: 'favorites',
      label: 'Ваша коллекция вин',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={favoriteWines}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar style={{backgroundColor: '#E7014C', padding: '10px'}} size={50} src={glass}/>}
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
      label: 'Ваши дегустации',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={attendedEvents}
          renderItem={(event) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: '#E7014C', padding: '10px' }} size={50} src={cheers}/>}
                title={event.name}
                description={
                  <>
                    <div>{event.date}</div>
                    <div>{event.location}</div>
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
                <PageTitle level={3}>{'Личный кабинет'}</PageTitle>
              </div>
            </PageHeader>
          <ProfileHeader>
            <AvatarWrapper>
              {user.initials}
            </AvatarWrapper>
            <UserInfo>
              <UserName>{user.fullName}</UserName>
              <UserStatus>
                <DrawerLogo>Приветствуем Вас! Вы <span>друг SX Wine </span></DrawerLogo>
                <br/><Rate character={<HeartFilled/>} count={3} defaultValue={1} />
              </UserStatus>
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


