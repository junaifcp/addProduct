import mongoose from "mongoose";
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
        type:Array,
        default:[]
    },
    id:{
        type:String
    }
},{timestamps:true})
export default mongoose.model("Post",PostSchema)