const mongoose= require('mongoose')
require('dotenv').config()

const connectToDb=async()=>{
    mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to mongodb successfully'))
  .catch(() => console.log('error in connecting mongodb server'))
}

module.exports=connectToDb