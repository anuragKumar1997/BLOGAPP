import React from 'react'

const Sidebar = (props) => {
  return (
    <div>
      <button onClick={()=>props.setclicked(true)} className='btn btn-success mt-3'>Create blog</button>
    </div>
  )
}

export default Sidebar
