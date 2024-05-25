import React, { useContext, useEffect, useRef, useState } from 'react'
import Sidebar from '../component/Sidebar';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const [image, setimage] = useState("");
  const [clicked, setclicked] = useState(false);
  let store=useContext(AuthContext)
  console.log(store)

const [post, setpost] = useState([]);
console.log(post)
async function fetchAllposts(){
  let res =await fetch('http://localhost:8080/post/getalluserpost')
  let data= await res.json()
  console.log(data.allposts)
  setpost(data.allposts)
}
useEffect(()=>{
  fetchAllposts()
},[])
let titleRef=useRef()
let descriptionRef=useRef()

const handleFileChange =(e)=>{
let value =e.target.files[0];
console.log(value)
setimage(value)
}
function doConvert(img){
  return new Promise((resolve,reject)=>{
    var reader =new FileReader();
    reader.readAsDataURL(img);
    reader.onload=function(){
      resolve(reader.result)
    }
reader.onerror= function(err) {
  reject(reader.error)
}
  })
}
const handleBlogSubmit =async(e)=>{
e.preventDefault();
let convertImage= image && await doConvert(image)
console.log(convertImage)
let obj={
  tittle:titleRef.current.value,
  description:descriptionRef.current.value,
  image:convertImage,
  author:store.userDetail._id
}
console.log(obj)

if (obj.tittle && obj.description && obj.image && obj.author){
  
let res =await fetch('http://localhost:8080/post/create',{
  method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
})
let data=await res.json()
    console.log(data)
    fetchAllposts()
    setimage('')
    setclicked(false)
}

else{
  alert('please fill all the data')
}
}

  return (
    <div className='row'>
      <div className='col-2 bg-warning d-flex justify-content-center'>
<Sidebar clicked={clicked} setclicked={setclicked}/>
      </div>
      <div className='col-10 bg-success'>
      <div className='row d-flex justify-content-center gap-4'>
{post.map((ele)=>{

 return <div className="card" style={{width: '16rem'}}>
  <img src={ele.image} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{ele.tittle}</h5>
    <h5 className="card-title">{ele.description}</h5>
    

    {/* <h5 className="card-title">author:{ele.author.name}</h5> */}

    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <Link to="/single" state={ele} className="btn btn-primary">Go somewhere</Link>
  </div>
</div>

})}
    </div>
      </div>
      <div className='formBox'>
 { clicked &&    <form action='' className="col-md-4"> 
 <button onClick={()=> setclicked(false)} type='button' className='btn-close' aria-label="close"></button>
      <label htmlFor="">Title</label>
      <input ref={titleRef} type="text" />
      <label htmlFor="file" className='btn btn-primary'>upload image</label>
      <input onChange={handleFileChange} type="file"  id='file' hidden/>
{!image && <img src="https://tse3.mm.bing.net/th?id=OIP.5IN_8c-nbg_o8eRCgEupdAHaE4&pid=Api&P=0&h=180" alt="" />}
{image && <img src={URL.createObjectURL(image)} alt="" />}
<label htmlFor="">description</label>
<textarea ref={descriptionRef} name='' id=''></textarea>
<button onClick={handleBlogSubmit} className='btn btn-success'>Post blog</button>
      </form>}

      </div>
    </div>

  )
}

export default Home
