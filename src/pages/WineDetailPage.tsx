import { ConfigProvider, Breadcrumb, Rate, Button, Tabs } from 'antd';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeartOutlined, ShoppingCartOutlined, ShareAltOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { theme } from '../styles/theme';
import { allProducts } from '../data/products';
import { useState } from 'react';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px;
`;

const BreadcrumbWrapper = styled.div`
  margin-bottom: 24px;
  
  .ant-breadcrumb-link a {
    color: ${theme.colors.muted};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const ProductImageSection = styled.div`
  position: relative;
`;

const ProductImageWrapper = styled.div`
  background: ${theme.colors.lightBg};
  border-radius: 16px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProductImage = styled.div`
  font-size: 280px;
  opacity: 0.9;
`;

const ProductBadge = styled.span<{ $type: 'discount' | 'new' | 'top' }>`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  z-index: 2;
  
  ${props => {
    switch (props.$type) {
      case 'discount':
        return `background: ${theme.colors.accent}; color: white;`;
      case 'new':
        return `background: #4CAF50; color: white;`;
      case 'top':
        return `background: ${theme.colors.primary}; color: white;`;
    }
  }}
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: 1px solid ${theme.colors.border};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.default};
  
  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
  
  .anticon {
    font-size: 18px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${theme.colors.foreground};
  margin: 0 0 12px;
  line-height: 1.3;
`;

const ProductMeta = styled.div`
  font-size: 15px;
  color: ${theme.colors.muted};
  margin-bottom: 16px;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${theme.colors.border};
  
  .ant-rate {
    font-size: 18px;
  }
`;

const RatingText = styled.span`
  font-size: 14px;
  color: ${theme.colors.muted};
`;

const PricingSection = styled.div`
  margin-bottom: 24px;
`;

const OldPrice = styled.span`
  font-size: 18px;
  color: ${theme.colors.muted};
  text-decoration: line-through;
  margin-right: 12px;
`;

const CurrentPrice = styled.span`
  font-size: 36px;
  font-weight: 700;
  color: ${theme.colors.foreground};
`;

const DiscountBadge = styled.span`
  background: ${theme.colors.accent};
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 12px;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  color: ${theme.colors.muted};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 44px;
  height: 44px;
  background: ${theme.colors.lightBg};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.default};
  
  &:hover {
    background: ${theme.colors.border};
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 44px;
  border: none;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  
  &:focus {
    outline: none;
  }
`;

const ButtonsSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;

const AddToCartButton = styled(Button)`
  flex: 1;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
`;

const FavoriteButton = styled(Button)`
  height: 52px;
  width: 52px;
  border-radius: 10px;
  
  .anticon {
    font-size: 20px;
  }
`;

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
`;

const RelatedSection = styled.section`
  margin-top: 64px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px;
  color: ${theme.colors.foreground};
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RelatedCard = styled(Link)`
  background: ${theme.colors.background};
  border-radius: 12px;
  padding: 16px;
  transition: ${theme.transitions.default};
  border: 1px solid ${theme.colors.border};
  text-decoration: none;
  
  &:hover {
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
    border-color: transparent;
  }
`;

const RelatedImage = styled.div`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  margin-bottom: 12px;
`;

const RelatedName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.foreground};
  margin: 0 0 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RelatedPrice = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.foreground};
`;


const WineDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  const product = allProducts.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8B1538',
            borderRadius: 8,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          },
        }}
      >
        <PageWrapper>
          <Header />
          <Container>
            <h1>Товар не найден</h1>
            <Link to="/wines">Перейти в коллекцию вин</Link>
          </Container>
          <Footer />
        </PageWrapper>
      </ConfigProvider>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.color === product.color)
    .slice(0, 4);

  const specs = [
    { label: 'Страна', value: product.country },
    { label: 'Регион', value: product.region.split(',')[0] },
    { label: 'Виноград', value: product.grape },
    { label: 'Крепость', value: product.alcohol },
    { label: 'Цвет', value: product.color },
    { label: 'Сахар', value: product.sweetness },
    { label: 'Год урожая', value: product.year },
    { label: 'Объём', value: product.volume },
    { }
  ];

  const tabItems = [
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
    {
      key: 'description',
      label: 'Описание',
      children: <DescriptionText>{product.description}</DescriptionText>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#8B1538',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        },
      }}
    >
      <PageWrapper>
        <Header />
        <main>
          <Container>
            <BreadcrumbWrapper>
              <Breadcrumb
                items={[
                  { title: <Link to="/">Главная</Link> },
                  { title: <Link to="/wines">Каталог</Link> },
                  { title: '...' },
                ]}
              />
            </BreadcrumbWrapper>

            <ProductLayout>

              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductMeta>{product.region} • {product.volume}</ProductMeta>
                
                <RatingSection>
                  <Rate disabled defaultValue={product.rating} allowHalf />
                </RatingSection>

                <ButtonsSection>
                  <AddToCartButton type="primary">
                    Хочу!
                  </AddToCartButton>
                  <FavoriteButton icon={<HeartOutlined />} />
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
    </ConfigProvider>
  );
};

export default WineDetailPage;
