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
    const courses = await Course.find({active:true}).select(["title","subtitle","thumbnail","price","category","instructor"]).populate({
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


function groupBy(array, keyFn){
    return array.reduce((acc, item) => {
        const key = keyFn(item);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc
    },{});
}





export async function getCourseDetailsByInstructor(instructorId,expand=false){


    const Publishedcourses = await Course.find({instructor: instructorId, active:true })
    .populate({path: "category", model: Category })
    .populate({path: "testimonials", model: Testimonial })
    .populate({ path: "instructor", model: User})
    .lean();

    //get enrollments for each course of the instructor
    const enrollments = await Promise.all(
        Publishedcourses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(course.
                _id.toString());
                return enrollment;
        })
    );


    const firstName = Publishedcourses.length > 0 ? Publishedcourses[0]?.instructor?.
    firstName : "Unknown";
    const lastName = Publishedcourses.length > 0 ? Publishedcourses[0]?.instructor?.
    lastName : "Unknown";
    const fullInsName = `${firstName} ${lastName}`;

    const Designation = Publishedcourses.length > 0 ? Publishedcourses[0]?.instructor?.
    designation : "Unknown"; 

    const bio = Publishedcourses.length > 0 ? Publishedcourses[0]?.instructor?.
    bio : ""; 

    const insImage = Publishedcourses.length > 0 ? Publishedcourses[0]?.instructor?.
    profilePicture : "Unknown"; 



    // Group enrollments by course
    const groupByCourses = groupBy(enrollments.flat(), (item) => item.course);

    /// Calculate total revenue 
    const totalRevenue = Publishedcourses.reduce((acc, course) => {
        const enrollmentsForCourse = groupByCourses[course._id] || [];
        return acc + enrollmentsForCourse.length * course.price; 
    },0);

    // console.log("totalRevenue = ",totalRevenue);



    //calculate total enrollments for all courses of the instructor
    const totalEnrollments = enrollments.reduce(( acc, obj )=> {
        return acc + obj.length;
    },0);
    
    /**
     * Get all testimonials for each course and calculate average rating
     * 
     */
    const tesimonials = await Promise.all(
        Publishedcourses.map(async (course) => {
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



    if(expand){

        const allCourses = await Course.find({instructor: instructorId}).lean()

        /**
         * Dashboard data ko normalize kar raha hai.
         *
         * courses aur enrollments multiple arrays ke form me aa sakte hain
         * (e.g. har course ke enrollments alag array me).
         *
         * flat() nested arrays ko single array me convert karta hai
         * taaki counting, filtering aur table rendering easy ho jaye.
        */
       return{
        "courses" : allCourses?.flat(),
        "enrollments": enrollments?.flat(),
        "reviews" : totalTestimonials,
        }
    }

    return {
        "courses" : Publishedcourses.length,
        "enrollments": totalEnrollments,
        "reviews" : totalTestimonials.length,
        "ratings" : avgRating.toPrecision(2),
        "instCourses":Publishedcourses,
        "revenue": totalRevenue,
        fullInsName,
        Designation,
        insImage,
        bio
    } 

}



export async function create(courseData) {
    try {
        const course = await Course.create(courseData);
        return JSON.parse(JSON.stringify(course));
    } catch (error) {
        throw new Error(error);
    }
}