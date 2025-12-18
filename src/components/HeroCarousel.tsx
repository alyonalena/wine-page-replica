import styled from 'styled-components';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';

const CarouselSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 20px;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const MainCarousel = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  
  .ant-carousel {
    .slick-slide {
      > div {
        display: flex;
      }
    }
  }
`;

const CarouselSlide = styled.div<{ $bgColor?: string }>`
  height: 360px;
  background: ${props => props.$bgColor || '#2c2c2c'};
  display: flex !important;
  align-items: center;
  padding: 40px 60px;
  position: relative;
  overflow: hidden;
`;

const SlideContent = styled.div`
  color: white;
  z-index: 2;
  max-width: 50%;
`;

const SlideTitle = styled.h2`
  font-size: 42px;
  font-weight: 300;
  margin: 0 0 8px;
  line-height: 1.1;
`;

const SlideSubtitle = styled.p`
  font-size: 64px;
  font-weight: 300;
  margin: 0 0 16px;
  opacity: 0.9;
`;

const SlideDescription = styled.p`
  font-size: 16px;
  opacity: 0.8;
  margin: 0;
`;

const SlideImage = styled.img`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  height: 90%;
  object-fit: contain;
`;

const NavArrow = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.$direction}: 16px;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: ${theme.transitions.default};
  box-shadow: ${theme.shadows.card};
  
  &:hover {
    background: white;
    box-shadow: ${theme.shadows.cardHover};
  }
  
  .anticon {
    font-size: 16px;
    color: ${theme.colors.foreground};
  }
`;

const SidePromos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    flex-direction: row;
  }
`;

const PromoCard = styled.div<{ $bgImage?: string }>`
  flex: 1;
  background: ${props => props.$bgImage ? `url(${props.$bgImage})` : theme.colors.lightBg};
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 170px;
  cursor: pointer;
  transition: ${theme.transitions.default};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(139, 21, 56, 0.85) 0%, rgba(139, 21, 56, 0.6) 100%);
    z-index: 1;
  }
  
  &:hover {
    transform: scale(1.02);
  }
`;

const PromoContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
`;

const PromoTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
`;

const PromoSubtitle = styled.p`
  font-size: 13px;
  opacity: 0.9;
  margin: 0;
`;

const PromoImage = styled.img`
  position: absolute;
  right: 10px;
  bottom: 10px;
  height: 80px;
  object-fit: contain;
  z-index: 2;
`;

const AllPromosLink = styled.a`
  display: block;
  text-align: center;
  padding: 12px;
  background: ${theme.colors.lightBg};
  border-radius: 8px;
  color: ${theme.colors.foreground};
  text-decoration: none;
  font-size: 14px;
  transition: ${theme.transitions.default};
  
  &:hover {
    background: ${theme.colors.border};
    color: ${theme.colors.primary};
  }
`;

const HeroCarousel = () => {
  const slides = [
    {
      title: 'Каталог',
      subtitle: '25|26',
      description: 'Юбилейный выпуск',
      bgColor: '#3c3c3c',
    },
    {
      title: 'Новогодняя',
      subtitle: 'коллекция',
      description: 'Лучшие вина к празднику',
      bgColor: '#2a1a1f',
    },
    {
      title: 'Шампанское',
      subtitle: '2025',
      description: 'Встречайте Новый год',
      bgColor: '#1a2a3a',
    },
  ];

  return (
    <CarouselSection>
      <MainCarousel>
        <Carousel autoplay autoplaySpeed={5000} dots>
          {slides.map((slide, index) => (
            <CarouselSlide key={index} $bgColor={slide.bgColor}>
              <SlideContent>
                <SlideTitle>{slide.title}</SlideTitle>
                <SlideSubtitle>{slide.subtitle}</SlideSubtitle>
                <SlideDescription>{slide.description}</SlideDescription>
              </SlideContent>
            </CarouselSlide>
          ))}
        </Carousel>
        <NavArrow $direction="left">
          <LeftOutlined />
        </NavArrow>
        <NavArrow $direction="right">
          <RightOutlined />
        </NavArrow>
      </MainCarousel>
      
      <SidePromos>
        <PromoCard>
          <PromoContent>
            <PromoTitle>Особые подарки</PromoTitle>
            <PromoSubtitle>Великое и редкое к празднику</PromoSubtitle>
          </PromoContent>
        </PromoCard>
        <PromoCard>
          <PromoContent>
            <PromoTitle>Вся коллекция брютов</PromoTitle>
            <PromoSubtitle>Настраивайтесь на Новый год</PromoSubtitle>
          </PromoContent>
        </PromoCard>
        <AllPromosLink href="#">Все акции</AllPromosLink>
      </SidePromos>
    </CarouselSection>
  );
};

export default HeroCarousel;
