const express=require('express')
const app=express()
const port=8080;
const connectToDb=require('./db')
connectToDb()

const cors=require('cors')
app.use(cors())

// yha ek variable mai models uske ander Auth.js file k ander collection h jo jo chij  hme chaiye esi files k ander usi k patth ko require kia h
let Auth=require('./models/Auth')


// yha pe crud k path ko require kia gya h jo authroutes mai k ander h
let authroutes=require('./routes/authRoutes')
let postRoutes=require('./routes/postrouter')
app.use(express.json({limit:"50mb"}))

app.get('/',(req,res)=>{
    res.send('hello i am anurag')
})


// app.use ek middlewere h usmai api/auth/ naam ki api bnaya h
app.use('/api/auth',authroutes)
app.use('/post',postRoutes)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})