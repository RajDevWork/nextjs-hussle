import { auth } from "@/auth";
import EnrollmentCourseCard from "../../components/EnrollmentCourseCard";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import { getEnrollmentForUser } from "@/queries/enrollments";

async function EnrolledCourses() {
	const session = await auth();
	if(!session?.user){
		redirect("/login");
	}

	//logged in user details
	const loggedInUser = await getUserByEmail(session?.user?.email);
	// console.log("loggedin User = ",loggedInUser);

	const enrollments = await getEnrollmentForUser(loggedInUser?.id);

	// console.log("enrollments", enrollments);


	return (
		<div className="grid sm:grid-cols-2 gap-6">

			{
			enrollments && enrollments.length > 0 ? (
				<>
				{ enrollments.map((enrollment) => (
					<EnrollmentCourseCard key={enrollment?.id} enrollment={enrollment}  />
				))}
				</>

			) : (
				<p className="font-bold text-red-700">No Enrollments found!</p>
			)
		}

		</div>
	);
}

export default EnrolledCourses;
