import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subTitle:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    postImage:{
        type:String,
        required:true,
        default:''
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

const Post = mongoose.model("Post",postSchema)
export default Post 