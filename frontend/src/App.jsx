import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Menu from './pages/Menu'
import AboutPage from './pages/AboutPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/about' element={<AboutPage />} />
    </Routes>
  )
}

export default App