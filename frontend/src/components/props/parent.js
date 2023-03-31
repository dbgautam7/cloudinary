import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Child from './child'

const Parent = () => {

  const [color,setColor]=useState(null)

  const getColor=(color)=>{
    setColor(color)
  }

  return (
    <div style={{padding:"20px", height:"100vh", width:"95vw", border:"2px solid red", 
    margin:"20px auto", backgroundColor:`${color}`}}>
       <Link to="/">Back to Home</Link>
       <div style={{margin:"auto"}}>
        <Child getColor={getColor} />
       </div>
    </div>
  )
}

export default Parent