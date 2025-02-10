import React from "react";
import { Code, Book, FileText, Layers, PlayCircle, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

const icons = [Code, Book, FileText, Layers, PlayCircle, Bookmark];

const getRandomIcon = () => {
  const Icon = icons[Math.floor(Math.random() * icons.length)];
  return <Icon className="w-5 h-5 text-violet-600" />;
};

const ChapterList = ({ course }: { course: any }) => {
  const chapters = course?.data?.courseLayout?.chapters;

  return (
    <div className="mt-16">
      <div className="text-center pb-10">
        <h2 className="font-semibold text-3xl">Chapters you'll love</h2>
        <p className="max-w-md mx-auto mt-2 text-gray-500">
          A responsive documentation template built for everyone who wants to create a plugin.
        </p>
      </div>

      <div
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-lg border bg-background p-6 md:shadow-xl"
        )}
      >
        <AnimatedList>
          {chapters?.map((item: any, idx: any) => (
            <figure
              key={idx}
              className={cn(
                "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-4",
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                "bg-white shadow-md dark:bg-transparent dark:backdrop-blur-md dark:border dark:border-white/10"
              )}
            >
              <div className="flex flex-row items-center gap-3">
                {/* Icon Box with Background */}
                <div className="flex size-10 items-center justify-center rounded-full bg-violet-500/10 p-3">
                  {getRandomIcon()}
                </div>

                <div className="flex flex-col w-full">
                  <figcaption className="flex flex-row items-center text-lg font-medium dark:text-white">
                    <span className="text-sm sm:text-lg">{item?.chapterTitle}</span>
                    <span className="mx-1">·</span>
                    <span className="text-xs text-gray-500">11:00 AM</span>
                  </figcaption>

                  {/* Fixed Height for Summary (Max 3 Lines) */}
                  <p className="mt-1 text-sm text-gray-500 dark:text-white/60 line-clamp-3">
                    {item?.chapterSummary}
                  </p>
                </div>
              </div>
            </figure>
          ))}
        </AnimatedList>
      </div>
    </div>
  );
};

export default ChapterList;
