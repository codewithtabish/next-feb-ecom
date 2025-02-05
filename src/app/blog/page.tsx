import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const BlogPage = () => {
    return (
        <div>
         

            <SignedOut>
                <SignInButton />
                {/* <SignUpButton /> */}
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}

export default BlogPage
