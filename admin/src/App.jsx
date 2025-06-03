import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddItems from './components/AddItems'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<AddItems />} />
      </Routes>
    </>
  )
}

export default App