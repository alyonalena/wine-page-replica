import { message, Breadcrumb, Avatar, Button, Card, Space, Typography, Flex, Spin } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'

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
  padding: 12px 20px;
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

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 400;
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
      duration: 2,
      content: <>
        <Avatar src={glass} shape='square'/>&nbsp;Спасибо за интерес!<br/><br/>
        С Вамим в ближайшее время свяжется наш администратор
      </>,
    })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    successWithCustomIcon()
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic
  }


  const { data: wines, isLoading, isError } = useQuery({
    queryKey: ['wines'],
    queryFn: async () => {
      const response = await fetch("https://severely-superior-monster.cloudpub.ru/api/wines/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
  console.info(wines)

  const getContent = () => {
    if (isError) {
      return (
        <Flex style={{ alignItems: 'center', height: '100vh'}}>
          <Typography.Title>Oops! Something went wrong</Typography.Title>
        </Flex>
      )
    }
    if (isLoading) {
      return (
        <Flex style={{ alignItems: 'center', height: '100vh', justifyContent: 'space-between'}}>
          <Spin/>
        </Flex>
      )
    } else {
      return (
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
              <Typography.Text type='secondary'>Всего: {wines.length}</Typography.Text>
            </div>
          </PageHeader>
  
          <ProductsGrid>
  
            {wines.map((wine) => (
                <ProductCard key={wine.id} to={`/wine/${wine.id}`}>
                <Card>
                  <Space style={{ gap: 24, marginBottom: 16}}>
                  <ProductImage><Avatar style={{backgroundColor: '#F5F5F5', padding: '10px'}} size={50} src={bottle}/></ProductImage>
                  <ProductInfo>
                    <ProductName style={{fontSize: '1.3em' }}>{wine.name}</ProductName>
                    <ProductName>{wine.producer?.name} • {wine.aging} г.</ProductName>
                    <Typography.Text type='secondary'>{wine.color?.name} • {wine.sugar?.name} • {wine.volume}л.</Typography.Text>   
                    <Typography.Text type='secondary'>{wine.country?.name} • {wine.region?.name}</Typography.Text>                              
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
      )
    }
  }

  return (
      <PageWrapper>
        <Header />
        <main>
          {getContent()}
        </main>
        <Footer />
      </PageWrapper>
  )
}

export default WinesPage
