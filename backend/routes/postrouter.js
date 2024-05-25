const express =require('express');
const { createpost, updatepost, deletepost, getAllUserPost, getAllmypost, getsinglepost } =require('../controllers/post');
const router=express.Router()  


router.post('/create',createpost)
router.put('/update/:_id',updatepost)
router.delete('/delete/:_id',deletepost)
router.get('/getalluserpost',getAllUserPost)
router.get('/mypost/:_id',getAllmypost)
router.get('/singlepost/:_id',getsinglepost)


module.exports=router;