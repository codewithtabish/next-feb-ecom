import React from 'react'
import StudyType from './_components/StudyType'

const CreatePage = () => {
  return (
    <div>
          <div className="grid-background"></div>
          <div className='flex relative flex-col lg:max-w-2xl md:text-2xl w-full mx-auto items-centers h-full p-5  justify-center
           min-h-screen'>
       
        <StudyType/>
        <div className='absolute  lg:-left-64 -left-0  lg:block hidden '>
        {/* <Sreps/> */}

        </div>

          </div>
      
    </div>
  )
}

export default CreatePage
