import { useState } from 'react'
import { Breadcrumb, Avatar, Button, Typography, Flex, Spin, Divider } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { useTelegramId } from '../hooks/useTelegramId'
import NotificationModal from '../components/NotificationModal'
import { TG_API_BASE_URL } from '../lib/api'
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
  padding: 12px 16px;
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

const PageTitle = styled.div`
  animation: slideUp 0.4s ease;
  color: ${theme.colors.foreground};
  font-weight: bold;
  font-size: 2.2rem;
  margin: 8px 16px;
`

const ResultsCount = styled.span`
  color: ${theme.colors.muted};
  font-size: 0.8rem;
  margin: 0 32px;
`

const ProductCard = styled(Link)`
  background: ${theme.colors.lightBg};
  border-radius: 3px;
  border: 1px solid ${theme.colors.border};
  text-decoration: none;
`

const ProductName = styled.span`
  color: ${theme.colors.foreground};
  font-weight: bold;
  font-size: 1.2rem;
  margin: 16px 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ProducerName = styled.span`
  color: ${theme.colors.foreground};
  font-weight: bold;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ImportantInfo = styled.span`
  color: ${theme.colors.primary};
  margin: 0 0 16px;
  overflow: hidden;
  font-weight: bold;
`

const AddToCartButton = styled(Button)`
  margin: 0;
  width: 100%;
  height: 40px;
  font-weight: 500;
`

const WinesPage = () => {
  const telegramId = useTelegramId();
  const [notificationModal, setNotificationModal] = useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    content: React.ReactNode;
    icon?: React.ReactNode;
  }>({
    isVisible: false,
    type: 'info',
    content: null,
  });

  const showSuccessNotification = () => {
    setNotificationModal({
      isVisible: true,
      type: 'success',
      content: <>Спасибо за интерес!<br/><br/>SX Wine свяжется с Вамим в ближайшее время</>,
      icon: <Avatar src={glass} style={{backgroundColor: '#E7014C', padding: '10px'}} size={70}/>,
    });
  };

  const mutation = useMutation({
    mutationFn: async ({ wineId, telegramId }: { wineId: number; telegramId: number }) => {
      const response = await fetch(`${TG_API_BASE_URL}/notifications/wine-interest/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wine_id: wineId,
          telegram_id: telegramId,
        }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: (data) => {
      console.log('Wine interest notification sent successfully:', data)
      showSuccessNotification()
    },
    onError: (error) => {
      console.error('Error sending wine interest notification:', error)
      setNotificationModal({
        isVisible: true,
        type: 'error',
        content: 'Произошла ошибка при отправке запроса. Попробуйте позже.',
      })
    },
  })

  const handleAddToCart = (e: React.MouseEvent, wineId: number) => {
    e.preventDefault()
    e.stopPropagation()
    
    mutation.mutate({
      wineId: wineId,
      telegramId: telegramId,
    })
  }


  const { data: wines, isLoading, isError } = useQuery({
    queryKey: ['wines'],
    queryFn: async () => {
      const response = await fetch(`${TG_API_BASE_URL}/wines/`, {
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
        <Flex style={{ alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%'}}>
          <Spin/>
        </Flex>
      )
    } else {
      return (
        <Container>
          <NotificationModal
            isVisible={notificationModal.isVisible}
            onClose={() => setNotificationModal({ ...notificationModal, isVisible: false })}
            type={notificationModal.type}
            content={notificationModal.content}
            icon={notificationModal.icon}
          />
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
              <PageTitle>Коллекция вин</PageTitle>
              <ResultsCount>Всего: {wines.length}</ResultsCount>
            </div>
          </PageHeader>
  
          <ProductsGrid>
  
            {wines.map((wine) => (
                <ProductCard key={wine.id} to={`/wine/${wine.id}`}>                  
                  <ProductName>{wine?.name}</ProductName>                  
                  <Flex style={{ width: '100%', padding: '16px '}} align={'start'} gap={16}>
                    <div style={{ padding: 0, margin: 0, width: 100}}>
                        {wine?.image ? (
                          <Avatar
                              size={100} 
                              src={wine.image}/>
                          ): (
                            <Avatar 
                              style={{backgroundColor: '#F5F5F5', padding: '10px'}} 
                              size={100} 
                              src={bottle}/>
                          )}
                    </div>
                    <Flex 
                        vertical
                        style={{ height: '100%', textAlign: 'left' }}
                      >
                        <ProducerName>{wine?.producer?.name}</ProducerName>
                        <ImportantInfo>{wine?.aging ? `${wine.aging} г.`: ''}</ImportantInfo>
                        <Typography.Text type='secondary'>{wine.color?.name} • {wine.sugar?.name} • {wine.volume}л.</Typography.Text>   
                        <Typography.Text type='secondary'>{wine.country?.name} • {wine.region?.name}</Typography.Text>                              
                    </Flex> 
                  </Flex>
                <AddToCartButton type="primary" onClick={(e) => handleAddToCart(e, wine.id)}>
                  Хочу это вино <Avatar shape='square' src={glass}/>
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

export default WinesPage
