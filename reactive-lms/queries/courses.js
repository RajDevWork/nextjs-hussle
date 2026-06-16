import "@/models/user.model";
import { Course } from "@/models/course.model";
import { Category } from "@/models/category.model";
import { User } from "@/models/user.model";
import { Testimonial } from "@/models/testimonial.model";
import { Module } from "@/models/module.model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
export async function getCourseList(){
    const courses = await Course.find().select(["title","subtitle","thumbnail","price","category","instructor"]).populate({
        path:'category',
        model: Category
    }).populate({
        path:'instructor',
        model: User
    }).populate({
        path:'testimonials',
        model: Testimonial
    }).populate({
        path:'modules',
        model: Module
    }).lean();
    return replaceMongoIdInArray(courses)
}


//Get single course details
export async function getCourseDetails(id){
    const course = await Course.findById(id).populate({
        path:'category',
        model: Category
    }).populate({
        path:'instructor',
        model: User
    }).populate({
        path:'testimonials',
        model: Testimonial,
        populate:{
            path:"user",
            model:User
        }
    }).populate({
        path:'modules',
        model: Module
    }).lean();
    return replaceMongoIdInObject(course)
}

export async function getCourseDetailsByInstructor(instructorId){

}