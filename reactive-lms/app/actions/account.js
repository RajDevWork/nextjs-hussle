"use server"

import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { validatePassword } from "@/queries/users";
import bcrypt from "bcryptjs";
export async function updateUserInfo(email,updatedData){
    try {
            const filter = {email:email};
            await User.findOneAndUpdate(filter,updatedData)
            revalidatePath("/account")
    } catch (error) {
        throw new Error(error)
    }
}

export async function changeOwnPassword(email, oldPassword, newPassword) {

    
    const isMatch = await validatePassword(email,oldPassword);

    if (!isMatch) {
        throw new Error("Please enter a valid current password");        
    }
    const filter = {email: email};
    const hashedPassword = await bcrypt.hash(newPassword, 5);

    const dataToUpadate ={
        password: hashedPassword
    };

    try { 
        await User.findOneAndUpdate(filter,dataToUpadate);
        revalidatePath('/account');
    } catch (error) {
        throw new Error(error);
    } 



}