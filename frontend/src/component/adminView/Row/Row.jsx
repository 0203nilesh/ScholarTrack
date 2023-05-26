import React from 'react'
import './style.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { get_students } from '../../../action/student';

export default function Row() {
  const studentsData= useSelector((state)=>state.student.studentsData);
  // console.log(studentsData);
  const dispatch= useDispatch();
  useEffect(()=>{
      dispatch(get_students());
  }, [])
  return (
    <div className="row-container">
       {studentsData.length===0?(<>
       <div className="no-data">
       {/* <i class="fa-solid fa-face-pensive" wid></i> */}
       <h1>Not Matching Found</h1>
       </div>
       </>):(<>
        {studentsData.map((student)=>{
          return(<>
            <Card key={student?._id} data={student} />
          </>)
        })}
       </>)}
    </div>
  )
}
