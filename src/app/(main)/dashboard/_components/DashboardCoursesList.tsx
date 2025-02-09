import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CourseSkeleton from './CourseSkeleton'
import DashboardHeader from './DashboardHeader'
import RefreshButton from './RefreshButton'

const DashboardCoursesList = ({courses}:{courses:any}) => {
  return (
    <section>
        <RefreshButton/>
    <div className="grid md:grid-cols-3 gap-4 items-center my-1">
        
        
        {/* {
            courses.length === 0 && 
                <CourseSkeleton/>
            
        } */}

       {
        courses?.map((course:any,index:any)=>{
            return (
                <Link href={`/course/${course?.courseId}`} key={index} className='cursor-pointer'>
                    <Card>
                        <Image
                        src={'/banner.jpeg'}
                        width={300}
                        height={120}
                        alt='course image '
                        className='w-full object-cover '
                        />
                        <CardHeader>
                            <CardTitle>{course?.courseLayout?.courseTitle}</CardTitle>
                            <CardDescription>
                                <p className='text-sm py-2 max-h-[80px] minh-[80px] overflow-hidden w-full '>
                                    {course?.courseLayout?.courseSummary?.length>100?course.
                                    courseLayout?.courseSummary?.slice(0,90)+"...":
                                    course?.courseLayout?.courseSummary+"..."
                                    }
                                 
                                </p>
                                <Link href={'/'}
                                    className='text-blue-800'
                                    >
                                    Read More
                                    </Link>
                                    <Progress value={30} className='mt-3'/>
                                    {
                                        course?.status==="Generating"&&
                                        <div className='flex justify-end items-center  pt-2'>
                                        <RefreshCcw className='animate-spin text-white w-6 h-6 text-right'
                                          />
                                        </div>
                                    }
                               
                            </CardDescription>
                        </CardHeader>
                    </Card>

                </Link>
  
            )
        })

       
       }


       </div>
       {
            courses?.length === 0 &&
            <div className='flex justify-center items-center'>
                <CourseSkeleton />
            </div>
        }

       
      
    </section>
  )
}

export default DashboardCoursesList
