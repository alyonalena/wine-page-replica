import styled from 'styled-components';
import { Input, Button } from 'antd';
import {
  InstagramOutlined,
} from '@ant-design/icons';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom'

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

const FooterTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  const navigate = useNavigate()

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterGrid>   
          <FooterColumn>
          <SocialLinks>
              <SocialIcon href="https://www.instagram.com/sx_wine"><InstagramOutlined /></SocialIcon>
            </SocialLinks>
            <FooterTitle>Подписка на новости</FooterTitle>
            <FooterText>
              Получайте информацию о новинках, акциях и эксклюзивных предложениях
            </FooterText>
            <NewsletterForm>
              <Input placeholder="Ваш email" />
              <Button type="primary">Подписаться</Button>
            </NewsletterForm>            
          </FooterColumn>
        </FooterGrid>
        
        <FooterBottom>
          <FooterBottomLinks>
            <a href="#" onClick={(e) => { e.stopPropagation(); navigate('/rules') }}>Правила клуба</a>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
