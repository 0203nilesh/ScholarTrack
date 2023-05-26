import React, { useEffect } from 'react'
import './style.css';
import Filter from '../Filter/Filter';
import Row from '../Row/Row';

export default function Main() {
  
  return (
    <div className="adminView-container">
        <Filter />
        <Row/>
    </div>
  )
}
