import { db } from "@/configs/db/db"
import { Users } from "@/configs/schemas/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export const checkUser=async()=>{
    const user=await currentUser()
    if(!user){
        return
    }
    try {
        const logginedUser=await db.select().from(Users)
        .where(eq(Users.clerkUserId,user?.id)).execute()
          // Using the clerkUserId column properly
          if(logginedUser.length>0){
            return logginedUser[0]
          }
          const name = `${user.firstName} ${user.lastName}`;
          const newUser=await db.insert(Users).values({
            name: name,
            clerkUserId:user.id,
            email: user.emailAddresses[0]?.emailAddress ?? "",

          }).returning({id:Users.id});
          
          return newUser


        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message)

        }else{
            throw new Error("Something went wrong")
        }
        
    }

}