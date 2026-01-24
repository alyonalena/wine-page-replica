import { Breadcrumb, Typography, Image, Button, Space, Flex, message, Spin, Avatar, Divider } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import cheers from '../pics/actions/cheers.svg'
import backIcon from '../pics/actions/back.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px 16px;
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
  line-height: 0.8;
`

const PageTitle = styled(Typography.Title)`
  animation: slideUp 0.4s ease;
`

const ResultsCount = styled.span`
  color: ${theme.colors.muted};
  font-size: 12px;
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
  border: 1px solid rgba(255, 255, 255, 0.4);
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
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.foreground};
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ImportantInfo = styled.h2`
  font-size: 16px;
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
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch("https://severely-superior-monster.cloudpub.ru/api/events/", {
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
  console.info(events)

  const successWithCustomIcon = () => {
    messageApi.open({
      duration: 2,
      content: <>
        <Avatar src={cheers} shape='square'/>&nbsp;Спасибо за интерес!<br/><br/>
        SX Wine свяжется с Вамим в ближайшее время
      </>,
    })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    successWithCustomIcon()
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic
  }

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
        <Flex style={{ alignItems: 'center', height: '100vh'}}>
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
          <Divider/>
          <PageHeader>
            <div>
              <PageTitle level={3}>{'Дегустации'}</PageTitle>              
              <ResultsCount>в Москве и Санкт-Петербурге</ResultsCount>
            </div>
          </PageHeader> 
          <ProductsGrid>  
            {events.map((event) => (
              <ProductCard key={event.id} to={`/event/${event.id}`}>
                <Flex style={{ width: '100%', padding: '8px 16px'}} align={'center'}>
                  <ProductName>{event.name}</ProductName>
                </Flex> 
                <Flex style={{ width: '100%', padding: '8px 16px'}} align={'flex-start'} gap={8}>
                  <div style={{ padding: 0, margin: 0, minWidth: 130}}>
                      <Avatar 
                        alt="SX" 
                        src={event.image}
                        style={{ width: 130, height: 130 }} 
                      />
                  </div>
                  <Flex 
                      vertical
                      style={{ height: '100%',textAlign: 'left' }}
                    >
                      <div>
                          <ImportantInfo>{event.city.name}</ImportantInfo>
                          <Space style={{ gap:4, lineHeight: '0.9' }}>
                            <Typography.Text type='secondary'>{event.place} • {event.address}</Typography.Text>
                          </Space>
                          <br />  <br /> 
                          <ImportantInfo>{event.date} • {'19:00'}</ImportantInfo>
                      </div>
                  </Flex> 
                </Flex>
                <AddToCartButton type="primary" onClick={handleAddToCart}>
                  Хочу на эту дегустацию <Avatar src={cheers}/>
                </AddToCartButton>
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

export default EventsPage
