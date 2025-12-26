import { Card, Breadcrumb, Avatar, Flex } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import image0 from '../pics/about/image_0.png'
import image1 from '../pics/about/image_1.png'
import image2 from '../pics/about/image_2.png'
import image3 from '../pics/about/image_3.png'
import backIcon from '../pics/actions/back.svg'

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

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: white;
`

const Name = styled.h3`
  font-size: 24px;
  margin: 20px 0;
  color: white;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`


const AboutClubPage = () => {

  const blocks = [
    {
        id: 0,
        name: 'Философия клуба',
        info: [
          'Редкие вина. Живое общение.',
          'Атмосфера, в которую хочется погружаться снова.'
        ],        
        image: image0,
    },
    {
        id: 1,
        name: 'Кто мы такие?',
        info: [
          'SX Wine — винный клуб для тех, кто ценит вкус, хочет разбираться глубже и находит удовольствие в настоящем диалоге.',
          'Мы создаём пространство, где можно пробовать, обсуждать, делиться и быть в кругу “своих”.'
        ],
        image: image1
    },
    {
        id: 2,
        name: 'Что получают участники?',
        info: [
          '— доступ к редким винам, которых нет в открытой продаже',
          '— камерные дегустации в Москве и Санкт-Петербурге',
          '— живое общение с единомышленниками',
          '— участие в совершенно новых форматах: мобильный Champagne Bar (Санкт-Петербург), школа Шампани',
          '— возможность присоединиться кколлаборациям с другими клубами: гедонистическими, сигарными и др'
        ],
        image: image2
    },    
    {
        id: 3,
        name: 'Подход',
        info: [
          'Мы собираем вокруг себя людей, которые ценят редкие вина, любят узнавать новое и получают удовольствие не только от напитка, но и от контекста.',
          'SX Wine — это не про внешний эффект, а про внутренний интерес и вкус к жизни.'
        ],
        image: image3
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
              ]}
            />
          </BreadcrumbWrapper>

          <ProductsGrid>
            {blocks.map((member) => (
              <Flex vertical style={{ padding: '20px', backgroundColor: '#E7014C' }} gap={16}>
                <Flex style={{ width: '100%', backgroundColor: '#E7014C' }} align={'flex-start'} gap={16}>
                  <div style={{ padding: 0, margin: 0, width: 130}}>
                    <Avatar 
                        alt="SX" 
                        src={member.image}
                        style={{ width: "130px", height: "130px" }} 
                    />
                  </div>
                  <Name>{member.name}</Name>
                </Flex>
                <ItemInfo>{member.info.map(block => <p>{block}</p>)}</ItemInfo>
              </Flex>
            ))}
          </ProductsGrid>
        </Container>
      </main>
      <Footer />
    </PageWrapper>
  )
}

export default AboutClubPage
