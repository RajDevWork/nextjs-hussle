import mongoose from 'mongoose'

export async function ConnectToDB(){
    try {
        await mongoose.connect(String(process.env.MONGO_URI))
        console.log("Connected to DB")
    } catch (error) {
        console.log("Database connection failed!, ",error)
    }
}