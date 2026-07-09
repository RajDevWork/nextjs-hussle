import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required']
    },
    description:{
        type:String,
    },
    active:{
        type:Boolean,
        default:false,
        required:true
    },
    slug:{
        type:String,
        required:[true,'Slug is required']
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Course'
    },
    lessonIds:[{  type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    duration:{
        type:Number,
        default:0
    },
    order:{
        required:true,
        type:Number
    }
})

export const Module = mongoose.models.Module ?? mongoose.model("Module",moduleSchema)