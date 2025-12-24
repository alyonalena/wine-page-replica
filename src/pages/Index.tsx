import styled from 'styled-components'
import Header from '../components/Header'
import HeroCarousel from '../components/HeroCarousel'
import Footer from '../components/Footer'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Index = () => {
  return (
      <PageWrapper>
        {/*<AgeVerificationModal />*/}
        <Header />
        <main>
          <HeroCarousel />
        </main>
        <Footer />
      </PageWrapper>
  )
}

export default Index
