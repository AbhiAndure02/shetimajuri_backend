import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Dashboard from './admin/pages/Dashboard'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import User from './admin/pages/User'

const App = () => {
  return (
  <BrowserRouter>
  <Header />
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/admin/dashboard' element={<Dashboard />} />
    <Route path='/admin/users' element={<User />} />

  <Route path='/signin' element ={<SignIn />}/>




</Routes>
<Footer />
  </BrowserRouter>
  )
}

export default App
