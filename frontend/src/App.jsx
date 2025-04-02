import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from './Pages/NotFound'
import Home from './Pages/Landing/Home'
import DashApp from './Pages/Dashboard_/DashApp'
import SignUp from "./Pages/Signup.jsx"

const App = () => {
  return (
    <div className='min-h-screen max-w-screen m-0 p-0 overflow-x-hidden overflow-y-auto transition-all scroll-smooth'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<DashApp/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
