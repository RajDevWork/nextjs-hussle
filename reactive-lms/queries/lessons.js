import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "../models/lesson.model";


/**
 * Retrieves a lesson by its ID from the database and returns
 * a plain JavaScript object with the MongoDB `_id` field replaced
 * by a more convenient `id` field.
 *
 * @param {string} lessonId - The MongoDB ID of the lesson.
 * @returns {Promise<Object|null>} The formatted lesson object, or `null` if no lesson is found.
 */

export async function getLesson(lessonId){
    const lesson = await Lesson.findById(lessonId).lean();
    return replaceMongoIdInObject(lesson);
}

export async function create(lessonData) {
    try {
        const lesson = await Lesson.create(lessonData);
        return JSON.parse(JSON.stringify(lesson));
    } catch (error) {
        throw new Error(error);
    }
}