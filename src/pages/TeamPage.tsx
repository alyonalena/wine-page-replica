import { Breadcrumb, Avatar, Typography, Flex,  } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import image0 from '../pics/team/image_0.png'
import image1 from '../pics/team/image_1.png'
import backIcon from '../pics/actions/back.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px 20px;
`

const BreadcrumbWrapper = styled.div`
  margin-bottom: 24px;
  
  .ant-breadcrumb-link a {
    color: ${theme.colors.muted};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
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
          <BreadcrumbWrapper>
            <Breadcrumb
              items={[
                { title: <Link style={{ textAlign: 'center' }} to="/"><Avatar size={30} src={backIcon}/>&nbsp;На главную страницу</Link> },
              ]}
            />
          </BreadcrumbWrapper>

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
                          style={{ width: "130px", height: "130px" }} 
                      />
                  </div>
                  <Name>{member.name}</Name>
                </Flex>
                <ItemInfo>{member.info}</ItemInfo>
              </Flex>
            ))}
          </ProductsGrid>
        </Container>
      </main>
      <Footer />
    </PageWrapper>
  )
}

export default TeamPage
