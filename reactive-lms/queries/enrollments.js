import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Course } from "@/models/course.model";
import { Enrollment } from "@/models/enrollment-model";

export async function getEnrollmentsForCourse(courseId){
    const enrollments = await Enrollment.find({course: courseId}).lean();
    return replaceMongoIdInArray(enrollments);
}

/**
 * Enrolls a student in a course.
 *
 * @param {string} courseId - The ID of the course.
 * @param {string} userId - The ID of the student enrolling in the course.
 * @param {string} paymentMethod - The payment method used for enrollment.
 * @returns {Promise<Object>} The newly created enrollment document.
 * @throws {Error} Throws an error if the enrollment creation fails.
 */
export async function enrollForCourse(courseId, userId, paymentMethod){
    const newEnrollment = {
        course: courseId,
        student: userId,
        method: paymentMethod,
        enrollment_date: Date.now(),
        status: 'not-started'
    }
    try {
        const response = await Enrollment.create(newEnrollment);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getEnrollmentForUser(userid){
    
    try {
        const enrollments = await Enrollment.find({ student: userid})
        .populate({
            path: "course",
            model: Course,
        }).lean();
        return replaceMongoIdInArray(enrollments);
    } catch (err) {
        throw new Error(err);
    }


}