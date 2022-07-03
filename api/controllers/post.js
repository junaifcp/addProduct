// import Post from "../models/post.js"
const Post=require('../models/post')
const fs=require('fs')

exports.createPost=async(req,res,next)=>{
  let price=parseInt(req.body.price)
  let percent=price*1/10
  let updatedPrice=percent+price;
    
    try {
      const newPost=new Post({
        name:req.body.name,
        desc:req.body.desc,
        price:updatedPrice,
        photo:req.file.filename
       
      })
      const savedPost=await newPost.save()
      res.status(200).json(savedPost)
    } catch (error) {
      next(error)
    }
}
exports.updatePost=async(req,res,next)=>{
    
    try {
        const updatePost=await Post.findByIdAndUpdate(req.params.id,{    
            $set:req.body
        },{new:true})
        res.status(200).json(updatePost)
      } catch (error) {
        next(error)
      }
}
exports.deletePost=async(req,res,next)=>{
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
      } catch (error) {
        next(error)
      }
}
exports.getPost=async(req,res,next)=>{
    try {
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
      } catch (error) {
        next(error)
      }
}
exports.getAllPost=async(req,res,next)=>{
    try {
        const posts=await Post.find()
        res.status(200).json(posts)
      } catch (error) {
       next(error)
      }
}