import React from 'react'
import DashboardSidebar from './_components/DashboardSidebar'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
    <div className="grid-background"></div>
    <div className='fixed md:w-64'>
        <DashboardSidebar/>
        </div>
        <div className='md:ml-64 p-4'>
        {children}

        </div>

      
    </div>
  )
}

export default DashboardLayout
