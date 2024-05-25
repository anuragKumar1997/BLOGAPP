import React, { useContext, useRef } from 'react'
import AuthContext from '../context/AuthContext'

const Setting = () => {
    let store=useContext(AuthContext)
    console.log(store.userDetail._id)
    let id =store.userDetail._id
    console.log(id)
    let nameRef=useRef();
    let changepasswordRef=useRef()
const handleSubmit= async()=>{
    let obj={
        name:nameRef.current.value,
        password:changepasswordRef.current.value

    }
    console.log(obj)

    let res = await fetch(`http://localhost:8080/api/auth/update/${id}`,{
        
      method:'put',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    })
 let data= await res.json()
 console.log(data)
    
}

  return (
    <div className='setting bg-dnager'>
      <label htmlFor="">Name</label>
      <input ref={nameRef} type="text" />
      <label htmlFor="">changepassword</label>
      <input ref={changepasswordRef} type="password" />
      <button  onClick={handleSubmit}>Sumbmit</button>

    </div>
  )
}

export default Setting
