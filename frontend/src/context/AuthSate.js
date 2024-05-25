import React, { useState } from 'react'
import AuthContext from './AuthContext'


const AuthSate = (props) => {
  let user=JSON.parse(localStorage.getItem('userDetails'))
    const [userDetail, setuserDetail] = useState({
        name:user?user.name:"",
        _id:user?user._id:"",
        login:user?true:false
    });
    console.log(userDetail)
  return (
    <AuthContext.Provider value={{userDetail,setuserDetail}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthSate

