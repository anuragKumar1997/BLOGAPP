import React from 'react'
import { useLocation } from 'react-router-dom'

const Singlepage = () => {
    let location=useLocation()
    console.log(location.state)
  return (
    <div className='container d-flex justify-content-center'>
<div className='cols-2'>
    <h1>single page</h1>

<p style={{margin:"auto"}}>{location.state.tittle}</p>
<img style={{height:"300px",width:"300px",backgroundColor:"darkgreen"}} src={location.state.image} alt="" />
    </div>
    <div className='cols-2' style={{marginLeft:"50px",marginTop:"100px",backgroundColor:"yellowgreen"}}>
    <p>Description:{location.state.description}</p>
  
    <p> Name:{location.state.author.name}</p>
    <p>Email:{location.state.author.email}</p>
    </div>
    </div>
  )
}

export default Singlepage

