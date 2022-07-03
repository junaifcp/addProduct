const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const methodOverride=require('method-override')
const postsRouter=require('./routes/posts.js')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const fs=require('fs')
const cors=require('cors')
// import dotenv from 'dotenv'
// import mongoose from 'mongoose';
// import methodOverride from 'method-override'
// import postsRouter from './routes/posts.js';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';

const app =express()
dotenv.config()
app.use(cors())
const connect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected");
})

app.use(express.static('./uploads'))
//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(methodOverride())
app.use('/api/posts',postsRouter);
app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message||"Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
    
})
app.listen(5001,()=>{
    connect()
    console.log("connected to backend");
})