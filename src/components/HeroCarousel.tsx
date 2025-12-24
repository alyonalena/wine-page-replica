import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import { theme } from '../styles/theme';
import back from '../pics/main/back.jpg';
import back2 from '../pics/main/back_2.jpg';
import back3 from '../pics/main/back_3.jpg';
import image1 from '../pics/main/image1.png';
import image2 from '../pics/main/image222.png';
import image3 from '../pics/main/image3.png';
import image4 from '../pics/main/image4.png';

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

const ImageSlide = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 12px;
`;

const SidePromos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

`;

const PromoCard = styled(Link)`
  flex: 1;
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
    background: linear-gradient(135deg, rgba(231, 1, 76, 1) 0%, rgba(240, 214, 189, 0.86) 100%);
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

const PromoTitle = styled.div`
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

const HeroCarousel = () => {
  const images = [back, back2, back3, image1, image2, image3, image4];

  return (
    <CarouselSection>

      
      <SidePromos>
        <PromoCard to={`/events`}>
          <PromoContent>
            <PromoTitle>Дегустации</PromoTitle>
            <PromoSubtitle></PromoSubtitle>
          </PromoContent>
        </PromoCard>
        <PromoCard to={`/wines?category=white-wine`}>
          <PromoContent>
            <PromoTitle>Коллекция вин</PromoTitle>
            <PromoSubtitle></PromoSubtitle>
          </PromoContent>
        </PromoCard>
      </SidePromos>
    </CarouselSection>
  );
};

export default HeroCarousel;
