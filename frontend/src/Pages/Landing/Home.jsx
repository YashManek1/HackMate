import React from 'react'
import Header from './Header';
import HeroSection from './HeroSection';
import Features from './Features'
import Footer from './Footer';

const Home = () => {
  return (
    <div className='h-auto w-full'>
      <Header />
      <HeroSection />
      <Features />
      
      <Footer />
    </div>
  )
}

export default Home