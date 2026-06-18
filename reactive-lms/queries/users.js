import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";  
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email){
    const user = await User.findOne({email: email}).lean();
    return replaceMongoIdInObject(user);
}

export async function getUserWithPassword(email) {
    const user = await User.findOne({ email })
        .select("+password")
        .lean();

    return replaceMongoIdInObject(user);
}


export async function validatePassword(email, password){

    let isMatch = null;
    try {
        const user = await getUserWithPassword(email);
        isMatch = await bcrypt.compare(
            password,
            user.password
        );
        return isMatch
    } catch (error) {
        throw new Error("Invalid old password!,Please enter a valid current password")
    }
    
}