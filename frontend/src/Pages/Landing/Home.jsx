import React from 'react'
import Spline from '@splinetool/react-spline';
import Header from './Header';

const Home = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-900 to-black text-white'>
      <Header />
      
      <div className='container mx-auto h-screen flex items-center relative px-6'>
        {/* Left content section */}
        <div className='w-full md:w-1/2 z-10 pr-4'>
          <h1 className='text-4xl md:text-6xl lg:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600'>
            HackMate
          </h1>
          
          <p className='text-xl md:text-2xl mb-6 text-gray-300'>
            Your AI Companion for Hackathons
          </p>
          
          <div className='space-y-4 max-w-lg'>
            <p className='text-gray-400'>
              Supercharge your hackathon projects with intelligent assistance, real-time collaboration, and powerful code generation.
            </p>
            
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <span className='mr-2 text-green-400'>✓</span> 
                <span>Smart code completion and suggestions</span>
              </li>
              <li className='flex items-center'>
                <span className='mr-2 text-green-400'>✓</span> 
                <span>Project management and team coordination</span>
              </li>
              <li className='flex items-center'>
                <span className='mr-2 text-green-400'>✓</span> 
                <span>24/7 technical support and debugging</span>
              </li>
            </ul>
            
            <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-10 rounded-lg mt-6 transition-all'>
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