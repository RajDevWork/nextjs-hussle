import Image from "next/image";
import React from "react";
import Link from "next/link";

import { ArrowRight, BookOpen } from "lucide-react";

import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import EnrollCourse from "@/components/enroll-course";

const CourseCard = ({course}) => {
   
    return (
            <div className="group flex flex-col h-full rounded-2xl border bg-background overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  
  <Link href={`/courses/${course.id}`}>
    <div className="relative overflow-hidden">
      <div className="relative w-full aspect-video">
        <Image
          src={`/assets/images/courses/${course?.thumbnail}`}
          alt={course?.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute top-3 left-3">
        <span className="rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-medium">
          {course?.category?.title}
        </span>
      </div>
    </div>

    <div className="flex flex-col flex-1 p-4">
      <h3 className="font-semibold text-lg leading-snug line-clamp-2 transition-colors group-hover:text-sky-600">
        {course?.title}
      </h3>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <BookOpen className="w-4 h-4" />
        <span>
          {course?.modules?.length || 0} Chapters
        </span>
      </div>
    </div>
  </Link>

  <div className="mt-auto border-t px-4 py-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xl font-bold">
          {formatPrice(course?.price)}
        </p>
      </div>

      <EnrollCourse
        asLink={true}
        courseId={course?.id}
      />
    </div>
  </div>
</div>
        );
      
};

export default CourseCard;