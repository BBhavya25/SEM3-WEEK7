import usermodel from "../models/usermodel.js";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)

}


//route for user login
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await usermodel.findOne({email})
        if(!user){
        return res.json({success:false,message:"User doesn't exists"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=createToken(user._id);
            res.json({success:true,token})

        }
        else{
            res.json({success:false,message:"Invalid credentials"})

        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}
//route for signup

const registerUser=async(req,res)=>{
   try {
    const {name,email,password}=req.body;
    //checking user is already their is not
    const exists=await usermodel.findOne({email})
    if(exists){
        return res.json({success:false,message:'User already exists'})
    }
    //validating email format & strong password
    if(!validator.isEmail(email)){
        return res.json({success:false,message:'Please enter a valid email'})

    }
    if(password.length<8){
        return res.json({success:false,message:'Please enter a strong password'})

    }
    //hashing password 
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt)

    const newUser=new usermodel({
        name,
        email,
        password:hashedpassword
    })
    const user=await newUser.save();

    const token=createToken(user._id)
    res.json({success:true,token})
    
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
   }

}
//Route for admin login
const adminLogin =async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            req.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    
    }

}

export {loginUser,registerUser,adminLogin}