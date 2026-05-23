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
    // const users = await User.findById("6a118fce3bfc9ef96b70519b") // filter data by id

    //filters

    // const users  = await User.find() // find all the documents
    // const users  = await User.find({isMarried:false}) // find only isMarried:false documents
    // const users  = await User.find({isMarried:false}).select("name salary") // select only specific columns
    // const users  = await User.find({isMarried:false}).select("-name -salary") // exclude only specific columns
    // const users  = await User.find({isMarried:false}).select("name salary").sort("salary") // sort by specific columns in ASC order
    // const users  = await User.find({isMarried:false}).select("name salary").sort("-salary") // sort by specific columns in DESC order
    // const users  = await User.find({isMarried:false}).select("name salary").sort("-salary").limit(2) // sort by specific columns in DESC order and limit the documents

    // const users  = await User.find({isMarried:false}).countDocuments(); // count the number of records

    //comparision operator

    // const users = await User.find({age:{$eq:30}}) // age equal to 30
    // const users = await User.find({age:{$ne:30}}) // age not equal to 30
    // const users = await User.find({age:{$gt:30}}) // age greater than  30
    // const users = await User.find({age:{$gte:30}}) // age greater than equal to 30
    // const users = await User.find({age:{$lt:30}}) // age less than to 30
    // const users = await User.find({age:{$lte:30}}) // age less than equal to 30
    // const users = await User.find({age:{$in:[30,31,32,25]}}) // age in []
    // const users = await User.find({age:{$nin:[30,31,32,25]}}) // age not in []

    //complex query and , or operation

    // =========================================
    // 1. $and → AND Condition
    // =========================================

    // Both conditions must be true
    // const users = await User.find({
    //     $and: [
    //         { isMarried: false },
    //         { salary: { $gt: 50000 } }
    //     ]
    // })

    // =========================================
    // 2. $or → OR Condition
    // =========================================

    // Any one condition can be true
    // const users = await User.find({
    //     $or: [
    //         { age: 25 },
    //         { age: 30 }
    //     ]
    // })


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