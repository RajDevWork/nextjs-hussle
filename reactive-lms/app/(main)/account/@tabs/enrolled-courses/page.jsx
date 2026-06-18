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


	return (
		<div className="grid sm:grid-cols-2 gap-6">
			<EnrollmentCourseCard />
		</div>
	);
}

export default EnrolledCourses;
