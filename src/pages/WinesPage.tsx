import { message, Breadcrumb, Avatar, Button, Card, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { allProducts } from '../data/products'
import backIcon from '../pics/actions/back.svg'
import bottle from '../pics/actions/pink.png'
import glass from '../pics/actions/glass.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px;
  background-position: top right, top right;
  background-image: url("src/pics/main/wines.png");
  background-size: 90px, 90px;
  background-repeat: no-repeat, no-repeat;
  background-blend-mode: overlay;
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
  animation: slideUp 0.4s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`

const PageTitle = styled(Typography.Title)`
  animation: slideUp 0.4s ease;
  line-height: 1;
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
  box-shadow: ${theme.shadows.cardHover};
`

const ProductImage = styled.div`
  width: 30%;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ProductName = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: ${theme.colors.foreground};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const AddToCartButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
  height: 40px;
  font-weight: 500;
`

const WinesPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const successWithCustomIcon = () => {
    messageApi.open({
      content: <>
        <Avatar src={glass} shape='square'/>&nbsp;Спасибо за интерес!<br/><br/>
        С Вамим в ближайшее время свяжется наш администратор
      </>,
      // Custom icon definition
    })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    successWithCustomIcon()
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic
  }

  return (
      <PageWrapper>
        <Header />
        <main>

          <Container>
          {contextHolder}
            <BreadcrumbWrapper>
              <Breadcrumb
                items={[
                  { title: <Link style={{ textAlign: 'center' }} to="/"><Avatar size={30} src={backIcon}/>&nbsp;На главную страницу</Link> },
                ]}
              />
            </BreadcrumbWrapper>

            <PageHeader>
              <div>
                <PageTitle level={3}>Коллекция вин</PageTitle>
                <Typography.Text type='secondary'>{allProducts.length} позиций</Typography.Text>
              </div>
            </PageHeader>

            <ProductsGrid>

              {allProducts.map((product) => (
                  <ProductCard key={product.id} to={`/wine/${product.id}`}>
                  <Card>
                    <Space style={{ gap: 24, marginBottom: 16}}>
                    <ProductImage><Avatar style={{backgroundColor: '#F5F5F5', padding: '10px'}} size={70} src={bottle}/></ProductImage>
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <Typography.Text type='secondary'>{product.color} • {product.sweetness} • {product.volume}</Typography.Text>   
                      <Typography.Text type='secondary'>{product.region}</Typography.Text>                              
                    </ProductInfo>
                    </Space>
                    <AddToCartButton type="primary" onClick={handleAddToCart}>
                      Хочу это вино <Avatar shape='square' src={glass}/>
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

export default WinesPage
