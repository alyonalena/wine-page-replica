import { ConfigProvider } from 'antd';
import styled from 'styled-components';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import Categories from '../components/Categories';
import ProductSection from '../components/ProductSection';
import Footer from '../components/Footer';
import AgeVerificationModal from '../components/AgeVerificationModal';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

const Index = () => {
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
        <AgeVerificationModal />
        <Header />
        <main>
          <HeroCarousel />
          <Categories />
          <ProductSection />
        </main>
        <Footer />
      </PageWrapper>
    </ConfigProvider>
  );
};

export default Index;
