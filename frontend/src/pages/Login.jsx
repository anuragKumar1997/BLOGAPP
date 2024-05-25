import React, { useContext, useRef } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import AuthContext from '../context/AuthContext';
const Login = () => {

let navigate=useNavigate()
let emailRef=useRef()
let passwordRef=useRef()
let store =useContext(AuthContext)
console.log(store)
  const handleSubmit=async(e)=>{

e.preventDefault();
    let obj={
       email:emailRef.current.value,
        password:passwordRef.current.value,
      }
    console.log(obj)
    let res =await axios.post('http://localhost:8080/api/auth/login',obj)
    console.log(res.data)


    if(res.data.success){
      localStorage.setItem('userDetails',JSON.stringify(res.data.user)) //yha userDtails e key h bs koi bhi naam de skte or setitem pre define hota h jb localstorage mai kuch save krte 
      store.setuserDetail({
        name:res.data.user.name,
        _id:res.data.user._id,
        login:true
      })
      navigate('/')
toast.success(res.data.msg,{position:"top-center",theme:"colored"})
    }
    else{
      toast.error(res.data.msg,{position:"top-center",theme:"colored"})
    }
}

  return (
    <form onSubmit={handleSubmit} className='login'>
   <h1>login page</h1>
    
      <label htmlFor="">Email</label>
      <input ref={emailRef} type="email"/>
  
      <label htmlFor="">Password</label>
      <input ref={passwordRef} type="password" />
      <p>Not or user? <Link to='/signup'>Signup?</Link></p>
      <button type='Submit' >submit</button>

    </form>
  )
}

export default Login
