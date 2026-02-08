import { Avatar, Button } from 'antd'
import styled from 'styled-components'
import Header from '../components/Header'
import { theme } from '../styles/theme'
import backIcon from '../pics/logo.png'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 8px 100px;
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;  
  line-height: 0.9;
`

const PageTitle = styled.div`
  animation: slideUp 0.4s ease;
  color: ${theme.colors.foreground};
  font-size: 1.4rem;
  padding: 8px;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  
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


const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
`

const BackButton = styled(Button)`
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  padding: 12px 20px 12px 10px;
  color: #E3E3E3;
  background: #333333;
`

const ClubRulesPage = () => {
  return (
    <PageWrapper>
      <Header />
      <main>
        <Container>
          <PageHeader>
           <PageTitle>Правила клуба</PageTitle>
          </PageHeader> 
          <ProductsGrid>
            <div>
              Мы действуем в соответствии с законодательством РФ и не занимаемся онлайн-продажей или рекламой алкоголя.
              <br/><br/>
              Материалы сайта носят сугубо ознакомительный характер.
            </div>
          </ProductsGrid>
          <BottomButtonWrapper>
            <BackButton size="large" onClick={() => window.location.href = '/'}>
            <Avatar size={35} src={backIcon} style={{ border: '1px solid #606060'}}/>
              {' На главную страницу'}
            </BackButton>
          </BottomButtonWrapper>
        </Container>
      </main>
    </PageWrapper>
  )
}

export default ClubRulesPage

