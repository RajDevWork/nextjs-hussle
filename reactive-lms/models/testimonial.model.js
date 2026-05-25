import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
        content:{
            type:String,
            required:[true,'Content is required']
        },
        rating:{
            type:Number,
            required:[true,'Rating is required']
        },
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            required:[true,'Course id is required'],
            ref:'Course'
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:[true,'User id is missing'],
            ref:'User'
        }
})

export const Testimonial = mongoose.models.Testimonial ?? mongoose.model("Testimonial",testimonialSchema)