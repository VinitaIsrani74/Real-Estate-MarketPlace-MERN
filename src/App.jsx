import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Signin from './pages/Auth/Signin'
import SignUp from './pages/Auth/SignUp'
import Profile from './pages/Profile/Profile'

const App = () => {
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App