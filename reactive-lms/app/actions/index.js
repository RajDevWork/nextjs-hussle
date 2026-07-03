'use server'
import { signIn } from "@/auth" 


/**
 * Authenticates a user using email and password credentials.
 *
 * This function extracts the user's email and password from the provided
 * form data and attempts to sign in using the credentials authentication
 * provider. Automatic redirection is disabled so the caller can handle
 * the authentication result.
 *
 * @async
 * @param {FormData} formData - The form data containing the user's email and password.
 * @returns {Promise<Object>} The authentication response returned by the sign-in process.
 * @throws {Error} Throws an error if the authentication request fails.
 */
export async function credentialLogin(formData){
    
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect:false
        })
        return response;
    } catch (error) {
        throw new Error(error);
    }



}