import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from './Pages/NotFound'
import Home from './Pages/Landing/Home'
import { Sidebar } from './Pages/Dashboard/Sidebar'

const App = () => {
  return (
    <div className='min-h-screen max-w-screen m-0 p-0 overflow-x-hidden overflow-y-auto transition-all scroll-smooth'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Sidebar/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
