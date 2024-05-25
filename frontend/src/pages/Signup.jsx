import React, { useRef } from 'react'
import {useNavigate ,Link} from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  let navigate=useNavigate()
let nameRef=useRef()
let emailRef=useRef()
let passwordRef=useRef()
let addressRef=useRef()

const handleSubmit= async()=>{
    let obj={
        name:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value,
        address:addressRef.current.value,
    }
    console.log(obj)


    let res=await fetch('http://localhost:8080/api/auth/register',{
    
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    
    })
    
    let data=await res.json()
    console.log(data)
    if(data.success===true){
      navigate('/')
toast.success(data.msg,{position:"top-center",theme:"colored"})

    }
    else{
toast.error(data.msg,{position:"top-center",theme:"colored"})

    }
}

  return (
    <div>

      <div className='login'>
      <h1>Signup page</h1>
      <label htmlFor="">Name</label>
      <input ref={nameRef} type="text" />
      <label htmlFor="">Email</label>
      <input ref={emailRef} type="email" />
      <label htmlFor="">address</label>
      <input ref={addressRef} type="email" />
      <label htmlFor="">Password</label>
      <input ref={passwordRef} type="password" />
      <p>Already in user? <Link to='/login'>Login?</Link></p>
      <button onClick={handleSubmit}>submit</button>

      </div>
    </div>
  )
}

export default Signup

