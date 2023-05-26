import React, { useState } from 'react'
import './style.css';
import { useDispatch } from 'react-redux';
import { filter_data } from '../../../action/student';
export default function Filter() {
    const dispatch=useDispatch();
    const [data, setData]= useState({name: "", admissionYear: "", branch: "ECE", course: "B. Tech"});
    function changeHandler(e){ 
        setData((prevData)=>{
            return {...prevData, [e.target.name]: e.target.value};
        })
    }
    function applyFilter(e){
        e.preventDefault();
        // console.log(data);
        // setData({name: "", admissionYear: "", branch: "ECE", course: "B. Tech"});
        dispatch(filter_data(data));
    }
  return (
    <div onSubmit={applyFilter} className="filter">
        <div className="heading">
            <p>Search by Filter</p>
        </div>
    <form  className="filter-container">
        <div className="name child">
            <input type="text" onChange={changeHandler} value={data?.name}  name="name" id="name" placeholder='Search By name' />
            <input onChange={changeHandler} value={data?.admissionYear} type="number" name="admissionYear" id="admissionYear" className='admissionYear' placeholder='Search by year' />
        </div>
        <div className="other-filters child">
            <div className="branch child">
                <select onChange={changeHandler} value={data?.branch} name="branch" id="branch" >
                <option value="ECE" defaultChecked>ECE</option>
                <option value="EEE">EEE</option>
                <option value="CSE">CSE</option>
                <option value="CE">CE</option>
                <option value="ME">ME</option>
            </select>
            </div>
            <div className="course child">
                <select onChange={changeHandler} value={data?.course} name="course" id="course" >
                <option value="B. Tech" defaultChecked>B. Tech</option>
                <option value="M. Tech">M. Tech</option>
                <option value="Phd">Phd</option>
            </select>
            </div>
        </div>
        <div className="button child">
            <button type="submit">Apply Filter <i className="fa-sharp fa-solid fa-filter"></i></button>
        </div>
    </form>
    </div>
  )
}
