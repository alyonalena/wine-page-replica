import { ConfigProvider, Tabs, List, Avatar as AntAvatar, Tag } from 'antd';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { theme } from '../styles/theme';
import { allProducts } from '../data/products';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px 48px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`;

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
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserName = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: ${theme.colors.foreground};
`;

const UserStatus = styled.span`
  font-size: 14px;
  color: ${theme.colors.muted};
`;

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
`;

const UserProfilePage = () => {
  const user = {
    fullName: 'Alexandra Petrova',
    status: 'Champagne Lovers Club • Gold member',
    initials: 'AP',
  };

  const favoriteWines = allProducts.slice(0, 5);

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
      name: 'Italian Reds Masterclass',
      date: '25 ноября 2024',
      location: 'Москва, SimpleWine Академия',
      status: 'Посетил',
    },
  ];

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
              <div style={{ fontWeight: 600 }}>{item.price.toLocaleString()} ₽</div>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'events',
      label: 'Мероприятия',
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
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#8B1538',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        },
      }}
    >
      <PageWrapper>
        <Header />
        <main>
          <Container>
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
    </ConfigProvider>
  );
};

export default UserProfilePage;


