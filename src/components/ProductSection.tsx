import styled from 'styled-components';
import { Tabs, Button, Rate } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';

const ProductSectionWrapper = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const StyledTabs = styled(Tabs)`
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
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
  
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: ${theme.colors.foreground} !important;
    }
  }
  
  .ant-tabs-ink-bar {
    background: ${theme.colors.primary};
    height: 3px;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  
  @media (max-width: ${theme.breakpoints.wide}) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProductCard = styled.div`
  background: ${theme.colors.background};
  border-radius: 12px;
  padding: 16px;
  transition: ${theme.transitions.default};
  position: relative;
  
  &:hover {
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
  }
`;

const ProductBadge = styled.span<{ $type: 'discount' | 'new' | 'top' }>`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
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

const FavoriteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  border: 1px solid ${theme.colors.border};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.default};
  z-index: 2;
  
  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const ProductImageWrapper = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const ProductImage = styled.div`
  font-size: 100px;
  opacity: 0.9;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.foreground};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductMeta = styled.div`
  font-size: 12px;
  color: ${theme.colors.muted};
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .ant-rate {
    font-size: 12px;
  }
`;

const RatingScore = styled.span`
  font-size: 12px;
  color: ${theme.colors.muted};
`;

const ProductPricing = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`;

const OldPrice = styled.span`
  font-size: 13px;
  color: ${theme.colors.muted};
  text-decoration: line-through;
`;

const CurrentPrice = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.foreground};
`;

const AddToCartButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  font-weight: 500;
`;

