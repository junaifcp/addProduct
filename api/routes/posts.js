import express from 'express'
import { createPost, deletePost, getAllPost, getPost, updatePost } from '../controllers/post.js';
const router =express.Router();

//CREATE
router.post('/',createPost)
//UPDATE
router.put('/:id',updatePost)
//DELETE
router.delete('/:id',deletePost)
//GET ONE
router.get('/:id',getPost)
//GET ALL
router.get('/',getAllPost)
export default router;