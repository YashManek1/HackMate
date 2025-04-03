import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from './Pages/NotFound'
import Home from './Pages/Landing/Home'
import DashApp from './Pages/Dashboard_/DashApp'
import SignUpPage from "./Pages/SignUpPage.jsx"
import LoginPage from './Pages/LoginPage.jsx'
import ScrollToTop from "./ScrollToTop.jsx"

const App = () => {
  return (
    <div className='min-h-screen max-w-screen m-0 p-0 overflow-x-hidden overflow-y-auto relative transition-all scroll-smooth'>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<DashApp/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