const ProductSection = () => {
  const products = [
    {
      id: 1,
      name: 'Prosecco DOC Extra Dry Villa Sandi',
      region: 'Венето, Италия',
      volume: '0.75 л',
      rating: 4.5,
      reviews: 128,
      price: 1890,
      oldPrice: 2290,
      badge: 'discount' as const,
      emoji: '🍾',
    },
    {
      id: 2,
      name: 'Chianti Classico DOCG Castello Banfi',
      region: 'Тоскана, Италия',
      volume: '0.75 л',
      rating: 4.8,
      reviews: 256,
      price: 3490,
      badge: 'top' as const,
      emoji: '🍷',
    },
    {
      id: 3,
      name: 'Champagne Brut Reserve Taittinger',
      region: 'Шампань, Франция',
      volume: '0.75 л',
      rating: 4.9,
      reviews: 89,
      price: 6990,
      emoji: '🥂',
    },
    {
      id: 4,
      name: 'Pinot Grigio DOC Santa Margherita',
      region: 'Альто Адидже, Италия',
      volume: '0.75 л',
      rating: 4.6,
      reviews: 167,
      price: 2590,
      oldPrice: 2990,
      badge: 'discount' as const,
      emoji: '🍾',
    },
    {
      id: 5,
      name: 'Amarone della Valpolicella Bertani',
      region: 'Венето, Италия',
      volume: '0.75 л',
      rating: 4.7,
      reviews: 45,
      price: 8990,
      badge: 'new' as const,
      emoji: '🍷',
    },
    {
      id: 6,
      name: 'Sauvignon Blanc Cloudy Bay',
      region: 'Мальборо, Новая Зеландия',
      volume: '0.75 л',
      rating: 4.5,
      reviews: 203,
      price: 4290,
      emoji: '🍾',
    },
    {
      id: 7,
      name: 'Barolo DOCG Marchesi di Barolo',
      region: 'Пьемонт, Италия',
      volume: '0.75 л',
      rating: 4.8,
      reviews: 78,
      price: 5990,
      emoji: '🍷',
    },
    {
      id: 8,
      name: 'Moët & Chandon Impérial Brut',
      region: 'Шампань, Франция',
      volume: '0.75 л',
      rating: 4.7,
      reviews: 312,
      price: 7490,
      badge: 'top' as const,
      emoji: '🥂',
    },
    {
      id: 9,
      name: 'Rioja Reserva Marqués de Riscal',
      region: 'Риоха, Испания',
      volume: '0.75 л',
      rating: 4.6,
      reviews: 156,
      price: 3290,
      oldPrice: 3890,
      badge: 'discount' as const,
      emoji: '🍷',
    },
    {
      id: 10,
      name: 'Chablis Premier Cru William Fèvre',
      region: 'Бургундия, Франция',
      volume: '0.75 л',
      rating: 4.9,
      reviews: 67,
      price: 5490,
      emoji: '🍾',
    },
  ];

  const tabItems = [
    {
      key: 'popular',
      label: 'Популярное',
      children: (
        <ProductsGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              {product.badge && (
                <ProductBadge $type={product.badge}>
                  {product.badge === 'discount' ? '-17%' : product.badge === 'new' ? 'Новинка' : 'Топ'}
                </ProductBadge>
              )}
              <FavoriteButton>
                <HeartOutlined />
              </FavoriteButton>
              <ProductImageWrapper>
                <ProductImage>{product.emoji}</ProductImage>
              </ProductImageWrapper>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductMeta>{product.region} • {product.volume}</ProductMeta>
                <ProductRating>
                  <Rate disabled defaultValue={product.rating} allowHalf />
                  <RatingScore>{product.rating} ({product.reviews})</RatingScore>
                </ProductRating>
                <ProductPricing>
                  {product.oldPrice && <OldPrice>{product.oldPrice.toLocaleString()} ₽</OldPrice>}
                  <CurrentPrice>{product.price.toLocaleString()} ₽</CurrentPrice>
                </ProductPricing>
                <AddToCartButton type="primary" icon={<ShoppingCartOutlined />}>
                  В корзину
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      ),
    },
    {
      key: 'experts',
      label: 'Выбор экспертов',
      children: <ProductsGrid>{products.slice(0, 5).map((product) => (
        <ProductCard key={product.id}>
          <FavoriteButton><HeartOutlined /></FavoriteButton>
          <ProductImageWrapper><ProductImage>{product.emoji}</ProductImage></ProductImageWrapper>
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductMeta>{product.region} • {product.volume}</ProductMeta>
            <ProductRating>
              <Rate disabled defaultValue={product.rating} allowHalf />
              <RatingScore>{product.rating} ({product.reviews})</RatingScore>
            </ProductRating>
            <ProductPricing>
              <CurrentPrice>{product.price.toLocaleString()} ₽</CurrentPrice>
            </ProductPricing>
            <AddToCartButton type="primary" icon={<ShoppingCartOutlined />}>В корзину</AddToCartButton>
          </ProductInfo>
        </ProductCard>
      ))}</ProductsGrid>,
    },
    {
      key: 'sale',
      label: 'Товары со скидкой',
      children: <ProductsGrid>{products.filter(p => p.oldPrice).map((product) => (
        <ProductCard key={product.id}>
          <ProductBadge $type="discount">-17%</ProductBadge>
          <FavoriteButton><HeartOutlined /></FavoriteButton>
          <ProductImageWrapper><ProductImage>{product.emoji}</ProductImage></ProductImageWrapper>
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductMeta>{product.region} • {product.volume}</ProductMeta>
            <ProductRating>
              <Rate disabled defaultValue={product.rating} allowHalf />
              <RatingScore>{product.rating} ({product.reviews})</RatingScore>
            </ProductRating>
            <ProductPricing>
              <OldPrice>{product.oldPrice?.toLocaleString()} ₽</OldPrice>
              <CurrentPrice>{product.price.toLocaleString()} ₽</CurrentPrice>
            </ProductPricing>
            <AddToCartButton type="primary" icon={<ShoppingCartOutlined />}>В корзину</AddToCartButton>
          </ProductInfo>
        </ProductCard>
      ))}</ProductsGrid>,
    },
  ];

  return (
    <ProductSectionWrapper>
      <StyledTabs items={tabItems} defaultActiveKey="popular" />
    </ProductSectionWrapper>
  );
};

export default ProductSection;
