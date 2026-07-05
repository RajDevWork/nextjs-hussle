/**
 * This function creates a new module and associates it with a course.
 * It extracts the necessary fields from the provided FormData object, creates the module,
 * and updates the corresponding course with the new module
 * @param {FormData} data - The FormData object containing the module details.
 * @returns {Promise<Object>} - The created module object.
 * 
 * This function is designed to be used in a server-side context, as indicated by the "use server" directive at the top of the file. Also, it handles errors by throwing an error if any issues occur during the module creation or course update process. and called from the course module frontend page. onSubmit of the form, this function is called to create a new module and associate it with the specified course.
 */
"use server"

import { Course } from "@/models/course.model";
import { Module } from "@/models/module.model";
import { create } from "@/queries/modules";

export async function createModule(data){
    try {

        // Extract the necessary fields from the FormData object

        const title = data.get("title");
        const slug = data.get("slug");
        const courseId = data.get("courseId");
        const order = data.get("order");

        // Create the module using the extracted data
        const createdModule = await create({title,slug, course: courseId,order});
        // Update the course with the new module's ID
        const course = await Course.findById(courseId);
        // Ensure the course exists before pushing the module ID

        console.log("createdModule._id = ",createdModule._id)
        course.modules.push(createdModule._id);
        course.save();

        return createdModule;
        
    } catch (e) {
        throw new Error(e);
    }
}

export async function reOrderModules(data){

    try {
        await Promise.all(data.map(async(element) => {
            await Module.findByIdAndUpdate(element.id, {order: element.position});
        }));
    } catch (e) {
        throw new Error(e);
    }

}

export async function updateModule(moduleId, data) {
    try {
        await Module.findByIdAndUpdate(moduleId,data);
    } catch (error) {
        throw new Error(e);
    }
}