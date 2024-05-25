const Auth= require ("../models/Auth")
const bcrypt = require('bcrypt');

let createuser= async(req,res)=>{
   let {email}=req.body;
   let user=await Auth.findOne({email})
 try{

    // !user ka mtlb h ki database jo email mil h usse match ni rha tho use database mai save krwana
if(!user){
    const salt = bcrypt.genSaltSync(10);
const hashPassword =await bcrypt.hashSync(req.body.password, salt);
// Store hash in your password DB.
     user = await new Auth({     //collection mai data ko store kraa rhe h
        name:req.body.name,
        email:req.body.email,
        password:hashPassword,
        address:req.body.address
         })
         await user.save()
     return res.status(200).json({success:true,msg:'user registered succeessfully',user})
 }
 else{
    return    res.status(200).json({success:true,msg:'user already exists'})
 }
}

catch(error){
 return res.status(500).json({msg:"error in register user",error:error.message})
}
}
//using by id 
let updateuser =async(req,res)=>{
    let {name,password}=req.body
    let id= req.params._id;
    let hashPassword;
    try {
        if (password){
            const salt =await bcrypt.genSaltSync(10);
            hashPassword =await bcrypt.hashSync(password,salt)
            let userExistes =await Auth.findByIdAndUpdate({_id:id},{$set:{name:name,password:hashPassword}})
    return res.status(200).json({success:true,msg:"user updated successfully",userExistes})
        }
        
      
    } catch (error) {
        
        return res.status(200).json({success:false,msg:"error in updating user",error:error.message}) 
    }


}
let loginuser =async(req,res)=>{
    let {email,password}=req.body
    let user=await Auth.findOne({email:req.body.email})
    console.log(user)
try {
//  yha database mai mera password  save h tho koi dusra user aya or same password dala tho vo match kr jayega user logged in ho jayega 
    if(user){
        let ComparePassword=bcrypt.compareSync(password, user.password); // false
        console.log(ComparePassword)
    
        if(ComparePassword){
          return  res.status(200).json({success:true,msg:'user logged in successfully',user})
        }
        else{
          return  res.status(200).json({success:false,msg:"wrong password !"})
        }
    }
    else{
      return  res.json({success:false,msg:'user not found !or invalid credentials'})
    }

    
} catch (error) {
    return res.status(500).json({msg:"error in regiter user",error:error.massage})
}
}
let deleteuser =async(req,res)=>{
    try{
        let user= await Auth.findByIdAndDelete(req.params_id)
        return res.status(200).json({success:true,msg:"user email delete successfully",userdel})
    }
    catch (error){
        res.status(500).json({success:false,msg:"no users found"})
    }

//    let id= req.params._id;
// let userdel =await Auth.deleteOne({_id:id})
//     return res.status(200).json({success:true,msg:"user email delete successfully",userdel})
}

let getAllusers =async(req,res)=>{
    let allusers =await Auth.find({})
    if(allusers){
        return res.status(200).json({success:true,msg:"all users",allusers})
    }
    else{
        return res.status(500).json({success:false,msg:"user not found",error:error.massage})
    }
}
module.exports={
    createuser,
    updateuser,
    loginuser,
    deleteuser ,
    getAllusers

}