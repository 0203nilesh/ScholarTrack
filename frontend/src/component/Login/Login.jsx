import React, { useState } from 'react'
import './style.css';
import Alert from '../common/Alert/Alert';
import { useDispatch } from 'react-redux';
import { login } from '../../action/auth';
import { Link } from 'react-router-dom';

export default function Login() {
    const dispatch= useDispatch();
    const [data, setData]= useState({username: "", password:""});
    function changeHandler(e){
        setData((prevData)=>{
            return {...prevData, [e.target.name]: e.target.value};
        })
    }
    function LoginForm(e){
        // console.log(data);
        dispatch(login(data))
        e.preventDefault();
    }
    
  return (
    <>
    <form  onSubmit={LoginForm} className='login-form'>
        <div className="heading">
            <p>Login</p>
        </div>
        <div className="child us-pass">
            <div className='username us-pass-child' >
                <label htmlFor="username">Username: </label>
                <input onChange={changeHandler} value={data?.username} type="text" name="username" id="username"  required/>
            </div>
            <div className='password us-pass-child'>
                <label htmlFor="password ">Password: </label>
                <input onChange={changeHandler} value={data?.password} type="password" name="password" id="password" required/>
                <i onClick={()=>{
                const eye= document.getElementById("eyePiece");
                const x= document.getElementById("password");
                if(x.type==='password' & data?.password!==""){
                    x.type='text';
                    eye.classList.remove('fa-eye-slash');
                    eye.classList.add('fa-eye');
                }else{
                    x.type='password';
                    eye.classList.add('fa-eye-slash');
                    eye.classList.remove('fa-eye');
                }
                }} className="fa-sharp fa-solid fa-eye-slash eye" id='eyePiece'></i>
            </div>
        </div>
        <div className="submit child">
            <button type="submit">Login</button>
        </div>
        <div className="link child">
            <Link className="a" to="/register">don't have account</Link>
        </div>
    </form>
    </>
  )
}
