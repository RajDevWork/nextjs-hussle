import User from "../models/user.model.js";
import bcrypt  from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import jwt from "jsonwebtoken";

export const createUser = async (req,res)=>{

    try {
        
        const {name,email,password} = req.body;

        if (!name || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "All fields are required!"
            });
        }

        //check for email already exists
        const isExists = await User.findOne({email:email});
        if(isExists){
            return res.status(StatusCodes.CONFLICT).json({
                message:"Email Already been taken!"
            })
        }
        //hash password
        const hashedPass = await bcrypt.hash(password,10)

        const user = await User.create({name:name,email:email,password:hashedPass})

        const {password:_,...modifiedUser} = user.toObject()

        // console.log(name,email,password)
        return res.status(StatusCodes.CREATED).json({
            message:"User created successfully!",
            user: modifiedUser
        })



    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:"Internal server error!"
        })
    }
    
}

export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message:"All fields are required!"
            })
        }

        //check for email 

        const isUser = await User.findOne({
            email:email
        }).select("+password");

        if(!isUser){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message:"Invalid email or password"
            })
        }

        //password validation
        // console.log(isUser.password,isUser);
        const isValidpass = await bcrypt.compare(password,isUser.password);
        if(!isValidpass){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message:"Invalid email or password"
            })
        }

        // create token
        const token = await jwt.sign({
            id:isUser._id,
            email:isUser.email
        }, process.env.JWT_SECRET,{expiresIn:"1d"})

        res.cookie("token",token);

        // console.log(email,password);
        return res.status(StatusCodes.OK).json({
            message:"Loggedin successfully!",
            user:isUser
        })

        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:`Internal Server error! ${error.message}`
        })
    }
}