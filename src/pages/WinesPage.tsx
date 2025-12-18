import { ConfigProvider, Breadcrumb, Select, Rate, Button, Badge } from 'antd';
import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeartOutlined, ShoppingCartOutlined, FilterOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { theme } from '../styles/theme';

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

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  color: ${theme.colors.foreground};
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterButton = styled(Button)`
  height: 40px;
  border-radius: 8px;
`;

const SortSelect = styled(Select)`
  min-width: 200px;
  
  .ant-select-selector {
    height: 40px !important;
    border-radius: 8px !important;
    
    .ant-select-selection-item {
      line-height: 38px !important;
    }
  }
`;

const ResultsCount = styled.span`
  color: ${theme.colors.muted};
  font-size: 14px;
`;

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
`;

const ProductCard = styled.div`
  background: ${theme.colors.background};
  border-radius: 12px;
  padding: 16px;
  transition: ${theme.transitions.default};
  position: relative;
  border: 1px solid ${theme.colors.border};
  
  &:hover {
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
    border-color: transparent;
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
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const ProductImage = styled.div`
  font-size: 120px;
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

const categoryNames: Record<string, string> = {
  'white-wine': 'Белое вино',
  'red-wine': 'Красное вино',
  'champagne': 'Шампанское и игристое',
  'whisky': 'Виски',
  'cognac': 'Коньяк',
  'wine': 'Вино',
  'spirits': 'Крепкие напитки',
  'water': 'Вода',
  'glasses': 'Бокалы',
  'accessories': 'Аксессуары',
  'rare': 'Fine & Rare',
  'gift': 'В подарок',
  'sale': 'Акции',
  'top-rating': 'Топ рейтинг',
  'onegin': 'Онегин',
  'russian-wine': 'Большое Русское Вино',
  'certificates': 'Подарочные сертификаты',
};

const WinesPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'wine';
  const categoryTitle = categoryNames[category] || 'Каталог вин';

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
    {
      id: 11,
      name: 'Gewürztraminer Grand Cru Trimbach',
      region: 'Эльзас, Франция',
      volume: '0.75 л',
      rating: 4.6,
      reviews: 42,
      price: 4890,
      emoji: '🍾',
    },
    {
      id: 12,
      name: 'Brunello di Montalcino Banfi',
      region: 'Тоскана, Италия',
      volume: '0.75 л',
      rating: 4.8,
      reviews: 189,
      price: 7290,
      badge: 'top' as const,
      emoji: '🍷',
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
                  { title: categoryTitle },
                ]}
              />
            </BreadcrumbWrapper>

            <PageHeader>
              <div>
                <PageTitle>{categoryTitle}</PageTitle>
                <ResultsCount>{products.length} товаров</ResultsCount>
              </div>
              
              <FiltersRow>
                <FilterButton icon={<FilterOutlined />}>Фильтры</FilterButton>
                <SortSelect
                  defaultValue="popular"
                  options={[
                    { value: 'popular', label: 'По популярности' },
                    { value: 'price-asc', label: 'Сначала дешевле' },
                    { value: 'price-desc', label: 'Сначала дороже' },
                    { value: 'rating', label: 'По рейтингу' },
                    { value: 'new', label: 'Новинки' },
                  ]}
                />
              </FiltersRow>
            </PageHeader>

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
          </Container>
        </main>
        <Footer />
      </PageWrapper>
    </ConfigProvider>
  );
};

export default WinesPage;
