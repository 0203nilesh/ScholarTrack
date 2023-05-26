import React from 'react'
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { remove_alert } from '../../../action/alert';

export default function Alert() {
  const dispatch= useDispatch();
    const alert= useSelector((state)=>state.alert);
    const timer= setTimeout(()=>{
      // console.log("what the fuck is going on here");
      dispatch(remove_alert());
    },2000)
    if(!alert.isAlert){
      clearTimeout(timer);
    }
  return (
    <>
    <div style={{backgroundColor: alert?.alertMessage?.type==='success' ?"#198754":"#FFC107" , display: alert.isAlert?"flex":"none"} } className="alert" id='messageText'>
        <p>{alert?.alertMessage?.message}</p>
        <i onClick={ async()=>{
          clearTimeout(timer);
        dispatch(remove_alert());
        }} className="fa-solid fa-xmark cancel"></i>
    </div>
    </>
  )
}
