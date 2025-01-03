// import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import NoPage from "./pages/NoPage"
import Signup from "./pages/SignUp"
import Login from "./pages/Login"
import CreateDocs from "./pages/createDocs"
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/createDocs/:docsId" element={<CreateDocs />}/>
          <Route path="*" element={<NoPage />}/>
      </Routes>
    </BrowserRouter>
      
    </>
  
  )
}

export default App
