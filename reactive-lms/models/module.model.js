import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required']
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    status:{
        type:String,
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
    lessonIds:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true
    },
    duration:{
        type:Number
    }
})

export const Module = mongoose.models.Module ?? mongoose.model("Module",moduleSchema)