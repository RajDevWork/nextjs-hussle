import { replaceMongoIdInArray,replaceMongoIdInObject } from "@/lib/convertData";
import { Category } from "@/models/category.model";

/**
 * Fetches all available course categories from the database.
 *
 * This function retrieves every category document, converts the result
 * into plain JavaScript objects using `lean()` for better performance,
 * and replaces MongoDB `_id` fields with `id` for frontend compatibility.
 *
 * @async
 * @returns {Promise<Array<Object>>} An array of formatted category objects.
 */
export async function getCategories() {
    const categories = await Category.find({}).lean();
    return replaceMongoIdInArray(categories);
}

/**
 * Fetches the details of a single category by its ID.
 *
 * The function retrieves the category document, converts it into a plain
 * JavaScript object using `lean()`, and replaces the MongoDB `_id` field
 * with `id` before returning the result.
 *
 * @async
 * @param {string} categoryId - The MongoDB ObjectId of the category.
 * @returns {Promise<Object>} The formatted category object.
 * @throws {Error} Throws an error if the category cannot be retrieved.
 */
export async function getCategoryDetails(categoryId) {
    try {
        const category = await Category.findById(categoryId).lean();
        return replaceMongoIdInObject(category);
    } catch (error) {
        throw new Error(error);
    }
}