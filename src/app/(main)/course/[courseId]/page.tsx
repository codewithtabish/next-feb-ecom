import { ArrowBigLeft } from "lucide-react";
import ChapterList from "../_components/chapter-list";
import CourseIntroCard from "../_components/course-intro-card";
import MaterialCard from "../_components/material-card";
import BackButton from "@/components/custom/back-button";
// import { useRouter } from "next/router";

export default async function Page({
    params,
  }: {
    // @ts-ignore
    params: { courseId: string }
  }) {
        // @ts-ignore

    const courseId = params.courseId;
        // @ts-ignore

    let courseData = null;
    // const router=useRouter()
        // @ts-ignore

  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/course-creation?courseId=${encodeURIComponent(courseId)}`);
  
      if (!response.ok) throw new Error("Failed to fetch course data");
      courseData = await response.json();
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  
    return (
      <div>
              <div className="grid-background"></div>

             <BackButton/>


        {/* <h1>Course Details</h1> */}

        {courseData ? (
            <section 
            className="max-w-4xl mx-auto md:py-24"
            >
            <CourseIntroCard  course={courseData?.data}/>
            <MaterialCard/>
            <ChapterList course={courseData}/>
          {/* <pre>{JSON.stringify(courseData, null, 2)}</pre> */}
            </section>
        ) : (
            <div className="flex min-h-screen justify-center items-center">

                <p className="text-red-900">Error loading course data.</p>
            </div>
        )}
      </div>
    );
  }
  