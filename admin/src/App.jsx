import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddItems from './components/AddItems'
import List from './components/List'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<AddItems />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </>
  )
}

export default App