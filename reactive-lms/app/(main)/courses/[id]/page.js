import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import { getCourseDetails } from "@/queries/courses";

const SingleCoursePage = async ({params}) => {
  const {id} = await params; // version 14 and earlier me {params: {id}} working tha but version 15 me async ho gya hain.
  const course = await getCourseDetails(id);
  // console.log("params = ",id)
  // console.log("course = ",course)

  return (
    <>
      <CourseDetailsIntro />

      <CourseDetails />

      {/* Testimonials */}
      <Testimonials />
      {/* Releated Course */}
      <RelatedCourses />
    </>
  );
};
export default SingleCoursePage;
