// import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home"
import Signup from "./pages/SignUp"
import Login from "./pages/Login"
import CreateDocs from "./pages/createDocs"
const App = () => {

  const isLoggedIn = localStorage.getItem("isLoggedIn") ;
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/createDocs/:docsId" element={ isLoggedIn ?<CreateDocs /> :<Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
      
    </>
  
  )
}

export default App
