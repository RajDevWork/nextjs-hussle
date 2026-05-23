const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/nextmongo").then(()=>console.log("Connected to DB")).catch((err)=>console.log(err))


// creating model and schema
const UserSchema = new mongoose.Schema({
    name:String,
    age:Number,
    isMarried:Boolean,
    salary:Number,
    gender:String
})

const User = mongoose.model("User",UserSchema)