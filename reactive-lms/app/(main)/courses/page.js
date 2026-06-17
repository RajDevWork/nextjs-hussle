// import { CourseProgress } from "@/components/course-progress";

import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import FilterCourseMobile from "./_components/FilterCourseMobile";
import ActiveFilters from "./_components/ActiveFilters";
import FilterCourse from "./_components/FilterCourse";
import CourseCard from "./_components/CourseCard";
import { getCourseList } from '@/queries/courses';

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const PRICE_OPTIONS = [
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  options: [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ],
};

const CATEGORY_OPTIONS = [
  {
    id: 1,
    label: "Design",
    value: "design",
  },

  {
    id: 3,
    label: "Development",
    value: "development",
  },
  {
    id: 4,
    label: "Marketing",
    value: "marketing",
  },
  {
    id: 5,
    label: "IT & Software",
    value: "it-software",
  },
  {
    id: 6,
    label: "Personal Development",
    value: "personal-development",
  },
  {
    id: 7,
    label: "Business",
    value: "business",
  },
  {
    id: 8,
    label: "Photography",
    value: "photography",
  },
  {
    id: 9,
    label: "Music",
    value: "music",
  },
];

const CoursesPage = async () => {
  const courses = await getCourseList()
  

  return (

    <section
      id="courses"
      className="container mx-auto px-4 md:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-center lg:justify-between">
        
        <div className="w-full lg:max-w-md">
          <SearchCourse />
        </div>

        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortCourse SORT_OPTIONS={SORT_OPTIONS} />

          <FilterCourseMobile
            PRICE_OPTIONS={PRICE_OPTIONS}
            CATEGORY_OPTIONS={CATEGORY_OPTIONS}
          />
        </div>
      </div>

      {/* Active Filters */}
      <div className="mt-4">
        <ActiveFilters />
      </div>

      {/* Content */}
      <section className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 h-fit sticky top-24">
            <FilterCourse
              CATEGORY_OPTIONS={CATEGORY_OPTIONS}
              PRICE_OPTIONS={PRICE_OPTIONS}
            />
          </aside>

          {/* Courses */}
          <div className="lg:col-span-3">
            {courses?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed">
                <p className="text-muted-foreground">
                  No courses found.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>
    </section>
  );
};
export default CoursesPage;
