import React, { useState } from 'react'

const Child = ({getColor}) => {

  const [activeColor,setActiveColor]=useState("")
   
  const handleColorChange=(e)=>{
    const {value}=e.target
    setActiveColor(value)
    getColor(value)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop:"200px" }}>
    <input 
      type="text"
      placeholder='Enter color'
      id="input"
      onChange={handleColorChange}
      value={activeColor}
      style={{ width: '200px', textAlign: 'center', height:"30px" }}
    />
      <input type="color"value="#19D197" style={{ width: '20%', textAlign: 'center', height:"50vh", marginLeft:"30px" }} />
  </div>  
  )
}

export default Child