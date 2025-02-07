import Footer from '@/components/custom/footer'
import Header from '@/components/custom/header'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Header/>
         <main className='min-h-screen'>
        {children}
         </main>
        <Footer/>
      
    </div>
  )
}

export default layout
