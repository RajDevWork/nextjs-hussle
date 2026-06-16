import { Tv } from 'lucide-react';
import React from 'react';
import { cn } from "@/lib/utils";
import { getLesson } from '@/queries/lessons';
const CourseLessionList = async({lessonId}) => {
    const allLessons = await getLesson(lessonId);
    // console.log("allLessons = ",allLessons)
    return (
        <>

            {/* item */}
            <button
                type="button"
                className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                )}
            >
                <div className="flex items-center gap-x-2">
                <Tv size={16} className={cn("text-slate-500")} />
               { allLessons.title }
                </div>
            </button>
            {/* item ends */}
            
        </>
    );
};

export default CourseLessionList;