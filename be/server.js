import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectdb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userroute.js";
import productRouter from "./routes/productroute.js";
import cartRouter from "./routes/cartroute.js";

// app config

const app=express();
const port=process.env.PORT || 4000
connectdb()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.get('/',(req,res)=>{
    res.send("api working")

})
//api start
app.listen(port,()=>{
    console.log(`server started on port:${port}`)

})