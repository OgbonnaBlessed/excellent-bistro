import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
// import Login from './components/Login/Login'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Home />} />
    </Routes>
  )
}

export default App