import { Breadcrumb, Typography, Avatar, Button, Card, Space, Flex } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { allProducts } from '../data/products'
import cheers from '../pics/actions/cheers.svg'
import backIcon from '../pics/actions/back.svg'
import photo from '../pics/events/image1.png'
import marker from '../pics/actions/marker.svg'

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

`

const ProductInfo = styled.div`
  width: 50%;
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
`


const EventsPage = () => {

  const handleAddToCart = (e: React.MouseEvent) => {
    alert('Спасибо за интерес! С Вамим в ближайшее время свяжется наш администратор')
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic
  }

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
                <PageTitle level={3}>{'Дегустации'}</PageTitle>
                <ResultsCount>в Москве и Санкт-Петербурге</ResultsCount>
              </div>
            </PageHeader>

            <ProductsGrid>
              {allProducts.map((product) => (
                <ProductCard key={product.id} to={`/event/${product.id}`}>
                  <Card
                    style={{ 
                        width: '100%', 
                        margin: "0", 
                        padding: '0',
                        backgroundColor: 'rgba(255,255,255, 0.9)',
                        boxShadow: '0px 0px 14px -2px rgba(34, 60, 80, 0.24)'
                    }}
                  >
                    <Flex style={{ width: '100%'}} vertical align={'center'}>
                        <div>
                            <Typography.Title level={4}>{'Дегустация «Marie Courtin»' }</Typography.Title>
                        </div><br/>
                    </Flex>
                    <Flex style={{ width: '100%', padding: '0 0 20px' }} align={'flex-start'} gap={16}>
                        <Avatar 
                            alt="SX" shape="square" 
                            src={photo} 
                            style={{ width: "130px", height: "170px", 
                            boxShadow: 'inset -16px 0 24px -12px rgba(0, 0, 0, 0.45)' }} 
                        />
                        <Flex 
                            vertical
                            style={{ height: '100%', width: '70%', textAlign: 'left' }}
                        >
                          <div>
                              <div style={{ lineHeight: 0}}>
                                  <Typography.Title style={{color: '#E7014C'}} level={4}>Москва</Typography.Title>
                                  <Space style={{gap:8}}>
                                    <Avatar size={20} src={marker}/>                                  
                                    <Typography.Text italic>Nappe</Typography.Text></Space>
                              </div>
                              <br/>
                              <Typography.Title style={{color: '#E7014C'}} level={4}>{'24 января'} ({'ПТ'})</Typography.Title>

                              {/* event.price && (<Space><WalletOutlined style={{ color: '#B8B8B8'}}/><Text italic>{ event.price }</Text></Space>)*/}
                              <br />  
                          </div>
                      </Flex> 
                  </Flex>
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
