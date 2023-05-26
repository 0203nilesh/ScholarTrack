import React, { useEffect } from 'react'
import { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { delete_student, get_student, get_students } from '../../../action/student';

export default function Card(props) {
  const data= props.data;
  const dispatch= useDispatch();
  const navigate= useNavigate();
  return (
    <div className="card-container">
        <div className="name child">
           <p><span>{data?.name.split(" ")[0]}</span> {data?.name.split(" ")[1]!=="" && (<><span>{data?.name.split(" ")[1]}</span></>)} </p>
        </div>
        <div className="other child">
          <p>Branch: {data?.branch} </p>
          <p>Course:  {data?.course} </p>
          <p>Batch: {data?.admissionYear} </p>
        </div>
        <div className="buttons">
          <button onClick={()=>{
            dispatch(get_student(navigate,data?._id));           
          }} > <i className="fa-solid fa-expand"></i> </button>
          <button> <i onClick={()=>{
            dispatch(delete_student(data._id));
          }} className="fa-sharp fa-solid fa-trash"></i> </button>
        </div>
    </div>
  )
}
