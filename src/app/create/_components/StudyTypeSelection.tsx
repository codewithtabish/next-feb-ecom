"use client";

import { useState, useRef, useEffect } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons

const studyTypes = [
  { title: "Coding", image: "https://picsum.photos/seed/coding/90/78" },
  { title: "Job Interview", image: "https://picsum.photos/seed/interview/90/78" },
  { title: "Design", image: "https://picsum.photos/seed/design/90/78" },
  { title: "Marketing", image: "https://picsum.photos/seed/marketing/90/78" },
  { title: "Finance", image: "https://picsum.photos/seed/finance/90/78" },
  { title: "Data Science", image: "https://picsum.photos/seed/datascience/90/78" },
  { title: "Writing", image: "https://picsum.photos/seed/writing/90/78" },
  { title: "Public Speaking", image: "https://picsum.photos/seed/speaking/90/78" },
  { title: "Entrepreneurship", image: "https://picsum.photos/seed/entrepreneur/90/78" },
  
];

interface StudySelectionTypeProps{
    selectedType:string|null,
    setSelectedType:(type:string|null)=>void,
    step:number,
    setStep:(type:number)=>void,
} 

export default function StudySelectionType({
    selectedType,
    setSelectedType,
    step,
    setStep,
}:StudySelectionTypeProps) {
//   const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>(
    Object.fromEntries(studyTypes.map((item) => [item.title, true]))
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check if we can scroll left or right
  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    setCanScrollLeft(scrollRef.current.scrollLeft > 0);
    setCanScrollRight(
      scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth
    );
  };

  useEffect(() => {
    updateScrollButtons();
  }, []);

  // Scroll function
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 150;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };


  const handleStudyType=(title:string)=>{
    setSelectedType(title);
    selectedType==title?setSelectedType(""):setSelectedType(title);
    // setStep(3);
    // step==1&&setStep(step+1)
    console.log(selectedType,step)
    // alert(selectedType+""+step+"")

  }





  return (
    <section id="study-types" className="w-full p-4 relative md:min-h-[200px] max-h-[200px] ">
      {/* Left Button */}
      {canScrollLeft && (
        <button
          className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Scrollable Study Type List */}
      <div
        ref={scrollRef}
        onScroll={updateScrollButtons}
        className="flex gap-4 overflow-x-hidden overflow-hidden scroll-smooth px-4 scrollbar-hidden"
      >
        {studyTypes.map((item, idx) => (
          <BlurFade
            className="cursor-pointer flex flex-col items-center min-w-[100px] space-y-2"
            key={item.title}
            delay={0.25 + idx * 0.05}
            inView
          >
            <div
            onClick={()=>handleStudyType(item.title)}
            //   onClick={() => setSelectedType(item.title)}
              className={clsx(
                "rounded-lg overflow-hidden transition-all border-2 flex flex-col items-center",
                selectedType === item.title
                  ? "border-blue-500 shadow-lg scale-105 p-3"
                  : "border-transparent"
              )}
            >
              {loading[item.title] && (
                <div className="w-20 h-20 bg-gray-300 animate-pulse" />
              )}
              <Image
                className="w-20 h-20 object-cover"
                src={item.image}
                alt={item.title}
                width={90}
                height={78}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" 
                onLoad={() =>
                  setLoading((prev) => ({ ...prev, [item.title]: false }))
                }
              />
              <span className="text-[10px] font-medium text-center mt-2">{item.title}</span>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Right Button */}
      {canScrollRight && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2"
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </section>
  );
}
