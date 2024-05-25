const express =require('express');
const { createuser, updateuser, deleteuser, loginuser, getAllusers } = require('../controllers/authControllersd');
const router=express.Router()   //express.Router pre define h

router.post('/register',createuser) //jb data save krana chahte h tho post req
 router.put('/update/:_id',updateuser) // jb data update krana chate h tho put req
router.delete('/:_id',deleteuser)

router.post('/login',loginuser)
router.get('/alluser',getAllusers)

module.exports=router;

