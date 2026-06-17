import { Button } from "@/components/ui/button";
import { CircleCheck, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const Success = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        {/* Success Icon */}
        <div className="relative mx-auto w-fit">
          <div className="absolute inset-0 bg-green-500/30 blur-3xl rounded-full" />
          <CircleCheck className="relative h-32 w-32 text-green-500 mx-auto" />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-4xl md:text-5xl font-bold tracking-tight">
          Enrollment Successful 🎉
        </h1>

        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          Congratulations! Your enrollment has been confirmed and you now have
          full access to the course. Start learning and take the next step in
          your journey.
        </p>

        {/* Small Info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>Course added to your learning dashboard</span>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          size="lg"
          className="h-12 px-8 text-base font-medium hover:scale-105 active:scale-95"
        >
          <Link href="/account/enrolled-courses" className="flex gap-1 items-center">
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="h-12 px-8 text-base hover:scale-105 active:scale-95"
        >
          <Link href="/courses">
            Explore More Courses
          </Link>
        </Button>
      </div>
      </div>
    </div>
  );
};

export default Success;