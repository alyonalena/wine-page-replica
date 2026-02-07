import { Avatar, Typography, Flex, Button } from 'antd'
import styled from 'styled-components'
import Header from '../components/Header'
import { theme } from '../styles/theme'
import image0 from '../pics/team/image_0.png'
import image1 from '../pics/team/image_1.png'
import backIcon from '../pics/logo.png'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 24px 48px;
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`

const PageTitle = styled(Typography.Title)`
  animation: slideUp 0.4s ease;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: white;
`

const Name = styled.h3`
  font-size: 24px;
  margin: 20px 0;
  color: white;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid ${theme.colors.lightBg};
  box-shadow: 0 -5px 8px rgba(0, 0, 0, 0.2);
`

const BackButton = styled(Button)`
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
`


const TeamPage = () => {

  const team = [
    {
        id: 0,
        name: 'Яшкин Данил',
        info: "Идейный вдохновитель клуба, лектор с более чем 19-летним опытом в индустрии вина. Работал с ведущими компаниями: Alianta Group, Simple, À La Volée RWC",
        image: image0
    },
    {
        id: 1,
        name: 'Полина Королёва',
        info: 'Маркетолог клуба. Действующмй маркетолог швейцарского алкогольного дистрибьютора Monafaro (Цюрих), ex: российские винодельни Фанагория, Лефкадия, Николаев и Сыновья',
        image: image1
    }
  ]

  return (
    <PageWrapper>
      <Header />
      <main>
        <Container>
          <PageHeader>
           <PageTitle level={3}>Команда клуба</PageTitle>
          </PageHeader>
          
          <ProductsGrid>
            {team.map((member) => (
              <Flex vertical style={{ padding: '20px', backgroundColor: '#E7014C' }} gap={16}>
                <Flex style={{ width: '100%', backgroundColor: '#E7014C' }} align={'flex-start'} gap={16}>
                  <div style={{ padding: 0, margin: 0, width: 130}}>
                      <Avatar 
                          alt="SX" 
                          src={member.image}
                          style={{ width: "130px", height: "130px", boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)' }} 
                      />
                  </div>
                  <Name>{member.name}</Name>
                </Flex>
                <ItemInfo>{member.info}</ItemInfo>
              </Flex>
            ))}
          </ProductsGrid>
          <BottomButtonWrapper>
            <BackButton size="large" onClick={() => window.location.href = '/'}>
              <Avatar size={35} src={backIcon}/>
              {' На главную страницу'}
            </BackButton>
          </BottomButtonWrapper>
        </Container>
      </main>
    </PageWrapper>
  )
}

export default TeamPage
