import { Breadcrumb, Avatar, Button, Tabs, List, Flex, Space, Typography, message } from 'antd'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { allProducts } from '../data/products'
import cheers from '../pics/actions/cheers.svg'
import backIcon from '../pics/actions/back.svg'
import bottle from '../pics/actions/pink.png'
import user from '../pics/actions/user.svg'
import photo from '../pics/events/image1.png'

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

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 24px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
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

const EventDetailPage = () => {
  const { id } = useParams()
  const [messageApi, contextHolder] = message.useMessage();

  const successWithCustomIcon = () => {
    messageApi.open({
      duration: 2,
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

  const product = allProducts.find(p => p.id === Number(id))
  
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
    );
  }

  const favoriteWines = allProducts.slice(0, 5)

  const tabItems = [
    {
      key: 'description',
      label: 'Описание',
      children: (
        <>
          Описание дегустации
        </>
      )
    },
    {
      key: 'set',
      label: 'Винный сет',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={favoriteWines}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar style={{backgroundColor: '#F5F5F5', padding: '10px'}} size={50} src={bottle}/>}
                title={item.name}
                description={`${item.region} • ${item.volume}`}
              />
            </List.Item>
          )}
        />
      )
    },
    {
      key: 'members',
      label: 'Участники',
      children: (
        <>
          {favoriteWines.map((favoriteWine) => (            
             <Avatar key={favoriteWine.id}style={{backgroundColor: '#F5F5F5', padding: '10px', margin: '10px'}} size={50} src={user}/>
          ))}
        </>
      ),
    },
  ]

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
                  { title: <Link to="/events">К другим дегустациям</Link> }
                ]}
              />
            </BreadcrumbWrapper>

            <ProductLayout>
              <ProductInfo>
                  <Flex style={{ width: '100%' }} align={'center'}>
                    <ProductName>{'Дегустация «Marie Courtin»' }</ProductName>
                  </Flex> 
                  <Flex style={{ width: '100%'}} align={'flex-start'} gap={16}>
                        <div style={{ padding: 0, margin: 0, width: 130}}>
                            <Avatar 
                              alt="SX" 
                              src={photo}
                              style={{ width: "130px", height: "130px" }} 
                            />
                        </div>
                        <Flex 
                            vertical
                            style={{ height: '100%',textAlign: 'left' }}
                          >
                            <div>
                                <ImportantInfo>Москва</ImportantInfo>
                                <Space style={{ gap:4, lineHeight: '0.9' }}>
                                  
                                  <Typography.Text type='secondary'>{'Nappe'} • {'Скатертный переулок, д. 13'}</Typography.Text>
                                </Space>
                                <br /><br />  
                                <ImportantInfo>{'24 января'} • {'ПТ'} • {'19:00'}</ImportantInfo>

                                <br />  
                            </div>
                        </Flex> 
                    </Flex>              
                <ButtonsSection>
                  <AddToCartButton type="primary" onClick={(e) => handleAddToCart(e)}>
                    Хочу на эту дегустацию <Avatar src={cheers}/>
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

export default EventDetailPage
