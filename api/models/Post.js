// import mongoose from "mongoose";
const mongoose=require('mongoose')
const PostSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    photo:{
     type:String
    },
    id:{
        type:String,
    }
},{timestamps:true})
module.exports=mongoose.model("Post",PostSchema);
// export default mongoose.model("Post",PostSchema)