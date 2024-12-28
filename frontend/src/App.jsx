// import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import NoPage from "./pages/NoPage"
import Signup from "./pages/Signup"

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
          <Route path="*" element={<NoPage />}/>
      </Routes>
    </BrowserRouter>
      
    </>
  
  )
}

export default App
