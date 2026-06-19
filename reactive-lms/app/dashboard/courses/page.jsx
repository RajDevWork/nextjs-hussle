import { getInstructorDashboardData } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ObjectId } from "mongoose";
const courses = [
  {
    id: 1,
    title: "Reactive Accelerator",
    price: 49,
    isPublished: true,
  },
  {
    id: 2,
    title: "Think In A Redux Way",
    price: 10,
    isPublished: false,
  },
];
const CoursesPage = async () => {

  const courses = sanitizeData(await getInstructorDashboardData());
  // console.log("courses = ",courses);


  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <DataTable columns={columns} data={courses} />
    </div>
  );
};



/**
 * MongoDB data ko Client Components ke liye safe banata hai.
 *
 * Problem:
 * MongoDB/Mongoose ObjectId, Buffer, aur kuch special objects
 * directly Next.js Client Components ko pass nahi kiye ja sakte.
 * Isse error aata hai:
 *
 * "Only plain objects can be passed to Client Components"
 *
 * Solution:
 * - ObjectId -> String
 * - Buffer -> Base64 String
 * - Baaki data ko JSON serialize karke plain JS object banaya jata hai.
 *
 * Use Case:
 * Server Component / Server Action se data Client Component
 * ko bhejne se pehle sanitize karne ke liye.
 */
function sanitizeData(data) {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (value instanceof ObjectId) {
          return value.toString();
      }
      if (Buffer.isBuffer(value)) {
        return value.toString("base64")
      }
      return value;
    })
  );
}



export default CoursesPage;
