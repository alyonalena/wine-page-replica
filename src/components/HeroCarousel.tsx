import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import winesImage from '../pics/main/wines.png'
import eventsImage from '../pics/main/events.png'


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
`


const SidePromos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

`

const PromoCard = styled(Link)`
  flex: 1;
  background-size: cover;
  background-position: center;
  border-radius: 3px;
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
    background: linear-gradient(90deg, rgba(231, 1, 76, 1) 0%, rgba(252, 252, 252, 0.3) 100%);
    z-index: 1;
  }
  
  &:hover {
    transform: scale(1.02);
  }
`

const PromoContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
    min-height: 170px;
`

const PromoTitle = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin: 0 0 8px;
`

const PromoSubtitle = styled.p`
  font-size: 13px;
  opacity: 0.9;
  margin: 0;
`

const HeroCarousel = () => {

  return (
    <>
      <CarouselSection>      
        <SidePromos>
          <PromoCard to={`/events`}
            style={{ 
              backgroundImage: `url(${eventsImage})`, 
              backgroundSize: 'auto 220px', 
              backgroundPosition: 'top right', 
              backgroundRepeat: 'no-repeat', 
            }}
          >
            <PromoContent>            
              <PromoTitle>Дегустации</PromoTitle>
              <PromoSubtitle></PromoSubtitle>
            </PromoContent>
          </PromoCard>
          <PromoCard to={`/wines?category=white-wine`}
            style={{ 
              backgroundImage: `url(${winesImage})`, 
              backgroundSize: 'auto 220px', 
              backgroundPosition: 'top right', 
              backgroundRepeat: 'no-repeat', 
            }}
          >
            <PromoContent>
              <PromoTitle>Коллекция вин</PromoTitle>
              <PromoSubtitle></PromoSubtitle>
            </PromoContent>
          </PromoCard>
        </SidePromos>
      </CarouselSection>
    </>
  );
};

export default HeroCarousel;
