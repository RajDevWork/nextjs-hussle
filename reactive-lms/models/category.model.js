import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    title:{
        required:[true,'Title is required'],
        type:String
    },
    description:{
        required:[true,'Description is missing'],
        type:String
    },
    thumbnail:{
        type:String,
        required:[true,'Thumbnail is required']
    }
})

export const Category = mongoose.models.Category ?? mongoose.model('Category',categorySchema);