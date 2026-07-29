import mongoose from "mongoose";

async function connectToDB(){

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB");
    } catch (error) {
        throw new Error(error);
    }
}

export default connectToDB