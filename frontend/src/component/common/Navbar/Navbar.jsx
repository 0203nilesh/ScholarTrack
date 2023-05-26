import React, { useEffect, useState } from 'react'
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '../Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { end_loading, start_loading } from '../../../action/loader';
import { logout, reload_data } from '../../../action/auth';
import Cookies from 'js-cookie';
import { get_student } from '../../../action/student';

export default function Navbar() {
  const navigate= useNavigate();
  const [data, setData]= useState(useSelector((state)=>state.auth.authData));
  let authData=  Cookies.get("auth") || null;
  let currentStudentId = Cookies.get("currentStudentId") || "";
  useEffect(()=>{
    dispatch(reload_data(currentStudentId));
    authData=Cookies.get("auth") || null;
  }, [data])
  // console.log(JSON.parse(authData));  
  const dispatch= useDispatch();
  return (
    <>
    <Alert/>
    <nav>
        <div className="left-box">
            <img src="./logo-bg4.png" alt="logo" />
        </div>
        {/* <div className="right-box">
            NIHAL-WEBSITE
        </div> */}
        {authData!==null && (<>
          <div className="user">
        <Link onClick={()=>{
          dispatch(start_loading());
          setTimeout(() => {
           dispatch(end_loading());
          }, 1000);
        }} className='link' to={JSON.parse(authData)?.user==='student'?'/profile': '/adminView'}>
        <i id='profile' className="fa-solid fa-user"></i>
        </Link>
        <Link onClick={()=>{
          dispatch(logout());
        }} className='link' to="/">
        <i className="fa-solid fa-right-from-bracket"></i>
        </Link>
        </div>
        </>)}
    </nav>
    </>
  )
}
