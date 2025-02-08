import React from 'react'
import DashboardCoursesList from './_components/DashboardCoursesList'
import { currentUser } from '@clerk/nextjs/server';
import CourseSkeleton from './_components/CourseSkeleton';

const DashboardPage = async() => {
  const user = await currentUser();

  const userEmail =  user?.emailAddresses[0]?.emailAddress ?? ""

  let data:any
try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses?userEmail=${encodeURIComponent(userEmail)}`,{
    cache:'no-cache',
  });

  // Check if the response was successful
  if (!response.ok) {
    throw new Error("Failed to fetch courses.");
  }

  // Parse the response data
   data = await response.json();

  // Check if the response contains the status of success
  if (data.status !== "success") {
    throw new Error(data.message || "Error fetching courses data");
  }
}catch (err:unknown) {
  console.error("Error fetching courses:", err);
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <p className='text-red-800 text-sm'>{err+" "}</p>
    </div>
  )

}
  return (
    <div>
      {
        !data||data?.data.length==0&&
        <CourseSkeleton/>
      }
      <DashboardCoursesList courses={data?.data}/>
      
    </div>
  )
}

export default DashboardPage
