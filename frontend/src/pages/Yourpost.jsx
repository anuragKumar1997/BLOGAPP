import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { AiFillDelete } from "react-icons/ai";
import { FcEditImage } from "react-icons/fc";



const Yourpost = () => {

  let titleRef=useRef();
  let descRef=useRef();

  const [posts, setposts] = useState([]);
  console.log(posts)
  let store =useContext(AuthContext)
  console.log(store)
  let id =store.userDetail._id
  async function mypost(){
let res = await fetch(`http://localhost:8080/post/mypost/${id}`)
let data =await res.json()
console.log(data)
setposts(data.allpost)
  }
  useEffect(()=>{
    mypost()
  },[])

  const handleDelete=async(ans)=>{
    console.log(ans)
    let alertAns =window.confirm('are you sure you want to delete this items')
    console.log(alertAns)
    if(alertAns){
      let res =await fetch(`http://localhost:8080/post/delete/${ans._id}`,{
        method:'DELETE'
      })
      let data =await res.json()
      console.log(data)
      
      mypost()
    }

  }
  const [showform, setshowform] = useState(false);
  const [postId, setpostId] = useState('');
  
  const handleSUBMIT=async(e)=>{
    e.preventDefault();
    let obj={
      tittle:titleRef.current.value,
      description:descRef.current.value,
      author:store.userDetail._id
    }
    console.log(obj)
    console.log(postId)
  let res=await fetch(`http://localhost:8080/post/update/${postId}`,{
    method:'PUT',
    headers:{
     'Content-Type':'application/json'
    },
    body:JSON.stringify(obj)
  })
  let data=await res.json()
  console.log(data)
  setshowform(false)
  mypost()
}
const handleEdit=(ans)=>{
  console.log(ans)
  setpostId(ans._id)
  setshowform(true)
}
  return (
    <div className='row d-flex justify-content-center gap-4'>
    {posts.map((ele)=>{
     return <div className="card" style={{width: '23rem'}}>
     <AiFillDelete onClick={()=>handleDelete(ele)}  size={30} color='red' className='deleteIcon'/>
     <FcEditImage  onClick={()=>handleEdit(ele)} className='editIcon' size={25}/>
  <img src={ele.image} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{ele.tittle}</h5>
    <h5 className="card-title">{ele.description}</h5>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  </div>
    
    })}
{showform &&<div className='col-md-4 p-3 formYourPost'>
<form>
<button onClick={()=>setshowform(false)}type='button' className='btn-close bg-white' area-label='close'></button>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input ref={titleRef} type="text" className="form-control" id="title" aria-describedby="emailHelp" />
   
  </div>
  <div className="form-floating">
  <textarea ref={descRef} className='form-control' placeholder='Leave a comment here' id="floatingTextarea"></textarea>
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>

  </div>

  <button onClick={handleSUBMIT} type="submit" className="btn btn-primary mt-2">Submit</button>
</form>

</div>}
    </div>
  )
}

export default Yourpost
