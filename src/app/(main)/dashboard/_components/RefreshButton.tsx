import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server';
import { RefreshCcwDotIcon } from 'lucide-react'
import React from 'react'

const RefreshButton = () => {

    async function fetchCourses() {
        try {
          const user = await currentUser();
          const userEmail = user?.emailAddresses[0]?.emailAddress ?? "";
      
          if (!userEmail) {
            throw new Error("User email not found.");
          }
      
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses?userEmail=${encodeURIComponent(userEmail)}`, {
            cache: "no-cache",
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch courses.");
          }
      
          const data = await response.json();
      
          if (data.status !== "success") {
            throw new Error(data.message || "Error fetching courses data");
          }
      
          return data; // Return the fetched courses
      
        } catch (error) {
          console.error("Error fetching courses:", error);
          return null; // Return null in case of an error
        }
      }
      
  return (
       <div className='flex justify-between items-center px-5 mt-5 '>
        <span></span>

      <Button className='' variant={'outline'}>
        <RefreshCcwDotIcon/>
      </Button>
    </div>
  )
}

export default RefreshButton
