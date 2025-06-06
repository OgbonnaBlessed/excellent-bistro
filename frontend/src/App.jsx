import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Menu from './pages/Menu'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import CheckoutPage from './pages/CheckoutPage'
import VerifyPaymentPage from './pages/VerifyPaymentPage'
import MyOrderPage from './pages/MyOrderPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />

      {/* PAYMENT VERIFICATION */}
      <Route path='/myorder/verify' element={<VerifyPaymentPage />} />

      <Route path='/cart' element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        } 
      />

      <Route path='/checkout' element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        } 
      />

      <Route path='/myorder' element={
          <PrivateRoute>
            <MyOrderPage />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App