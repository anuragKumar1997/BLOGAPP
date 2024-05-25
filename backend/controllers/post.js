const Post = require('../models/Post')

const createpost = async (req,res) => {
    let { tittle, author, description, image } = req.body
    let user = await new Post({
        tittle: tittle,
        author: author,
        description: description,
        image: image,

    })
    await user.save()
res.send({success:true,msg:"user created post succesfully",user})
}

const updatepost=async(req,res)=>{
    let {tittle,description}=req.body
    console.log(req.body)
  let id=req.params._id
  try {
    let userupdate=await Post.findByIdAndUpdate({_id:id},{$set:{tittle,description}})

return res.status(200).json({success:true,msg:"post updated successfully",userupdate})
}
   catch (error) {
    return res.status(500).json({success:false,msg:"error in updating post",error:error.message})
  }
}
const deletepost=async(req,res)=>{
// let {tittle}=req.body
let id=req.params._id
try {
    let userdelete=await Post.findByIdAndDelete({_id:id})
return res.status(200).json({success:true,msg:"user deleted successfully",userdelete}) 
} catch (error) {
    return res.status(500).json({success:false,msg:"error in deleting post",error:error.message}) 
}
}
const getAllUserPost=async(req,res)=>{
try {
    let allposts=await Post.find().populate({path:"author"})
    if(allposts){
return res.status(200).json({success:true,msg:"all posts fetched successfully",allposts})
    }
    else{
        return res.status(404).json({success:false,msg:"no posts found"}) 
    }
    
} catch (error) {
    return res.status(500).json({success:false,msg:"error in getting all users  posts",error:error.message}) 
}
}

const getAllmypost=async(req,res)=>{
    let _id=req.params._id
    try {
        let allpost=await Post.find({author:_id})
        if(allpost.length){
            res.status(200).json({success:true,msg:"fetched all post successfully",allpost})
        }
        else{
            res.status(404).json({success:false,msg:"no post found"})
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:"error in getting all users  posts",error:error.message})
    }
}
const getsinglepost=async(req,res)=>{
    let _id=req.params._id
   try {
    let post=await Post.findById(_id)
    res.status(200).json({success:true,msg:"fetched post successfully",post})
   } catch (error) {
    
    return res.status(500).json({success:false,msg:"error in getting   posts",error:error.message})
   }
}
module.exports={
    createpost,
    updatepost,
    deletepost,
    getAllUserPost,
    getAllmypost,
    getsinglepost,

}

