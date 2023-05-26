import React, { useEffect } from 'react'
import SignUp from '../SignUp/SignUp'
import { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import Login from '../Login/Login';
import { end_loading, start_loading } from '../../action/loader';
export default function Home() {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const profile= Cookies.get("auth") || null;
  // console.log(profile);
  useEffect(()=>{
    if(profile!==null && profile!==undefined){
      const newProfile= JSON.parse(profile);
      setTimeout(() => {
        dispatch(end_loading());
      }, 1000);
      if(newProfile?.user==='student'){
        navigate("/profile");
      }else{
        navigate("/adminView");
      }
    }
  },[profile])
  return (
    <>
    <div className="home-container">
      {profile?(<>
      {dispatch(start_loading())}
      </>):(<>
      <Login/>
      </>)}
    </div>
    </>
  )
}
