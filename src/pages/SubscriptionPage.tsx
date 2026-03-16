import { useState } from 'react'
import { Avatar, Button, Typography, Flex, Spin, Select, Space } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery, useMutation } from '@tanstack/react-query'

import Header from '../components/Header'
import { theme } from '../styles/theme'
import { useTelegramId } from '../hooks/useTelegramId'
import { getApiBaseUrl } from '../lib/api'
import backIcon from '../pics/logo.png'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`
const Container = styled.div`
  animation: slideUp 0.4s ease;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 8px 100px;
`

const BottomButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
`

const BackButton = styled(Button)`
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  padding: 12px 20px 12px 10px;
  color: #E3E3E3;
  background: rgba(0,0,0,0.8);
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;  
  line-height: 0.9;
`

const PageTitle = styled.div`
  animation: slideUp 0.4s ease;
  color: ${theme.colors.foreground};
  font-size: 1.4rem;
  padding: 0 8px;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  
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

const GoldenBlock = styled.div`
  background: white;
  color: white;
  padding: 8px 8px;
  margin-bottom: 8px;
  background: rgba(0,0,0,0.2);
  border-radius: 2rem;
  text-align: center;
`

const NameCentered = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0 0 0 0;
  color: white;
  width: 100%;
  text-align: center;
`

const GradeBlock = styled.div`
  font-size: 12px;
  color: white;
  background: ${theme.colors.primary};
  padding:16px;
  border-radius: 0.3rem;
`

const SubscriptionPage = () => {
  const telegramId = useTelegramId()

  const { data: subscriptions, isLoading, isError } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const response = await fetch(`${getApiBaseUrl()}/subscriptions/`, {
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
  console.info(subscriptions)

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
          <PageHeader>
            <PageTitle>
                Подписки
            </PageTitle>
          </PageHeader>  

          <ProductsGrid>
  
            {subscriptions.map((sbscr) => (
                <GradeBlock>
                    <GoldenBlock>
                    <NameCentered>Подписка {sbscr.name}</NameCentered>
                    <strong>{`${sbscr?.price} рублей за ${sbscr?.duration} мес.`}</strong>
                    </GoldenBlock>
                    <br/>
                    <div>ВАМ ДОСТУПНО:</div>
                    <br/>
                    {sbscr.features?.map(ft => <div>{`— ${ft.name}`}</div>)}
                    <br/>
                </GradeBlock>
            ))}
          </ProductsGrid>
          <BottomButtonWrapper>
            <BackButton size="large" onClick={() => window.location.href = '/'}>
            <Avatar size={35} src={backIcon} style={{ border: '1px solid #606060'}}/>
              На главную страницу
            </BackButton>
          </BottomButtonWrapper>
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
    </PageWrapper>
  )
}

export default SubscriptionPage
