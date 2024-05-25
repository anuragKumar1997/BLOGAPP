const mongoose=require('mongoose')
const postSchema=new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    },
    image:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"auth",
        // type:String,
        // required:true
    }


})
module.exports=mongoose.model('posts',postSchema)