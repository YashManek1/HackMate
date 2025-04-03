import React from 'react'
import Header from './Header';
import HeroSection from './HeroSection';
import Features from './Features'

const Home = () => {
  return (
    <div className='h-auto w-full'>
      <Header />
      <HeroSection />
      <Features />
    </div>
  )
}

export default Home