import { SignedIn, SignedOut, SignInButton, SignUp, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const ContactPage = () => {
    return (
        <div>
         

          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda corrupti, dolorem voluptate odio optio minima cumque dolores eveniet exercitationem molestiae. Quaerat facere nihil praesentium repudiandae deserunt delectus, dicta at recusandae.
          <SignedIn>
            <UserButton />
          </SignedIn>
         
          <SignedOut>
                <SignInButton />
                {/* <SignUpButton /> */}
            </SignedOut>
        </div>
    )
}

export default ContactPage
