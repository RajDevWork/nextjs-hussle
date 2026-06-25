import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData"; 
import { Testimonial } from "@/models/testimonial.model";


/** Get the testimonials based on courseId **/
export async function getTestimonialsForCourse(courseId){
    const testimonials = await Testimonial.find({courseId: courseId}).lean();
    return replaceMongoIdInArray(testimonials);
}