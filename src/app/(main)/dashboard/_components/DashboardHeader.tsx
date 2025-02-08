import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='flex justify-between items-center shadow-md p-2 border-b-2'>
        <h1 className='text-xl font-bold'>Hello , Kahii</h1>

      {/* Add your custom header components here */}
      <UserButton/>
    </div>
  )
}

export default DashboardHeader
