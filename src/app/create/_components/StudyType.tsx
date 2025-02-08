'use client'
import React, { useState } from 'react'
import Sreps from './Sreps'
import StudySelectionType from './StudyTypeSelection'
import { Button } from '@/components/ui/button'
import StudyTitleForm from './StudyTitleForm'
import { ArrowBigLeft, ArrowBigRight, FireExtinguisher } from 'lucide-react'
import { toast } from "sonner"


const StudyType = () => {
      const [selectedType, setSelectedType] = useState<string | null>(null);
      const [step, setStep] = useState<number>(1)
      const [difficultyLevel, setDifficultyLevel] = useState<string|null >(null); // Ensuring type consistency
      const [topicTitle, setTopicTitle] = useState<string | null>(null); // Ensuring type consistency
    

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

      const generateCourse = () => {
        if (step === 2) {
          const missingFields = [];
      
          if (!topicTitle) missingFields.push("Topic Title");
          if (!difficultyLevel) missingFields.push("Difficulty Level");
          if (!selectedType) missingFields.push("Course Type");
      
          if (missingFields.length > 0) {
            toast.error(`Please fill the required fields: ${missingFields.join(", ")}`);
            return;
          }
      
          console.log(selectedType, topicTitle, step, difficultyLevel);
          // alert("yes")
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
            setStep={setStep}
    
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
          <Button className='text-white md:w-28' disabled={!selectedType}
          onClick={generateCourse}
          >
        <FireExtinguisher/>   Generate
          </Button>

      }
       
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
