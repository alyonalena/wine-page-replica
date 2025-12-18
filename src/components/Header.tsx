import styled from 'styled-components';
import { Button, Badge, Drawer } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  CloseOutlined,
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
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
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
  justify-content: space-between;
  gap: 24px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.primary};
  text-decoration: none;
  
  span {
    color: ${theme.colors.foreground};
  }
`;

const MenuButton = styled(Button)`
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
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    span {
      display: none;
    }
  }
`;

const Navigation = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  border-top: 1px solid ${theme.colors.border};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
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

const DrawerContent = styled.div`
  padding: 0;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid ${theme.colors.border};
`;

const DrawerLogo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.primary};
  
  span {
    color: ${theme.colors.foreground};
  }
`;

const CloseButton = styled(Button)`
  border: none;
  box-shadow: none;
`;

const DrawerNav = styled.nav`
  padding: 16px 0;
`;

const DrawerNavItem = styled(Link)<{ $isSpecial?: boolean }>`
  display: block;
  padding: 14px 24px;
  color: ${props => props.$isSpecial ? theme.colors.accent : theme.colors.foreground};
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: ${theme.transitions.default};
  
  &:hover {
    background: ${theme.colors.lightBg};
    color: ${theme.colors.primary};
  }
`;

const DrawerSection = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${theme.colors.border};
`;

const DrawerSectionTitle = styled.h4`
  font-size: 12px;
  text-transform: uppercase;
  color: ${theme.colors.muted};
  margin: 0 0 12px;
  letter-spacing: 0.5px;
`;

const DrawerLink = styled.a`
  display: block;
  padding: 8px 0;
  color: ${theme.colors.foreground};
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: 'В подарок', href: '/wines?category=gift', badge: true },
    { label: 'Вино', href: '/wines?category=wine' },
    { label: 'Шампанское и игристое', href: '/wines?category=champagne' },
    { label: 'Виски', href: '/wines?category=whisky' },
    { label: 'Коньяк', href: '/wines?category=cognac' },
    { label: 'Крепкие напитки', href: '/wines?category=spirits' },
    { label: 'Вода', href: '/wines?category=water' },
    { label: 'Бокалы', href: '/wines?category=glasses' },
    { label: 'Аксессуары', href: '/wines?category=accessories' },
    { label: 'Fine & Rare', href: '/wines?category=rare' },
    { label: 'Блог', href: '#' },
    { label: 'Дегустации', href: '#' },
    { label: 'Акции %', href: '/wines?category=sale', isSpecial: true },
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
        <LeftSection>
          <Logo to="/">
            simple<span>wine</span>
          </Logo>
          
          <MenuButton onClick={() => setDrawerOpen(true)}>
            <MenuOutlined />
            МЕНЮ
          </MenuButton>
        </LeftSection>
        
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
              <Link to={item.href}>
                {item.label}
                {item.badge && <GiftBadge>●</GiftBadge>}
              </Link>
            </NavItem>
          ))}
        </NavList>
      </Navigation>

      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={320}
        closable={false}
        styles={{ body: { padding: 0 } }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerLogo>simple<span>wine</span></DrawerLogo>
            <CloseButton icon={<CloseOutlined />} onClick={() => setDrawerOpen(false)} />
          </DrawerHeader>
          
          <DrawerNav>
            {navItems.map((item) => (
              <DrawerNavItem 
                key={item.label} 
                to={item.href} 
                $isSpecial={item.isSpecial}
                onClick={() => setDrawerOpen(false)}
              >
                {item.label}
              </DrawerNavItem>
            ))}
          </DrawerNav>
          
          <DrawerSection>
            <DrawerSectionTitle>Информация</DrawerSectionTitle>
            <DrawerLink href="#">Доставка и оплата</DrawerLink>
            <DrawerLink href="#">Адреса винотек</DrawerLink>
            <DrawerLink href="#">Контакты</DrawerLink>
          </DrawerSection>
          
          <DrawerSection>
            <DrawerSectionTitle>Контакты</DrawerSectionTitle>
            <DrawerLink href="tel:88005557799">8 (800) 555-77-99</DrawerLink>
            <DrawerLink href="mailto:info@simplewine.ru">info@simplewine.ru</DrawerLink>
          </DrawerSection>
        </DrawerContent>
      </Drawer>
    </HeaderWrapper>
  );
};

export default Header;
