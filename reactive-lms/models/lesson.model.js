import mongoose,{Schema} from "mongoose";

const lessonSchema = new Schema({
    title:{
        required: true,
        type: String
    },
    description:{
        required: false,
        type: String,
        default:''
    },
    duration:{
        required: true,
        type: Number,
        default:0
    },
    video_url:{
        required: false,
        type: String,
        default:''
    },    
    active:{
        required: true,
        type: Boolean,
        default:false
    },    
    slug:{
        required: true,
        type: String,
    },
    access:{
        required: true,
        default: "private",
        type: String
    },
    order:{
        required: true, 
        type: Number
    },
     
});
export const Lesson = mongoose.models.Lesson ?? mongoose.model("Lesson",lessonSchema);