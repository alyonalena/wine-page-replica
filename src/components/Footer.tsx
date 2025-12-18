import styled from 'styled-components';
import { Input, Button } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { theme } from '../styles/theme';

const FooterWrapper = styled.footer`
  background: ${theme.colors.foreground};
  color: white;
  padding: 48px 0 24px;
  margin-top: 48px;
`;

const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr) 1.5fr;
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div``;

const FooterLogo = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  
  span {
    opacity: 0.7;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.6;
  margin: 0 0 16px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  
  .anticon {
    font-size: 16px;
    opacity: 0.7;
  }
`;

const FooterTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 12px;
  
  a {
    color: white;
    opacity: 0.7;
    text-decoration: none;
    font-size: 14px;
    transition: ${theme.transitions.default};
    
    &:hover {
      opacity: 1;
    }
  }
`;

const NewsletterForm = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  
  .ant-input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      border-color: ${theme.colors.primary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: ${theme.transitions.default};
  
  &:hover {
    background: ${theme.colors.primary};
  }
  
  .anticon {
    font-size: 18px;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Copyright = styled.p`
  font-size: 13px;
  opacity: 0.5;
  margin: 0;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 24px;
  
  a {
    color: white;
    opacity: 0.5;
    text-decoration: none;
    font-size: 13px;
    
    &:hover {
      opacity: 1;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterGrid>
          <FooterColumn>
            <FooterLogo>
              simple<span>wine</span>
            </FooterLogo>
            <FooterText>
              Крупнейшая сеть винотек премиум-класса в России. Более 10 000 наименований вин и крепких напитков.
            </FooterText>
            <ContactItem>
              <PhoneOutlined />
              <span>8 (800) 555-77-99</span>
            </ContactItem>
            <ContactItem>
              <MailOutlined />
              <span>info@simplewine.ru</span>
            </ContactItem>
            <ContactItem>
              <EnvironmentOutlined />
              <span>Москва, 50+ винотек</span>
            </ContactItem>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Каталог</FooterTitle>
            <FooterLinks>
              <FooterLink><a href="#">Вино</a></FooterLink>
              <FooterLink><a href="#">Шампанское</a></FooterLink>
              <FooterLink><a href="#">Виски</a></FooterLink>
              <FooterLink><a href="#">Коньяк</a></FooterLink>
              <FooterLink><a href="#">Крепкие напитки</a></FooterLink>
              <FooterLink><a href="#">Аксессуары</a></FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Покупателям</FooterTitle>
            <FooterLinks>
              <FooterLink><a href="#">Доставка и оплата</a></FooterLink>
              <FooterLink><a href="#">Бонусная программа</a></FooterLink>
              <FooterLink><a href="#">Подарочные сертификаты</a></FooterLink>
              <FooterLink><a href="#">Акции и скидки</a></FooterLink>
              <FooterLink><a href="#">Адреса винотек</a></FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Компания</FooterTitle>
            <FooterLinks>
              <FooterLink><a href="#">О нас</a></FooterLink>
              <FooterLink><a href="#">Блог</a></FooterLink>
              <FooterLink><a href="#">Дегустации</a></FooterLink>
              <FooterLink><a href="#">Корпоративным клиентам</a></FooterLink>
              <FooterLink><a href="#">Контакты</a></FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Подписка на новости</FooterTitle>
            <FooterText>
              Получайте информацию о новинках, акциях и эксклюзивных предложениях
            </FooterText>
            <NewsletterForm>
              <Input placeholder="Ваш email" />
              <Button type="primary">Подписаться</Button>
            </NewsletterForm>
            <SocialLinks>
              <SocialIcon href="#"><InstagramOutlined /></SocialIcon>
              <SocialIcon href="#"><FacebookOutlined /></SocialIcon>
              <SocialIcon href="#"><YoutubeOutlined /></SocialIcon>
            </SocialLinks>
          </FooterColumn>
        </FooterGrid>
        
        <FooterBottom>
          <Copyright>© 2024 SimpleWine. Все права защищены.</Copyright>
          <FooterBottomLinks>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Пользовательское соглашение</a>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
