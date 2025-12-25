import { ConfigProvider, Breadcrumb, Select, Avatar, Button, Card, Image } from 'antd'
import { useSearchParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { allProducts } from '../data/products'
import cheers from '../pics/actions/cheers.svg'
import photo from '../pics/events/image1.png'

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
  animation: slideUp 0.4s ease;
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  color: ${theme.colors.foreground};
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
  border-radius: 3px;
  transition: ${theme.transitions.default};
  position: relative;
  text-decoration: none;
  display: block;
  
  &:hover {
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
    border-color: transparent;
  }
`

const ProductImage = styled.div`
  opacity: 0.9;
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

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .ant-rate {
    font-size: 12px;
  }
`

const AddToCartButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
  height: 40px;
  font-weight: 500;
`;


const EventsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'wine'

  const handleAddToCart = (e: React.MouseEvent) => {
    alert('Спасибо за интерес! С Вамим в ближайшее время свяжется наш администратор')
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic
  };

  return (
      <PageWrapper>
        <Header />
        <main>
          <Container>
            <BreadcrumbWrapper>
              <Breadcrumb
                items={[
                  { title: <Link to="/">На главную страницу</Link> }
                ]}
              />
            </BreadcrumbWrapper>

            <PageHeader>
              <div>
                <PageTitle>{'Дегустации'}</PageTitle>
                <ResultsCount>в Москве и Санкт-Петербурге</ResultsCount>
              </div>
            </PageHeader>

            <ProductsGrid>
              {allProducts.map((product) => (
                <ProductCard key={product.id} to={`/event/${product.id}`}>
                  <Card
                      style={{margin: 0}}
                    >
                    <ProductImage><Image src={photo}/></ProductImage>
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>                     
                      <ProductMeta>{product.region}</ProductMeta>                           
                    </ProductInfo>
                    <AddToCartButton type="primary" onClick={handleAddToCart}>
                      Хочу на эту дегустацию <Avatar src={cheers}/>
                    </AddToCartButton>
                  </Card>
                </ProductCard>
              ))}
            </ProductsGrid>
          </Container>
        </main>
        <Footer />
      </PageWrapper>
  )
}

export default EventsPage
