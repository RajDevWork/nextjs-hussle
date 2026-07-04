/**
 * This function handles the file upload process for a course thumbnail. It receives a POST request containing the file and destination path, saves the file to the specified location, and updates the corresponding course with the new thumbnail information.
 * @param {Request} request - The incoming request object containing the file and destination data.
 * @param {Response} response - The response object used to send back the result of the upload operation.
 * * This function is designed to be used in a server-side context, as indicated by the "use server" directive at the top of the file. It handles errors by returning an appropriate response with a status code and error message if any issues occur during the file upload or course update process.
 * 
 */
import { NextResponse } from "next/server";
import fs from 'fs';
import { pipeline } from "stream"; 
import { promisify } from "util";
import { updateCourse } from "@/app/actions/course";

// Promisify the pipeline function for easier async/await usage
const pump = promisify(pipeline);

// This function handles the POST request for file uploads. It extracts the file and destination from the request, saves the file to the specified location, and updates the course with the new thumbnail information.
export async function POST(request, response) {
    try {
        const formData = await request.formData();
        const file = formData.get("files");
        const destination = formData.get("destination");

        if (!destination) {
            return new NextResponse("Destination not provided",{
                status: 500,
            });
        }

        const filePath = `${destination}/${file.name}`;// Construct the full file path for saving the uploaded file
        await pump(file.stream(), fs.createWriteStream(filePath)); // Save the file to the specified destination

        const courseId = formData.get("courseId");
        await updateCourse(courseId, {thumbnail: file.name});

        return new NextResponse(`File ${file.name} uploaded successfully  `, {
            status:200,
        });

    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        })
    }
}