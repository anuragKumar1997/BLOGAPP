import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Form = () => {
  
    let nameRef=useRef()
    let emailRef=useRef()
    let passwordRef=useRef()
    let addressRef=useRef()

const handleSubmit=()=>{
    let obj={
name:nameRef.current.value,
email:emailRef.current.value,
address:addressRef.current.value,
password:passwordRef.current.value,
    }
    
    console.log(obj)
}
  
  return (
    <div className='form1'>
    <h1>form page</h1>
    <label htmlFor="">Name</label>
    <input ref={nameRef} type="text" />
    <label htmlFor="">Email</label>
    <input ref={emailRef} type="Email" />
    <label htmlFor="">Address</label>
    <input ref={addressRef} type="text" />
    <label htmlFor="">password</label>
    <input ref={passwordRef} type="password" />
    <button onClick={handleSubmit}>Submit</button>
    
      
    </div>
  )
}

export default Form
