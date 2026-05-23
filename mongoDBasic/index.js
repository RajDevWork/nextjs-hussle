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


//fetch all the data

async function getInformation(){
    // const users = await User.find()// all data

    // const users = await User.find({isMarried:false}) // filter data by isMarried false
    // const users = await User.find({isMarried:false, salary: {$gt:70000}}) // isMarried : false and salary > 70k
    const users = await User.findById("6a118fce3bfc9ef96b70519b") // filter data by id

    console.log(users)
}
getInformation()

//create or store data
// async function storeInfo() {
//   const users = [
//     {
//       name: "Amit Sharma",
//       age: 25,
//       isMarried: false,
//       salary: 65000,
//       gender: "male"
//     },

//     {
//       name: "Priya Verma",
//       age: 30,
//       isMarried: true,
//       salary: 92000,
//       gender: "female"
//     },

//     {
//       name: "Rahul Singh",
//       age: 27,
//       isMarried: false,
//       salary: 78000,
//       gender: "male"
//     },

//     {
//       name: "Sneha Patel",
//       age: 32,
//       isMarried: true,
//       salary: 120000,
//       gender: "female"
//     },

//     {
//       name: "Vikram Yadav",
//       age: 29,
//       isMarried: false,
//       salary: 85000,
//       gender: "male"
//     },

//     {
//       name: "Anjali Gupta",
//       age: 26,
//       isMarried: false,
//       salary: 70000,
//       gender: "female"
//     },

//     {
//       name: "Karan Mehta",
//       age: 35,
//       isMarried: true,
//       salary: 155000,
//       gender: "male"
//     },

//     {
//       name: "Pooja Nair",
//       age: 31,
//       isMarried: true,
//       salary: 110000,
//       gender: "female"
//     },

//     {
//       name: "Rohit Tiwari",
//       age: 24,
//       isMarried: false,
//       salary: 58000,
//       gender: "male"
//     },

//     {
//       name: "Neha Joshi",
//       age: 28,
//       isMarried: false,
//       salary: 97000,
//       gender: "female"
//     }
//   ];

//   await User.create(users);

//   console.log("Data inserted successfully");
// }

// storeInfo();