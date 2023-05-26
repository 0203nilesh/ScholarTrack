import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Navbar from "./component/common/Navbar/Navbar";
import { useState } from "react";
import Footer from "./component/common/Footer/Footer";
import Login from "./component/Login/Login";
import Profile from "./component/Profile/Profile";
import Main from "./component/adminView/Main/Main";
import Loader from './component/common/Loader/Loader';
import { useSelector } from "react-redux";
import SignUp from "./component/SignUp/SignUp";

function App() {
  const isLoad= useSelector((state)=> state.loader.isLoading)
  
  // console.log(isLoad);
  return (
    <BrowserRouter>
    {isLoad?(<>
    <div id="loader">
    <Loader/>
    </div>
    </>):(<>
    <div className="app" >
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<SignUp/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/adminView" element={<Main/>} />
    </Routes>
    <Footer/>
    </div>
    </>)}
    </BrowserRouter>

  );
}

export default App;
