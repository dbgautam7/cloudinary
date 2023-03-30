import React, { useEffect, useRef } from 'react'

const UseRefHook = () => {

    const focusInput = useRef()
    const count=useRef(0)

    const handleInput=()=>{
        console.log(focusInput.current.value,count.current,"useRef")
        console.log(focusInput.current.style,"##")
        focusInput.current.focus()
      focusInput.current.value="";
    //   focusInput.current.style.backgroundColor="red"
    //   count.current =count.current+ 1
    }

    useEffect(()=>{
        handleInput()
    },[])

    return (
        <div style={{ display: 'flex',marginTop:"100px", justifyContent: 'center', alignItems: 'center'}}>
            <input inputMode='numeric' pattern='[0-9]*' placeholder='Enter the Number' 
             ref={focusInput} />
            <button onClick={handleInput}>Enter</button>
            {count.current}
        </div>
    )
}

export default UseRefHook