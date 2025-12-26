import { Breadcrumb, Rate, Button, Tabs, Divider, Avatar, Space, Typography } from 'antd'
import { useParams, Link } from 'react-router-dom'
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
  backgroundPosition: 'top center, top center',
  backgroundImage: url('../pics/main/backWine.png'),
  backgroundSize: 'cover, contain',
  backgroundRepeat: 'no-repeat, no-repeat',
  backgroundColor: 'rgba(79, 77, 64, 0.3)', /* Black overlay with 50% opacity */
  backgroundBlendMode: 'overlay'
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

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`

const ProductImageWrapper = styled.div`
  background: ${theme.colors.lightBg};
  border-radius: 16px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const ButtonsSection = styled.div`
  display: flex;
  gap: 12px;
`

const AddToCartButton = styled(Button)`
  flex: 1;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
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

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${theme.colors.border};
`;

const SpecLabel = styled.span`
  font-size: 14px;
  color: ${theme.colors.muted};
`;

const SpecValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.foreground};
`;

const TabsSection = styled.div`
  margin-top: 48px;
  
  .ant-tabs-nav {
    margin-bottom: 24px;
    
    &::before {
      border-bottom: 1px solid ${theme.colors.border};
    }
  }
  
  .ant-tabs-tab {
    font-size: 16px;
    font-weight: 500;
    color: ${theme.colors.muted};
    padding: 12px 0;
  }
  
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${theme.colors.foreground} !important;
  }
  
  .ant-tabs-ink-bar {
    background: ${theme.colors.primary};
    height: 3px;
  }
`;

const DescriptionText = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${theme.colors.foreground};
`

const WineDetailPage = () => {
  const { id } = useParams()
  
  const product = allProducts.find(p => p.id === Number(id))
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic
  }

  if (!product) {
    return (
      <PageWrapper>
        <Header />
        <Container>
          <h1>Товар не найден</h1>
          <Link to="/wines">Перейти в коллекцию вин</Link>
        </Container>
        <Footer />
      </PageWrapper>
    )
  }

  const specs = [
    { label: 'Страна', value: product.country },
    { label: 'Регион', value: product.region.split(',')[0] },
    { label: 'Виноград', value: product.grape },
    { label: 'Крепость', value: product.alcohol },
    { label: 'Цвет', value: product.color },
    { label: 'Сахар', value: product.sweetness },
    { label: 'Год урожая', value: product.year },
    { label: 'Объём', value: product.volume },
  ]

  const tabItems = [
    {
      key: 'description',
      label: 'Описание',
      children: <DescriptionText>{product.description}</DescriptionText>,
    },
    {
      key: 'specs',
      label: 'Характеристики',
      children: (
        <SpecsGrid>
          {specs.map((spec) => (
            <SpecItem key={spec.label}>
              <SpecLabel>{spec.label}</SpecLabel>
              <SpecValue>{spec.value}</SpecValue>
            </SpecItem>
          ))}
        </SpecsGrid>
      ),
    },
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
                  { title: <Link to="/wines">К другим винам</Link> }
                ]}
              />
            </BreadcrumbWrapper>
            <ProductLayout>
              <ProductInfo>
                <Space style={{ gap: 24, marginBottom: 16}}>
                  <ProductImage><Avatar style={{backgroundColor: '#F5F5F5', padding: '10px'}} size={70} src={bottle}/></ProductImage>
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <Typography.Text type='secondary'>{product.color} • {product.sweetness} • {product.volume}</Typography.Text>   
                    <Typography.Text type='secondary'>{product.region}</Typography.Text>                              
                  </ProductInfo>
                </Space>
                <ButtonsSection>
                  <AddToCartButton type="primary" onClick={handleAddToCart}>
                    Хочу это вино <Avatar shape='square' src={glass}/>
                  </AddToCartButton>
                </ButtonsSection>
              </ProductInfo>
            </ProductLayout>
            <TabsSection>
              <Tabs items={tabItems} defaultActiveKey="description" />
            </TabsSection>
          </Container>
        </main>
        <Footer />
      </PageWrapper>
  )
}

export default WineDetailPage
