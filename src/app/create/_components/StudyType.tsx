'use client'
import React, { useState } from 'react'
import Sreps from './Sreps'
import StudySelectionType from './StudyTypeSelection'
import { Button } from '@/components/ui/button'
import StudyTitleForm from './StudyTitleForm'
import { ArrowBigLeft, ArrowBigRight, FireExtinguisher, Loader } from 'lucide-react'
import { toast } from "sonner"
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'



const StudyType = () => {
      const [selectedType, setSelectedType] = useState<string | null>(null);
      const [step, setStep] = useState<number>(1)
      const [difficultyLevel, setDifficultyLevel] = useState<string|null >(null); // Ensuring type consistency
      const [topicTitle, setTopicTitle] = useState<string | null>(null); // Ensuring type consistency
      const {user:currentUser}= useUser()
      const [loading, setLoading] = useState<boolean>(false)
      const [error, setError] = useState<any>(null)
      const router=useRouter()
    

      const handleNextClick=()=>{
        if(step==1&&selectedType){
            setStep(step+1)
        }
      }
      const handlePreviousClick=()=>{
        if(step>1){
            setStep(step-1)
            setDifficultyLevel("")
            setTopicTitle("")
        }
      
      }

      const generateCourse = async() => {
        const missingFields = [];
        if (step === 2) {
      
          if (!topicTitle) missingFields.push("Topic Title");
          if (!difficultyLevel) missingFields.push("Difficulty Level");
          if (!selectedType) missingFields.push("Course Type");
      
          if (missingFields.length > 0) {
            toast.error(`Please fill the required fields: ${missingFields.join(", ")}`);
            return;
          }
      
          // console.log(selectedType, topicTitle, step, difficultyLevel);
          // alert("yes")
        }
        if(step==2 && missingFields.length==0){
          setLoading(true);
          try {
            const response=await axios.post('/api/course-creation',{
              courseId:uuidv4(),
              courseType:selectedType,
              courseTitle:topicTitle,
              difficultyLevel:difficultyLevel,
              createdBy:currentUser?.emailAddresses[0]?.emailAddress ?? "",
  
              
  
  
              
            })
            console.log('The api response in method ' + response.data)
            toast.success('Course created successfully!')
            router.push(`/dashboard`)

            
          } catch (error) {
            setLoading(false)
            if(error instanceof Error){
              setError(error.message)
            }
            else{
              setError('An error occurred while trying to create the course')
            }
            
          }finally{
            setLoading(false)
          }
          
          // const {courseId,courseType,courseTitle,difficultyLevel,createdBy}=await req.json();

       
        }
      };
      
    
  return (
    <div>
    <div className='flex relative flex-col items-center justify-center gap-3'>

        <h1 className='text-2xl font-semibold'>Select the type of course that you need ! 🔥</h1>
        <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptatem voluptatibus explicabo nihil ut officia, perspiciatis incidunt quae dolorem iure, nam recusandae, et dolore corrupti mollitia sint alias voluptatum? Voluptatum?
        </p>

        {
            step==1?
            <StudySelectionType
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            step={step}
            // setStep={setStep}
    
            />:
            <StudyTitleForm
            difficultyLevel={difficultyLevel}
            setDifficultyLevel={setDifficultyLevel}
            topicTitle={topicTitle}
            setTopicTitle={setTopicTitle}
          />
        }
       
    <div className='flex justify-between items-center w-full '>
       {step>1? <Button className='text-white'
       onClick={()=>handlePreviousClick()}
       >
           <ArrowBigLeft/>    Previous
        </Button>:<span></span>}
      {
        !difficultyLevel&&!topicTitle?
        <Button className={`text-white md:w-28 ${step>1?"hidden":""}`} disabled={!selectedType}
        onClick={handleNextClick}
        >
        Next    <ArrowBigRight/>  
        </Button>
        :
          <Button className='text-white md:w-28' disabled={!selectedType||loading}
          onClick={generateCourse}

          >


<FireExtinguisher/>   {
  loading? <Loader className='animate-spin'/> : 'Generate'
}
              
    
          </Button>

      }
      {error&&<p className='text-sm text-red-500'>{error+" "}</p>}
       
    </div>

        {/* <Stud */}
      
    </div>
    <div className='absolute top-[200px]  lg:-left-64 -left-0  lg:block hidden '>
        <Sreps step={step}/>

        </div>
    </div>

  )
}

export default StudyType
