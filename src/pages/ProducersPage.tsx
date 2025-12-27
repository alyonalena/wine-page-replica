import { Breadcrumb, Avatar, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { allProducts } from '../data/products'
import backIcon from '../pics/actions/back.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
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

const PageTitle = styled(Typography.Title)`
  animation: slideUp 0.4s ease;
`

const ResultsCount = styled.span`
  color: ${theme.colors.muted};
  font-size: 14px;
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

const ProductCard = styled(Link)`
  background: ${theme.colors.background};
  border-radius: 12px;
  padding: 16px;
  transition: ${theme.transitions.default};
  position: relative;
  border: 1px solid ${theme.colors.border};
  text-decoration: none;
  display: block;
  
  &:hover {
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
    border-color: transparent;
  }
`

const ProductImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.foreground};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ProductMeta = styled.div`
  font-size: 12px;
  color: ${theme.colors.muted};
`

const ProducersPage = () => {

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
              <div>
                <PageTitle level={3}>Производители вин</PageTitle>
                <ResultsCount>Производители вин, которые мы собрали в нашей коллекции SX Wine</ResultsCount>
              </div>
            </PageHeader>

            <ProductsGrid>
              {allProducts.map((product) => (
                <ProductCard key={product.id} to={`/producer/${product.id}`}>
                  <ProductImageWrapper>
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>                     
                      <ProductMeta>{product.region}</ProductMeta>                           
                    </ProductInfo>
                  </ProductImageWrapper>
                </ProductCard>
              ))}
            </ProductsGrid>
          </Container>
        </main>
        <Footer />
      </PageWrapper>
  )
}

export default ProducersPage
