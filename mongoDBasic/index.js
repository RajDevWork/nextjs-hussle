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



    // =========================================
    // 3. $not → NOT Condition
    // =========================================

    // age should NOT be greater than 30
    // await User.find({
    //     age: {
    //         $not: { $gt: 30 }
    //     }
    // })



    // =========================================
    // 4. $nor
    // =========================================

    // Neither condition should match
    // await User.find({
    //     $nor: [
    //         { age: 25 },
    //         { salary: 50000 }
    //     ]
    // })



    // =========================================
    // 5. $exists
    // =========================================

    // Check if salary field exists
    // await User.find({
    //     salary: { $exists: true }
    // })



    // =========================================
    // 6. $type
    // =========================================

    // Find documents where age is number type
    // await User.find({
    //     age: { $type: "number" }
    // })



    // =========================================
    // 7. $regex → Pattern Search
    // =========================================

    // Search names containing "Raj"
    // await User.find({
    //     name: { $regex: "Raj" }
    // })



    // =========================================
    // 8. Case Insensitive Search
    // =========================================

    // "raj", "RAJ", "Raj" all work
    // await User.find({
    //     name: {
    //         $regex: "raj",
    //         $options: "i"
    //     }
    // })



    // =========================================
    // 9. Starts With
    // =========================================

    // Names starting with R
    // await User.find({
    //     name: { $regex: "^R" }
    // })



    // =========================================
    // 20. Ends With
    // =========================================

    // Names ending with r
    // await User.find({
    //     name: { $regex: "r$" }
    // })



    // =========================================
    // 11. $all → Array Must Contain All
    // =========================================

    // skills array must contain BOTH
    // await User.find({
    //     skills: {
    //         $all: ["Node.js", "MongoDB"]
    //     }
    // })



    // =========================================
    // 12. $size → Array Length
    // =========================================

    // skills array length should be 3
    // await User.find({
    //     skills: { $size: 3 }
    // })



    // =========================================
    // 13. Projection
    // =========================================

    // Show only name and age
    // await User.find({}, "name age")



    // =========================================
    // 14. Projection Using Object
    // =========================================

    // 1 means include field
    // await User.find({}, {
    //     name: 1,
    //     age: 1
    // })



    // =========================================
    // 15. sort() Ascending
    // =========================================

    // age low to high
    // await User.find().sort({
    //     age: 1
    // })



    // =========================================
    // 16`. sort() Descending
    // =========================================

    // age high to low
    // await User.find().sort({
    //     age: -1
    // })



    // =========================================
    // 17. limit()
    // =========================================

    // Get only 5 documents
    // await User.find().limit(5)



    // =========================================
    // 18. skip()
    // =========================================

    // Skip first 5 documents
    // await User.find().skip(5)



    // =========================================
    // 19. select()
    // =========================================

    // Select only name and salary
    // await User.find().select("name salary")



    // =========================================
    // 20. countDocuments()
    // =========================================

    // Count unmarried users
    // await User.countDocuments({
    //     isMarried: false
    // })



    // =========================================
    // 21. deleteOne()
    // =========================================

    // Delete first matching document
    // await User.deleteOne({
    //     name: "Raj"
    // })



    // =========================================
    // 21. deleteMany()
    // =========================================

    // Delete all users age < 18
    // await User.deleteMany({
    //     age: { $lt: 18 }
    // })



    // =========================================
    // 22. updateOne()
    // =========================================

    // Update one user
    // await User.updateOne(
    //     { name: "Raj" },

    //     {
    //         $set: {
    //             salary: 90000
    //         }
    //     }
    // )



    // =========================================
    // 23. updateMany()
    // =========================================

    // Increase salary of all unmarried users
    // await User.updateMany(

    //     { isMarried: false },

    //     {
    //         $inc: {
    //             salary: 5000
    //         }
    //     }
    // )



    // =========================================
    // 24. $set
    // =========================================

    // Set/update field value
    // await User.updateOne(
    //     { name: "Raj" },

    //     {
    //         $set: {
    //             age: 30
    //         }
    //     }
    // )



    // =========================================
    // 25. $inc
    // =========================================

    // Increase salary by 5000
    // await User.updateOne(
    //     { name: "Raj" },

    //     {
    //         $inc: {
    //             salary: 5000
    //         }
    //     }
    // )



    // =========================================
    // 26. $unset
    // =========================================

    // Remove salary field
    // await User.updateOne(
    //     { name: "Raj" },

    //     {
    //         $unset: {
    //             salary: ""
    //         }
    //     }
    // )



    // =========================================
    // 27. $push
    // =========================================

    // Add value into array
    // await User.updateOne(
    //     { name: "Raj" },

    //     {
    //         $push: {
    //             skills: "React"
    //         }
    //     }
    // )



    // =========================================
    // 28. $pull
    // =========================================

    // Remove value from array
    // await User.updateOne(
    //     { name: "Raj" },

    //     {
    //         $pull: {
    //             skills: "React"
    //         }
    //     }
    // )



    // =========================================
    // 29. Pagination
    // =========================================

    // const page = 2
    // const limit = 5

    // Formula:
    // skip = (page - 1) * limit

    // await User.find()
    //     .skip((page - 1) * limit)
    //     .limit(limit)



    // =========================================
    // 30. Complex Query Example
    // =========================================

    // unmarried male users
    // salary >= 50000
    // age < 30
    // sort by salary descending
    // show only selected fields

    // const users = await User.find({

    //     $and: [

    //         { isMarried: false },

    //         { gender: "male" },

    //         {
    //             salary: {
    //                 $gte: 50000
    //             }
    //         },

    //         {
    //             age: {
    //                 $lt: 30
    //             }
    //         }
    //     ]
    // })

    // .sort({
    //     salary: -1
    // })

    // .limit(5)

    // .select("name salary age")

    //update one way:

    // const users = await User.findById("6a118fce3bfc9ef96b705192")
    // users.isMarried = true
    // users.save()


    //update 2nd way:

    // const users = await User.findByIdAndUpdate("6a118fce3bfc9ef96b705192",{age:55,isMarried:true},{new:true,runValidators:true})

    const users = await User.deleteOne({_id:"6a118fce3bfc9ef96b705192"})




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