import { Breadcrumb, Typography, Avatar, Button, Card, Space, Flex, message } from 'antd'
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
  padding: 12px 20px;
  background-position: top right, top right;
  background-image: url("src/pics/main/events.png");
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
  box-shadow: ${theme.shadows.cardHover};
`

const AddToCartButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
  height: 40px;
  font-weight: 500;
`

const ProductName = styled.h2`
  font-size: 22px;
  font-weight: 400;
  color: ${theme.colors.foreground};
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ImportantInfo = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.colors.primary};
  line-height: 0.9;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const EventsPage = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const successWithCustomIcon = () => {
    messageApi.open({
      content: <>
        <Avatar src={cheers} shape='square'/>&nbsp;Спасибо за интерес!<br/><br/>
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
                <PageTitle level={3}>{'Дегустации'}</PageTitle>
                <ResultsCount>в Москве и Санкт-Петербурге</ResultsCount>
              </div>
            </PageHeader>

            <ProductsGrid>
              {allProducts.map((product) => (
                <ProductCard key={product.id} to={`/event/${product.id}`}>
                  <Card>
                    <Flex style={{ width: '100%' }} align={'center'}>
                      <ProductName>{'Дегустация «Marie Courtin»' }</ProductName>
                    </Flex>
                    <Flex style={{ width: '100%' }} align={'flex-start'} gap={16}>
                        <Avatar 
                          alt="SX" 
                          src={photo}
                          style={{ width: "130px", height: "130px" }} 
                        />
                        <Flex 
                          vertical
                          style={{ height: '100%',textAlign: 'left' }}
                        >
                          <div>                             
                              <ImportantInfo style={{ fontWeight: 'bold'}}>Москва</ImportantInfo>
                              <Space style={{ gap:4, lineHeight: '0.9' }}>
                                <Avatar size={20} src={marker}/>
                                <Typography.Text italic>Nappe</Typography.Text>
                              </Space>
                              <br /><br />  
                              <ImportantInfo>{'24 января'} ({'ПТ'})</ImportantInfo>
                              <ImportantInfo>19:00</ImportantInfo>
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
