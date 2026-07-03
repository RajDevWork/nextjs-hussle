"use server"

import { getLoggedInUser } from "@/lib/loggedin-user"
import { Course } from "@/models/course.model";
import { create } from "@/queries/courses";



/**
 * Creates a new course and assigns the currently logged-in user
 * as the course instructor.
 *
 * The function retrieves the authenticated user's information,
 * attaches the user's ID to the course data as the `instructor`,
 * and persists the course in the database.
 *
 * @async
 * @param {Object} data - The course information to be created.
 * @returns {Promise<Object>} The newly created course.
 * @throws {Error} Throws an error if the course creation fails.
 */
export async function createCourse(data){
    try {
        const loggedinUser = await getLoggedInUser();
        data["instructor"] = loggedinUser?.id
        const course = await create(data);
        return course;
    } catch (e) {
        throw new Error(e);
    }
}

/**Update course based on courseId and form data with mapped field to DB */
export async function updateCourse(courseId, dataToUpdate){
    try{
        await Course.findByIdAndUpdate(courseId,dataToUpdate)
    }catch(e){
        throw new Error(e);
    }
}