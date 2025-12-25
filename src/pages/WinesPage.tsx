import { Breadcrumb, Avatar, Rate, Button, Card, Space } from 'antd'
import { useSearchParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { theme } from '../styles/theme'
import { allProducts } from '../data/products'
import backIcon from '../pics/actions/back.svg'
import bottle from '../pics/actions/pink.png'
import cheers from '../pics/actions/cheers.svg'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const Container = styled.div`
  animation: slideUp 0.4s ease;
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
  animation: slideUp 0.4s ease;
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
  border-radius: 3px;
  transition: ${theme.transitions.default};
  position: relative;
  text-decoration: none;
  display: block;
  
  &:hover {
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-4px);
    border-color: transparent;
  }
`;

const ProductImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const ProductImage = styled.div`
  width: 30%;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.h2`
  font-size: 18px;
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
  gap: 12px;
  
  .ant-rate {
    font-size: 12px;
  }
`;

const AddToCartButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
  height: 40px;
  font-weight: 500;
`;

const categoryNames: Record<string, string> = {
  'white-wine': 'Коллекция вин',
};

const WinesPage = () => {
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
                  { title: <Link to="/"><Avatar size={15} src={backIcon}/>&nbsp;На главную страницу</Link> },
                ]}
              />
            </BreadcrumbWrapper>

            <PageHeader>
              <div>
                <PageTitle>{categoryTitle}</PageTitle>
                <ResultsCount>{allProducts.length} позиций</ResultsCount>
              </div>
            </PageHeader>

            <ProductsGrid>
              {allProducts.map((product) => (
                  <ProductCard key={product.id} to={`/wine/${product.id}`}>
                  <Card>
                    <Space>
                    <ProductImage><Avatar size={80} src={bottle}/></ProductImage>

                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>                     
                      <ProductMeta>{product.region}</ProductMeta>                           
                    </ProductInfo>
                    </Space>
                    <AddToCartButton type="primary" onClick={handleAddToCart}>
                    Хочу это вино <Avatar src={cheers}/>
                    </AddToCartButton>
                  </Card>
                </ProductCard>
              ))}
            </ProductsGrid>
          </Container>
        </main>
        <Footer />
      </PageWrapper>
  )
}

export default WinesPage
