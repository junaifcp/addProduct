const express=require('express')
const router =express.Router();
const {createPost, deletePost, getAllPost, getPost, updatePost}=require('../controllers/post')
const store=require('../middleware/multer')
// import express from 'express'
// import { createPost, deletePost, getAllPost, getPost, updatePost } from '../controllers/post.js';
// import store from '../middleware/multer.js'

//CREATE
router.post('/',store.single('photo'),createPost)
//UPDATE
router.put('/:id',updatePost)
//DELETE
router.delete('/:id',deletePost)
//GET ONE
router.get('/:id',getPost)
//GET ALL
router.get('/',getAllPost)

module.exports=router;
// export default router;