import { ENROLLMENT_DATA, getInstructorDashboardData } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getCourseDetails } from '@/queries/courses';

const enrollments = [
  {
    id: 1,
    date: "10 Nov 2022",
    student: {
      name: "John Doe",
      email: "Dp5kz@example.com",
      progress: "10%",
      quizMark: 80,
    },
  },
  {
    id: 1,
    date: "10 Nov 2022",
    student: {
      name: "John Smilga",
      email: "johnsmilga@gmail.com",
      progress: "80%",
      quizMark: 50,
    },
  },
];
const EnrollmentsPage = async ({params}) => {

    const {courseId} = await params;
    const course = await getCourseDetails(courseId)

    // console.log("course = ",course);

    const enrollmentData = await getInstructorDashboardData(ENROLLMENT_DATA)

    console.log("enrollmentData = ",enrollmentData)

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollments} />
    </div>
  );
};

export default EnrollmentsPage;
