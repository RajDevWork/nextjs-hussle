"use server"

import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { validatePassword } from "@/queries/users";
import bcrypt from "bcryptjs";


/**
 * Update the profile information of a user.
 *
 * Steps:
 * 1. Find the user by email address.
 * 2. Update the provided fields in the database.
 * 3. Revalidate the account page to reflect the latest data.
 *
 * @param {string} email - User's email address.
 * @param {Object} updatedData - Object containing fields to update.
 * @throws {Error} If the update operation fails.
 */
export async function updateUserInfo(email,updatedData){
    try {
            const filter = {email:email};
            await User.findOneAndUpdate(filter,updatedData)
            revalidatePath("/account")
    } catch (error) {
        throw new Error(error)
    }
}
/**
 * Change the password of the currently authenticated user.
 *
 * Steps:
 * 1. Verify the user's current password.
 * 2. Hash the new password using bcrypt.
 * 3. Update the password in the database.
 * 4. Revalidate the account page to reflect changes.
 *
 * @param {string} email - User's email address.
 * @param {string} oldPassword - Current password entered by the user.
 * @param {string} newPassword - New password to be set.
 * @throws {Error} If the current password is incorrect or update fails.
 */
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