import { ConfigProvider, Breadcrumb, Select, Rate, Button } from 'antd';
import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeartOutlined, ShoppingCartOutlined, FilterOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { theme } from '../styles/theme';
import { allProducts } from '../data/products';

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

const ProductCard = styled(Link)`
  background: ${theme.colors.background};
  border-radius: 12px;
  padding: 16px;
  transition: ${theme.transitions.default};
  position: relative;
  border: 1px solid ${theme.colors.border};
  text-decoration: none;
  display: block;
  
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
  font-size: 16px;
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
  'white-wine': 'Коллекция вин',
};

const ProducersPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'wine';
  const categoryTitle = categoryNames[category] || 'Коллекция вин';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Favorite logic
  };

  return (
      <PageWrapper>
        <Header />
        <main>
          <Container>
            <BreadcrumbWrapper>
              <Breadcrumb
                items={[
                  { title: <Link to="/">Главная</Link> },
                  { title: 'Производители вин' },
                ]}
              />
            </BreadcrumbWrapper>

            <PageHeader>
              <div>
                <PageTitle>Производители вин</PageTitle>
                <ResultsCount>Производители вин, которые мы собрали в нашей коллекции SX Wine</ResultsCount>
              </div>
            </PageHeader>

            <ProductsGrid>
              {allProducts.map((product) => (
                <ProductCard key={product.id} to={`/producer/${product.id}`}>
                  <ProductImageWrapper>
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>                     
                      <ProductMeta>{product.region}</ProductMeta>                           
                    </ProductInfo>
                  </ProductImageWrapper>
                </ProductCard>
              ))}
            </ProductsGrid>
          </Container>
        </main>
        <Footer />
      </PageWrapper>
  )
}

export default ProducersPage
