import React, { useEffect, useState } from 'react'
import './style.css';
import Alert from '../common/Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { get_student, update_student } from '../../action/student';
import { useNavigate } from 'react-router-dom';
import { display_alert } from '../../action/alert';

export default function Profile() {
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const [profile, setProfile]= useState( JSON.parse(Cookies.get("auth")) || null ) ;
    const [currentStudent, setCurrentStudent]= useState(JSON.parse(Cookies.get("currentStudent") || null))
    // console.log(currentStudent);
    // console.log(useSelector((state)=> state.student.studentData));
    const [x, setX]= useState(useSelector((state)=> state.student.studentData));
    const [data, setData] = useState( currentStudent || profile);
    // console.log(data);
    const [isEdit, setIsEdit]= useState(false);
    const [buttonText, setButtonText]= useState("edit");
    const [newData , setNewData]= useState(data);
    // console.log(newData);
      function changeHandler(e){
            setNewData((prevData)=>{
                return {...prevData, [e.target.name]: e.target.value}
            })
      }
    function saveDetails(e){
        // console.log(newData);
        // console.log(data);
        e.preventDefault();
        if(data?.password===newData?.password){
            setData(()=>{
                const {cPassword , ...others}= newData;
                return {...others, "password": newData.cPassword};
            });
            dispatch(update_student(data._id, newData))
            setIsEdit(false);
            setButtonText("edit"); 
        }else{
            dispatch(display_alert({message: "Old password not matched", type: "Warning"}));
        }
    }
  return (
    <>
   {!data?(<>
    <h1 >Wait</h1>
   </>):(<>
   <form onSubmit={saveDetails}>
    <div className="profile-container">
        <div className="heading child">
            <p>Profile </p>
        </div>
        <div className="main-details">
            <span className='userType'> {data?.user} </span>
        </div>
        <div className="secondary-details child">
        <div className="details child">
            <div className="heading"> 
            <p>Student Details</p> 
            </div>
            <p>Name : {isEdit===true?(<>
                <input onChange={changeHandler} value={newData?.name}  type="text" name="name" id="name" className='signup-form-child' required />
            </>):(<><span>  {data?.name?.split(" ")[0]+" " +data?.name?.split(" ")[1]} </span></>)} </p>
            <p>username : {isEdit===true?(<>
                <input onClick={()=>{
                    dispatch(display_alert({message: "Cannot change username", type: "warning"}));
                }} value={newData?.username} type="username" name="username" id="username"  required/>
            </>):(<>
                <span>{data?.username}</span></>)} </p>
            <p>Date of Birth : {isEdit===true?(<>
                <input onChange={changeHandler} value={newData?.dob} type="date" name="dob" id="dob"  required/>
            </>):(<>
                <span>{data?.dob}</span></>)} </p>
            <p>Mobile : {isEdit===true?(<>
                <input onChange={changeHandler} value={newData?.mobile} type="number" name="mobile" id="mobile" required/>
            </>):(<>
                <span>{data?.mobile}</span></>) } </p>
            <p>Email : {isEdit===true?(<>
                <input onChange={changeHandler} value={newData?.email} type="email" name="email" id="email" required/>
            </>):(<><span>{data?.email}</span></>)} </p>
        </div>
        <div className="academic-details child">
            <div className="heading"> 
                <p> Academic Details </p> 
                </div>
                <p>Batch: {isEdit===true?(<>
                    <input onChange={changeHandler} value={newData?.admissionYear} type="number" name="admissionYear" id="admissionYear" className='admissionYear' required/>
                </>): (<> <span>{data?.admissionYear}  </span> </>)}</p>
                <p>Enrollment:  {isEdit===true?(<>
                <input onChange={changeHandler} value={newData?.enrollment} type="text" name="enrollment" id="enrollment " required/>
                </>): (<> <span>{data?.enrollment} </span></>)} </p>
                <p>Course: {isEdit===true? (<>
                        <select onChange={changeHandler} value={newData?.course} name="course" id="course" required>
                            <option value="B. Tech" defaultChecked>B. Tech</option>
                            <option value="M. Tech">M. Tech</option>
                            <option value="Phd">Phd</option>
                        </select>
          </>):(<><span> {data?.course} </span></>)}  </p>
                <p>Department: {isEdit===true? (<>
                    <select onChange={changeHandler} value={newData?.branch} name="branch" id="branch" required>
                    <option value="ECE" defaultChecked>ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="CSE">CSE</option>
                    <option value="CE">CE</option>
                    <option value="ME">ME</option>
          </select> </>): (<> <span>{data?.branch}</span></>)}    </p>
                
                <p>CGPA:  {isEdit===true?(<>
                <input onChange={changeHandler} value={newData?.cgpa} type="number" name="cgpa" id="cgpa " required/>
                </>): (<> <span>{data?.cgpa} </span></>)} </p>
            </div>
        </div>
        {isEdit===true && (<>
            <div className="password child">
                <div className='password-child'>
                <label htmlFor="password">Old Password: </label>
                <input onChange={changeHandler} value={newData?.password} type="password" name="password" id="password" required/>
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
            <div className='password-child' >
                <label htmlFor="cPassword">New Password: </label>
                <input onChange={changeHandler}  value={newData?.cPassword} type="password" name="cPassword" id="cPassword" required/>
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
        </>)}
        <div className="buttons child">
            <button onClick={(e)=>{
                // console.log(e.target.value);
                if(e.target.value==='edit'){
                    setIsEdit(true);
                    setNewData(data);
                    setButtonText("save"); 
                } 
            }} type='submit' value={buttonText}>{buttonText}</button>
        </div>
    </div>
    </form>
   </>)}
   </>
  )
}
