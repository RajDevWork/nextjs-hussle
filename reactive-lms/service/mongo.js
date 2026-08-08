import mongoose from 'mongoose'


/** * Establishes a connection to the MongoDB database. * * Uses the MongoDB connection URI stored in the environment variables. * Logs a success message when the connection is established and * logs the error if the connection attempt fails. */

export async function ConnectToDB(){
    try {
        await mongoose.connect(String(process.env.MONGO_URI))
        console.log("Connected to DB")
    } catch (error) {
        console.log("Database connection failed!, ",error)
    }
}