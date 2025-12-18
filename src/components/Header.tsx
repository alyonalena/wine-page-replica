import styled from 'styled-components';
import { Input, Button, Badge, Dropdown } from 'antd';
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import { theme } from '../styles/theme';

const HeaderWrapper = styled.header`
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const TopBar = styled.div`
  background: ${theme.colors.lightBg};
  padding: 8px 0;
  font-size: 13px;
  color: ${theme.colors.muted};
`;

const TopBarContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopBarLinks = styled.div`
  display: flex;
  gap: 24px;
  
  a {
    color: ${theme.colors.foreground};
    text-decoration: none;
    transition: ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const LocationSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const MainHeader = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.primary};
  cursor: pointer;
  
  span {
    color: ${theme.colors.foreground};
  }
`;

const CatalogButton = styled(Button)`
  height: 44px;
  padding: 0 20px;
  background: ${theme.colors.lightBg} !important;
  border: none !important;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: ${theme.colors.border} !important;
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
  max-width: 500px;
  
  .ant-input-group-wrapper {
    .ant-input {
      height: 44px;
      border-radius: 8px 0 0 8px;
      border-color: ${theme.colors.border};
    }
    
    .ant-input-group-addon {
      .ant-btn {
        height: 44px;
        border-radius: 0 8px 8px 0;
        background: ${theme.colors.primary} !important;
        border-color: ${theme.colors.primary} !important;
      }
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ActionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${theme.colors.foreground};
  font-size: 12px;
  
  .anticon {
    font-size: 22px;
  }
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Navigation = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  border-top: 1px solid ${theme.colors.border};
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavItem = styled.li<{ $isSpecial?: boolean }>`
  a {
    display: block;
    padding: 14px 16px;
    color: ${props => props.$isSpecial ? theme.colors.accent : theme.colors.foreground};
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    transition: ${theme.transitions.default};
    position: relative;
    
    &:hover {
      color: ${theme.colors.primary};
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 16px;
      right: 16px;
      height: 2px;
      background: ${theme.colors.primary};
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    
    &:hover::after {
      transform: scaleX(1);
    }
  }
`;

const GiftBadge = styled.span`
  background: ${theme.colors.primary};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 6px;
`;

const Header = () => {
  const navItems = [
    { label: 'В подарок', href: '#', badge: true },
    { label: 'Вино', href: '#' },
    { label: 'Шампанское и игристое', href: '#' },
    { label: 'Виски', href: '#' },
    { label: 'Коньяк', href: '#' },
    { label: 'Крепкие напитки', href: '#' },
    { label: 'Вода', href: '#' },
    { label: 'Бокалы', href: '#' },
    { label: 'Аксессуары', href: '#' },
    { label: 'Fine & Rare', href: '#' },
    { label: 'Блог', href: '#' },
    { label: 'Дегустации', href: '#' },
    { label: 'Акции %', href: '#', isSpecial: true },
  ];

  return (
    <HeaderWrapper>
      <TopBar>
        <TopBarContainer>
          <TopBarLinks>
            <a href="#">Корпоративным клиентам</a>
            <a href="#">Винный клуб Privé</a>
            <a href="#">Для бизнеса</a>
            <a href="#">Ресторанам, магазинам, дистрибьюторам</a>
          </TopBarLinks>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <LocationSelect>
              <EnvironmentOutlined />
              <span>Москва</span>
            </LocationSelect>
            <a href="#" style={{ color: theme.colors.foreground, textDecoration: 'none' }}>
              Адреса винотек
            </a>
          </div>
        </TopBarContainer>
      </TopBar>
      
      <MainHeader>
        <Logo>
          simple<span>wine</span>
        </Logo>
        
        <CatalogButton>
          <MenuOutlined />
          КАТАЛОГ
        </CatalogButton>
        
        <SearchWrapper>
          <Input.Search
            placeholder="подарочный сертификат"
            enterButton={<SearchOutlined />}
            size="large"
          />
        </SearchWrapper>
        
        <HeaderActions>
          <ActionItem>
            <GiftOutlined />
            <span>Бонусы</span>
          </ActionItem>
          <ActionItem>
            <HeartOutlined />
            <span>Избранное</span>
          </ActionItem>
          <ActionItem>
            <Badge count={0} showZero={false}>
              <ShoppingCartOutlined style={{ fontSize: 22 }} />
            </Badge>
            <span>Корзина</span>
          </ActionItem>
          <ActionItem>
            <UserOutlined />
            <span>Войти</span>
          </ActionItem>
        </HeaderActions>
      </MainHeader>
      
      <Navigation>
        <NavList>
          {navItems.map((item) => (
            <NavItem key={item.label} $isSpecial={item.isSpecial}>
              <a href={item.href}>
                {item.label}
                {item.badge && <GiftBadge>●</GiftBadge>}
              </a>
            </NavItem>
          ))}
        </NavList>
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;
