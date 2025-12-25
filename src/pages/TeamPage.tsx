import { Card, Breadcrumb, Avatar } from 'antd'
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
  padding: 24px 20px;
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
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  color: ${theme.colors.foreground};
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

const ItemCard = styled.div`
  background: ${theme.colors.primary};
  border-radius: 12px;
  padding: 16px 16px 24px;
  transition: ${theme.transitions.default};
  position: relative;
  border: 1px solid ${theme.colors.border};
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: white;
  &:hover {
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
    border-color: transparent;
  }
`

const TeamImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`

const ImageWrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  overflow-y: hidden;
  border-radius: 8px;
`

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: white;
  margin-bottom: 20px;
`

const Name = styled.h3`
  font-size: 24px;
  margin: 0;
  line-height: 3.0;
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
                { title: <Link to="/"><Avatar size={15} src={backIcon}/>&nbsp;На главную страницу</Link> }
              ]}
            />
          </BreadcrumbWrapper>

          <PageHeader>
            <div>
              <PageTitle>Команда клуба</PageTitle>
            </div>
          </PageHeader>
          
          <ProductsGrid>
            {team.map((member) => (
              <Card key={member.id}
                hoverable
                style={{ backgroundColor: '#E7014C' }}
                cover={<img alt="example" src={member.image} />}
              >
                <ItemInfo>
                  <Name>{member.name}</Name>
                  {member.info}
                </ItemInfo>
              </Card>
            ))}
          </ProductsGrid>
        </Container>
      </main>
      <Footer />
    </PageWrapper>
  )
}

export default TeamPage
