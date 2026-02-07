import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Button, Tabs, Avatar, Space, Typography, Flex, Spin, Divider } from 'antd'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { useTelegramId } from '../hooks/useTelegramId'
import NotificationModal from '../components/NotificationModal'
import { TG_API_BASE_URL } from '../lib/api'
import backIcon from '../pics/actions/back.svg'
import bottle from '../pics/actions/pink.png'
import glass from '../pics/actions/glass.svg'
import forwardIcon from '../pics/actions/forward.svg'
import Danil from '../pics/main/danil.jpg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px;
  padding-bottom: 80px;
  backgroundPosition: 'top center, top center',
  backgroundImage: url('../pics/main/backWine.png'),
  backgroundSize: 'cover, contain',
  backgroundRepeat: 'no-repeat, no-repeat',
  backgroundColor: 'rgba(79, 77, 64, 0.3)', /* Black overlay with 50% opacity */
  backgroundBlendMode: 'overlay'
`

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  background: ${theme.colors.lightBg};
  border-top: 1px solid ${theme.colors.lightBg};
  box-shadow: 0 -5px 8px rgba(0, 0, 0, 0.2);
`

const BackButton = styled(Button)`
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
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

const ProductInfo = styled.div`
  background: ${theme.colors.lightBg};
  border-radius: 3px;
  border: 1px solid ${theme.colors.border};
  text-decoration: none;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
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
`

const SpecLabel = styled.span`
  font-size: 14px;
  color: ${theme.colors.muted};
`

const SpecValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.foreground};
`

const TabsSection = styled.div`
  margin-top: 8px;
  
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
const DescriptionText = styled.div`
  background: ${theme.colors.wineRose};
  border-left: 1px solid ${theme.colors.primary};
  text-decoration: none;
  box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.1);
`

const DescriptionTextBlock = styled.div`
  padding: 8px;
  display: flex;
  gap: 2px;
  font-size: 15px;
  line-height: 1.8;
`

const ProductName = styled.span`
  color: ${theme.colors.foreground};
  font-size: 1.8rem;
  font-weight: bold;
  margin: 8px 0 16px 0;
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

const WineDetailPage = () => {
  const { id } = useParams()
  
  const [selectedWine, setSelectedWine] = useState(null)
  const [notificationModal, setNotificationModal] = useState<{
    isVisible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    content: React.ReactNode;
    icon?: React.ReactNode;
    title?: string;
  }>({
    isVisible: false,
    type: 'info',
    content: null,
  });
  const telegramId = useTelegramId();

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

  useEffect(() => {
    const wine = wines?.find(w => w.id === Number(id))
    setSelectedWine(wine)
  }, [ wines, id ])

  const showSuccessNotification = () => {
    setNotificationModal({
      isVisible: true,
      type: 'success',
      content: <>SX Wine свяжется с Вамим в ближайшее время</>,
      title: 'Спасибо за интерес!',
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


  const getTabs = () => {
    if (!selectedWine) {
      return []
    }
    const specs = [
      { label: 'Страна', value: selectedWine.country?.name },
      { label: 'Регион', value: selectedWine.region?.name },      
      { label: 'Крепость', value: selectedWine.alcohol?.name },
      { label: 'Цвет', value: selectedWine.color?.name },
      { label: 'Сахар', value: selectedWine.sugar?.name },
      { label: 'Год урожая', value: selectedWine.aging },
      { label: 'Объём', value: selectedWine.volume },
    ]
    return [
      {
        key: 'specs',
        label: 'Характеристики',
        children: (
          <SpecsGrid>
            <SpecItem key={'grape_variety'}>
            <SpecLabel>Виноград</SpecLabel>
            <SpecValue>
              { selectedWine.grape_variety?.map(({name, percentage}) => (<div>{`${percentage}% ${name}`}</div>)) }
            </SpecValue>            
            </SpecItem>
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
  }

  const getContent = () => {

    if (isLoading) {
      return (
        <Flex style={{ alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%'}}>
          <Spin/>
        </Flex>
      )
    }
    if (!selectedWine) {
      return (
        <PageWrapper>
          <Container>
            <h1>Товар не найден</h1>
            <Link to="/wines">Перейти в коллекцию вин</Link>
          </Container>
        </PageWrapper>
      )
    }
    return (
      <Container>
        <NotificationModal
          isVisible={notificationModal.isVisible}
          onClose={() => setNotificationModal({ ...notificationModal, isVisible: false })}
          type={notificationModal.type}
          content={notificationModal.content}
          icon={notificationModal.icon}
        />
          <ProductInfo>
            <Flex vertical style={{ width: '100%', padding: '8px 16px'}} align={'start'}>
                <ProductName>{selectedWine?.name}</ProductName>                  
                  <Flex style={{ width: '100%', padding: ''}} align={'start'} gap={16}>
                    <div style={{ padding: 0, margin: 0, width: 140}}>
                        {selectedWine?.image ? (
                          <Avatar
                              size={140} 
                              src={selectedWine.image.replace('http', 'https')}
                              style={{boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)'}}
                            />
                          ): (
                            <Avatar 
                              style={{backgroundColor: '#F5F5F5', padding: '10px'}} 
                              size={140} 
                              src={bottle}/>
                          )}
                    </div>
                    <Flex 
                        vertical
                        style={{ height: '100%', textAlign: 'left' }}
                      >
                        <ProducerName>{selectedWine?.producer?.name}</ProducerName>
                        <ImportantInfo>{selectedWine?.aging ? `${selectedWine.aging} г.`: ''}</ImportantInfo>
                        <Typography.Text type='secondary'>{selectedWine.color?.name} • {selectedWine.sugar?.name} • {selectedWine.volume}л.</Typography.Text>   
                        <Typography.Text type='secondary'>{selectedWine.country?.name} • {selectedWine.region?.name}</Typography.Text>                              
                    </Flex> 
                  </Flex><br/>
              </Flex>
            <ButtonsSection>
              <AddToCartButton type="primary" onClick={(e) => handleAddToCart(e, selectedWine.id)}>
                Хочу это вино <Avatar shape='square' src={glass}/>
              </AddToCartButton>
            </ButtonsSection>
          </ProductInfo>
        <TabsSection>
          <DescriptionTextBlock>            
            <Avatar alt="SX" src={Danil} style={{ minWidth: "70px", minHeight: "70px",  boxShadow: '2px 5px 8px rgba(0, 0, 0, 0.1)' }} />&nbsp;&nbsp;
            <DescriptionText>
              <Space style={{ padding: '8px 16px'}}>
                <ImportantInfo>Комментарий от SX</ImportantInfo>
              </Space>
              <Space style={{ padding: '0 16px 16px 16px'}}>
                {selectedWine.description || "..."}
              </Space>
            </DescriptionText>
          </DescriptionTextBlock>
          <Tabs items={getTabs()} defaultActiveKey="description" />
        </TabsSection>
        <BottomButtonWrapper>
          <BackButton onClick={() => window.history.back()}>
            <Avatar size={50} src={backIcon}/>
            К другим винам
          </BackButton>
        </BottomButtonWrapper>
      </Container>
    )
  }

  return (
      <PageWrapper>
        <Header />
        <main>
          {getContent()}
        </main>
      </PageWrapper>
  )
}

export default WineDetailPage
