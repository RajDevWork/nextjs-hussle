import "@/models/user.model";
import { Course } from "@/models/course.model";
import { Category } from "@/models/category.model";
import { User } from "@/models/user.model";
import { Testimonial } from "@/models/testimonial.model";
import { Module } from "@/models/module.model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { getTestimonialsForCourse } from "./testimonials";
import { getEnrollmentsForCourse } from "./enrollments";
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


    const courses = await Course.find({instructor: instructorId }).lean();

    //get enrollments for each course of the instructor
    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(course.
                _id.toString());
                return enrollment;
        })
    );

    //calculate total enrollments for all courses of the instructor
    const totalEnrollments = enrollments.reduce(( item, currentValue )=> {
        return item.length + currentValue.length;
    });
    
    /**
     * Get all testimonials for each course and calculate average rating
     * 
     */
    const tesimonials = await Promise.all(
        courses.map(async (course) => {
            const tesimonial = await getTestimonialsForCourse(course.
                _id.toString());
                return tesimonial;
        })
    );

    const totalTestimonials = tesimonials.flat();//flatten the array of arrays into single array

    //calculate average rating
    const avgRating = (totalTestimonials.reduce(function (acc, obj) {
        return acc + obj.rating;
    },0)) / totalTestimonials.length; 

    return {
        "courses" : courses.length,
        "enrollments": totalEnrollments,
        "reviews" : totalTestimonials.length,
        "ratings" : avgRating.toPrecision(2)
    } 

}