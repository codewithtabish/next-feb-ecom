import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const CourseSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 overflow-x-hidden gap-4">
      {Array(7)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="flex flex-col space-y-3 mx-3 my-3">
            <Skeleton className="h-[200px] w-[200px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default CourseSkeleton;
