import User from "../models/user.model.js";
import bcrypt  from 'bcryptjs';

export const createUser = async (req,res)=>{

    try {
        
        const {name,email,password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        //check for email already exists
        const isExists = await User.findOne({email:email});
        if(isExists){
            return res.status(409).json({
                message:"Email Already been taken!"
            })
        }
        //hash password
        const hashedPass = await bcrypt.hash(password,10)

        const user = await User.create({name:name,email:email,password:hashedPass})

        const {password:_,...modifiedUser} = user.toObject()

        // console.log(name,email,password)
        return res.status(201).json({
            message:"User created successfully!",
            user: modifiedUser
        })



    } catch (error) {
        return res.status(500).json({
            message:"Internal server error!"
        })
    }
    
}