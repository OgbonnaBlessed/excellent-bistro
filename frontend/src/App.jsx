import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Menu from './pages/Menu'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/cart' element={
        <PrivateRoute>
          <CartPage />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App