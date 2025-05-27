import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Menu from './pages/Menu'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/menu' element={<Menu />} />
    </Routes>
  )
}

export default App