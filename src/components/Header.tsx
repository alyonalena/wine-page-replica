import styled from 'styled-components';
import { Button, Badge, Drawer, Col, Flex, Avatar, Typography } from 'antd';
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
import LogoImage from '../pics/logo.png';

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

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.primary};
  text-decoration: none;
  
  span {
    color: ${theme.colors.foreground};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    span {
      display: none;
    }
  }
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
  
`;const DrawerContent = styled.div`
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
    { label: 'Мерч', href: '/wines?category=gift', badge: true, isSpecial: true },
    { label: 'Сеты', href: '/wines?category=wine' },
    { label: 'Шампанское и игристое', href: '/wines?category=champagne' },
  ];

  return (
    <HeaderWrapper>
      <TopBar>
        <TopBarContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <LocationSelect>
              <EnvironmentOutlined />
              <span>Москва</span>
            </LocationSelect>
          </div>
        </TopBarContainer>
      </TopBar>
      
      <MainHeader>
        <LeftSection>
          <Flex align={"center"} gap={8}>
            <Avatar alt="SX" shape="square" src={LogoImage} style={{ width: "52px", height: "52px" }} />
            <Col flex="auto" style={{ textAlign: "left" }}>
                <Typography.Title level={2} style={{ margin: 0, color: "black"}}>SX Wine</Typography.Title>
                <Typography.Text style={{ fontSize: '0.8em'}}>Champagne Lovers Club</Typography.Text>
            </Col>
          </Flex>
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
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <ActionItem>
              <UserOutlined />
              <span>Профиль</span>
            </ActionItem>
          </Link>
        </HeaderActions>
        <Flex align={"center"} gap={16}>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <ActionItem>
              <UserOutlined />
            </ActionItem>
          </Link>
          <ActionItem onClick={() => setDrawerOpen(true)}>
            <MenuOutlined />
          </ActionItem>
        </Flex>
      </MainHeader>
      
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
            <DrawerLogo>SX<span>Wine</span></DrawerLogo>
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
            <DrawerLink href="#">Команда</DrawerLink>
            
          </DrawerSection>
          
          <DrawerSection>
            <DrawerSectionTitle>Контакты</DrawerSectionTitle>
            <DrawerLink href="tel:88005557799">8 (800) 555-77-99</DrawerLink>
            <DrawerLink href="mailto:info@sxwine.ru">info@sxwine.ru</DrawerLink>
          </DrawerSection>
        </DrawerContent>
      </Drawer>
    </HeaderWrapper>
  );
};

export default Header;
