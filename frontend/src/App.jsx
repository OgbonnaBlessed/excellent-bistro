import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup/Signup'
// import Login from './components/Login/Login'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App