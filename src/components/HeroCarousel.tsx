import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import winesImage from '../pics/main/wines.png'
import eventsImage from '../pics/main/events.png'
import arrowRight from '../pics/actions/arrow-right.svg'
import { Avatar } from 'antd'

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
  animation: fadeIn 0.7s ease;
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
  background: rgba(231, 1, 76, 1);
  &::before {
    content: '';
    position: absolute;
    inset: 0;    
    z-index: 1;
  }
  
  &:hover {
    transform: scale(1.02);
  }
`
//background: linear-gradient(90deg, rgba(231, 1, 76, 1) 0%, rgba(0, 0, 0, 0.3) 100%);

const PromoContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  min-height: 170px;
`

const PromoBlock1 = styled.div`
  animation: slideUp 0.4s ease;
  margin: 0 0 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: white;
`

const PromoBlock2 = styled.div`
  animation: slideUp 0.7s ease;
  margin: 0 0 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: white;
`

const PromoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3em;
`

const PromoSubtitle = styled.p`
  font-size: 13px;
  opacity: 0.9;
  margin: 10px;
  width: 50%;
`

const HeroCarousel = () => {

  return (
    <>
      <CarouselSection>      
        <SidePromos>
          <PromoCard to={`/events`}
            style={{ 
              backgroundImage: `url(${eventsImage})`, 
              backgroundSize: '40% auto', 
              backgroundPosition: 'top right', 
              backgroundRepeat: 'no-repeat', 
            }}
          >
              <PromoBlock1>
                <div>
                  <PromoTitle>Дегустации</PromoTitle>
                  <PromoSubtitle>Присоединяйтесь к нашим дегустациям</PromoSubtitle>
                </div>
              </PromoBlock1>
          </PromoCard>
          <PromoCard to={`/wines?category=white-wine`}
            style={{ 
              backgroundImage: `url(${winesImage})`, 
              backgroundSize: '40% auto', 
              backgroundPosition: 'top right', 
              backgroundRepeat: 'no-repeat', 
            }}
          >
              <PromoBlock2>
                <div>
                  <PromoTitle>Коллекция вин</PromoTitle>
                  <PromoSubtitle>Познакомьтесь с нашей коллекцией вин</PromoSubtitle>
                </div>
              </PromoBlock2>
              <PromoSubtitle></PromoSubtitle>
          </PromoCard>
        </SidePromos>
      </CarouselSection>
    </>
  );
};

export default HeroCarousel;
