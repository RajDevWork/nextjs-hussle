import Post from "../models/post.model.js";
import { StatusCodes } from "http-status-codes";


export const createPost = async(req,res)=>{
    try {
        const {title,subTitle,content,postImage} = req.body;

        // get user details
        const {id, email} = req.user;

        if(!title || !content){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message:"All fields are required!"
            })
        }

        // create post

        const post = await Post.create({
            title:title,
            subTitle: subTitle??'',
            content:content,
            postImage:postImage??'',
            user:id
        })


        return res.status(StatusCodes.CREATED).json({
            message:"Post Created successfully!",
            post:post,
            // user: req.user
        })

        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:"Internal server error!"
        })
    }
}