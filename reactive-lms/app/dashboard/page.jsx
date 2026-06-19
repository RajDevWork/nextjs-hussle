import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
formatPrice;
import { auth } from '@/auth';
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import {
  BookOpen,
  Users,
  DollarSign,
} from "lucide-react";

const DashboardPage = async () => {
  const session = await auth();
  if(!session?.user){
    redirect("/login")
  }
  //get user data
  // console.log("session = ",session);
  const instructor = await getUserByEmail(session?.user?.email)
  if(instructor?.role !=='instructor') return redirect("/login");

  const courseStatus = await getCourseDetailsByInstructor(instructor?.id);

  // console.log("courseStatus = ",courseStatus);

  return (
    <div className="p-6">

  {/* Hero Section */}
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 text-white">

    <div className="relative z-10">
      <p className="text-sm font-medium text-indigo-100">
        Welcome Back 👋
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        {courseStatus?.fullInsName}
      </h1>

      <p className="mt-2 text-indigo-100">
        Manage your courses, track enrollments and monitor revenue.
      </p>

      <div className="mt-5 flex flex-wrap gap-4 text-sm">
        <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
          📚 {courseStatus?.courses} Courses
        </div>

        <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
          👨‍🎓 {courseStatus?.enrollments} Enrollments
        </div>

        <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
          💰 {formatPrice(courseStatus?.revenue)}
        </div>
      </div>
    </div>

    {/* Decorative Circle */}
    <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
    <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />
  </div>

  {/* Stats Cards */}
  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

    {/* Total Courses */}
    <div className="rounded-2xl border bg-background p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Total Courses
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {courseStatus?.courses}
          </h2>
        </div>

        <div className="rounded-2xl bg-blue-100 p-4">
          <BookOpen className="h-7 w-7 text-blue-600" />
        </div>
      </div>

    </div>

    {/* Enrollments */}
    <div className="rounded-2xl border bg-background p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Total Enrollments
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {courseStatus?.enrollments}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-100 p-4">
          <Users className="h-7 w-7 text-green-600" />
        </div>
      </div>

    </div>

    {/* Revenue */}
    <div className="rounded-2xl border bg-background p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Total Revenue
          </p>

          <h2 className="mt-2 text-4xl font-bold text-emerald-600">
            {formatPrice(courseStatus?.revenue)}
          </h2>
        </div>

        <div className="rounded-2xl bg-emerald-100 p-4">
          <DollarSign className="h-7 w-7 text-emerald-600" />
        </div>
      </div>

    </div>

  </div>

</div>
  );
};

export default DashboardPage;
