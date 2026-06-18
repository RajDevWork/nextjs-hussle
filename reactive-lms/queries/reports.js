import { replaceMongoIdInObject,replaceMongoIdInArray } from "@/lib/convertData";
import { Assessment } from "@/models/assessment.model";
import { Report } from "@/models/report.model";


export async function getReport(filter){

    // console.log("filter = ",filter)
    try {
        const report = await Report.findOne(filter)
        .populate({
            path: "quizAssessment",
            model: Assessment,
        }).lean();

         if (!report) {
            return null;
        }


        // console.log("report output = ",report)
        return replaceMongoIdInObject(report);
    } catch (error) {
        throw new Error(error);
    }
    
}