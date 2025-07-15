import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './components/Signup/Signup'
import Menu from './pages/Menu'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import PrivateRoutes from './components/PrivateRoute/PrivateRoute'
import CheckoutPage from './pages/CheckoutPage'
import VerifyPaymentPage from './pages/VerifyPaymentPage'
import MyOrderPage from './pages/MyOrderPage'
import ScrollToTop from './components/ScrollToTop.js/ScrollToTop'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import SearchPage from './pages/SearchPage'
import AdminPanel from './pages/AdminPanel'
import AdminRoutes from './components/AdminRoute/AdminRoute'
import ListItems from './pages/ListItems'
import Order from './pages/Order'
import AdminNavbar from './components/AdminNavbar/AdminNavbar'

const App = () => {
  const location = useLocation();
  const adminPaths = ['/add-items', '/list', '/orders'];
  const isAdminPanel = adminPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      <ScrollToTop />
      {isAdminPanel ? <AdminNavbar /> : <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/search' element={<SearchPage />} />

        {/* ADMIN ROUTES */}
        <Route element={<AdminRoutes />}>
          <Route path='/add-items' element={<AdminPanel />} />
          <Route path='/list' element={<ListItems />} />
          <Route path='/orders' element={<Order />} />
        </Route>

        {/* PAYMENT VERIFICATION */}
        <Route path='/myorder/verify' element={<VerifyPaymentPage />} />

        {/* GROUPED PRIVATE ROUTES */}
        <Route element={<PrivateRoutes />}>
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/myorder' element={<MyOrderPage />} />
        </Route>
      </Routes>

      {!isAdminPanel && <Footer />}
    </>
  )
}

export default App;