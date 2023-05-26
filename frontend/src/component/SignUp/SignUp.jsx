import React, { useState } from 'react'
import './style.css';
import Alert from '../common/Alert/Alert';
import { useDispatch } from 'react-redux';
import { signup } from '../../action/auth';
import { Link } from 'react-router-dom';
import { display_alert } from '../../action/alert';

export default function SignUp() {
  const date= new Date();
  const year= date.getFullYear();
  // console.log(year);
  const dispatch= useDispatch();
  const adminId= '12345';
  const [data, setData]= useState({
    fname:"",lname:"", user:"", mobile: "", email:"", uniqueCode:"", enrollment: "" ,branch: "ECE" , course:"B. Tech", admissionYear: "", dob:"", cgpa: "", username: "", password: "", cPassword:""
  })

  function changeHandler(e){
    setData((prevData)=>{
      return {...prevData, [e.target.name]: e.target.value};
    })
  }
  function register(e){
    if(data?.password!==data?.cPassword){
      dispatch(display_alert({message: "Both password are not matched", type: "warning"}))
    }else{
      const {uniqueCode, fname, lname, ...others }= data;
      const dataToSend= {...others, "name": `${fname} ${lname}`}
      dispatch(signup(dataToSend));
    }
    e.preventDefault();
  }

  function userType(event){
    // console.log(event.target.value);
    const uniqueId= document.getElementById('unique-id');
    const studentProperty= document.querySelectorAll(".student");
    if(event.target.value==="admin"){
      setData((prevData)=>{
        return {...prevData, "user": "admin"};
      })
      uniqueId.style.display="flex";
      studentProperty.forEach((e)=>{
        e.style.display="none";
      })
    }else{
      uniqueId.style.display="none";
      setData((prevData)=>{
        return {...prevData, "user": "student"};
      })
      studentProperty.forEach((e)=>{
        e.style.display="flex";
      })
    }
  }
  return (
    <>
    <div className="signup-main-container">
     <form onSubmit={register} className='signup-form'>
        <div className="heading child">
          <p>Registration Form</p>
        </div>
        <div className="name child">
            <div className="fname name-chlid">
            <label htmlFor="fname">First Name: </label>
              <input onChange={changeHandler} value={data?.fname} type="text" name="fname" id="fname" className='signup-form-child' required/>
            </div>
            <div className="lname name-chlid">
            <label htmlFor="lname"> Last Name: </label>
              <input onChange={changeHandler} value={data?.lname} type="text" name="lname" id="lname" className='signup-form-child' required />
            </div>
        </div>
        <div className="user child">
          <label htmlFor='user'>Register as: </label>
          <div className="left-user">
            <input type="radio" name="user" id="user" value="student" onChange={userType}  />
          <label htmlFor="student">Student</label>
          </div>
          <div className="right-user">
          <input type="radio" name="user" id="admin" onChange={userType} value={"admin"} />
          <label htmlFor="admin">Admin</label>
          </div>
        </div>
        <div className="unique-code child" id='unique-id'>
          <label htmlFor="code">Admin Id: </label>
          <input onChange={changeHandler} value={data?.uniqueCode} type="number" name="uniqueCode" id="uniqueCode"/>
        </div>
        <div className='enrollment child student' >
          <label htmlFor="enrollment">Enrollment: </label>
          <input onChange={changeHandler}  value={data?.enrollment} type="text" name="enrollment" id="enrollment" required={data.user==='student'?true:false}/>
          </div>
        <div className="department child student">
          <label htmlFor="branch">Department: </label>
          <select onChange={changeHandler} name="branch" id="branch" required>
            <option value="ECE" defaultChecked> ECE </option>
            <option value="EEE"> EEE </option>
            <option value="CSE"> CSE </option>
            <option value="CE"> CE </option>
            <option value="ME"> ME </option>
          </select> 
        </div>
        <div className="course child student">
          <label htmlFor="course">Course: </label>
          <select onChange={changeHandler} value={data?.course} name="course" id="course" required>
            <option value="B. Tech" defaultChecked> B. Tech </option>
            <option value="M. Tech"> M. Tech </option>
            <option value="Phd"> Phd </option>
          </select>
        </div>
        <div className="admission-year child student">
          <label htmlFor="admissionYear">Year of admission: </label>
          <input onChange={changeHandler} value={data?.admissionYear} maxLength={4} title='length should be 4' max={year} type="number" name="admissionYear" id="admissionYear" className='admissionYear' required={data.user==='student'?true:false}/>
        </div>
        <div className="dob child student">
          <label htmlFor="dob">Date of Birth: </label>
          <input onChange={changeHandler} min="1950-01-01" title='must be born after 1950' max={`${year-15}-12-31`} value={data?.dob} type="date" name="dob" id="dob" required={data.user==='student'?true:false}/>
        </div>
        <div className="contact child student"> 
          <div className="mobile contact-child">
          <label htmlFor="mobile">Contact No: </label>
          <input onChange={changeHandler} pattern="[6-9]{1}[0-9]{9}"
          title="Enter a valid mobile number" value={data?.mobile} type="text" name="mobile" id="mobile" required={data.user==='student'?true:false}/>
          </div>
            <div className="email contact-child">
              <label htmlFor="email"> Email: </label>
            <input onChange={changeHandler} value={data?.email} type="email" name="email" id="email" required={data.user==='student'?true:false}/>
            </div>
        </div>
        <div className="cgpa child student">
          <label htmlFor="cgpa">CGPA: </label>
          <input onChange={changeHandler} pattern='[0-9]{1}[.]{1}[0-9]{1}' title='Follow this way. Eg. 8.6' maxLength={3}  value={data?.cgpa} type="text" name="cgpa" id="cgpa " required={data.user==='student'?true:false}/>
        </div>
        <div className="credential child">
          <div className='uname' >
          <label htmlFor="username">Username: </label>
          <input onChange={changeHandler}  value={data?.username} type="text" name="username" id="username" required/>
          </div>
          <div className='password'>
            <label htmlFor="password">Password: </label>
            <input onChange={changeHandler} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"  value={data?.password} type="password" name="password" id="password" required/>
            <i onClick={()=>{
              const eye= document.getElementById("eyePiece1");
              const x= document.getElementById("password");
              if(x.type==='password' && data?.password!==""){
                x.type='text';
                eye.classList.remove('fa-eye-slash');
                eye.classList.add('fa-eye');
              }else{
                x.type='password';
                eye.classList.add('fa-eye-slash');
                eye.classList.remove('fa-eye');
              }              
            }} className="fa-sharp fa-solid fa-eye-slash eye" id='eyePiece1'></i>
          </div >
          <div className='password' >
            <label htmlFor="cPassword">Confirm Password: </label>
            <input onChange={changeHandler}  value={data?.cPassword} type="password" name="cPassword" id="cPassword" required/>
            <i onClick={()=>{
              const eye= document.getElementById("eyePiece2");
              const x= document.getElementById("cPassword");
              if(x.type==='password' && data?.cPassword!==""){
                x.type='text';
                eye.classList.remove('fa-eye-slash');
                eye.classList.add('fa-eye');
              }else{
                x.type='password';
                eye.classList.add('fa-eye-slash');
                eye.classList.remove('fa-eye');
              }              
            }} className="fa-sharp fa-solid fa-eye-slash eye" id='eyePiece2'></i>
          </div>
        </div>
        <div className="submit child">
          <button type="submit">Register</button>
        </div>
        <div className="link child">
          <Link className='a' to="/">Already registered</Link>
        </div>
      </form>
      </div>
    </>
  )
}
