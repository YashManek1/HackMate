import React from 'react'
import Spline from '@splinetool/react-spline';
import Header from './Header';

const Home = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-t from-dark-secondary1 to-dark-primary text-white'>
      <Header />
      
      <div className='container mx-auto h-screen flex items-center relative px-6'>
        {/* Left content section */}
        <div className='w-full md:w-1/2 z-10 pr-4'>
          <h1 className='text-5xl md:text-6xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-light-secondary1 to-light-primary'>
            HackMate
          </h1>
          
          <p className='text-xl md:text-2xl mb-6 text-gray-300'>
            Your AI Companion for Hackathons
          </p>
          
          <div className='space-y-4 max-w-lg'>
            <p className='text-gray-400'>
              Supercharge your hackathon projects with intelligent assistance, real-time collaboration, and powerful code generation.
            </p>
            
            <button className='bg-white text-dark-primary font-bold py-3 px-6 rounded-xl mt-6 transition-all'>
              Get Started
            </button>
          </div>
        </div>
        
        {/* 3D Model/Spline animation */}
        <div className='absolute top-0 right-0 bottom-0 w-full md:w-1/2 overflow-hidden'>
          <Spline
            scene="https://prod.spline.design/OoRbRiIfI31ifdSO/scene.splinecode"
            className='h-full w-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default Home