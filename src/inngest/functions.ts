import { db } from "@/configs/db/db";
import { inngest } from "./client";
import { Users } from "@/configs/schemas/schema";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },

);

// export const checkSaveAndSendUpdateEmailToUser=inngest.createFunction(
//     {id:"checkSaveAndSendUpdateEmailToUser"},
//     { event: "user.checkSaveAndSendUpdateEmailToUser" }, // Ensure this matches `checkUser` event

//     async ({event,step})=>{
//         const {user}=event.data;
//         // setp one is to first create the user in DB
//        const result=await step.run("check user and create new user",
//         async()=>{
//             if(!user){
//                 return
//             }
//             try {
//                 const logginedUser=await db.select().from(Users)
//                 .where(eq(Users.clerkUserId,user?.id)).execute()
//                   // Using the clerkUserId column properly
//                   if(logginedUser.length>0){
//                     return logginedUser[0]
//                   }
//                   const name = `${user.firstName} ${user.lastName}`;
//                   const newUser=await db.insert(Users).values({
//                     name: name,
//                     clerkUserId:user.id,
//                     email: user.emailAddresses[0]?.emailAddress ?? "",
        
//                   }).returning({id:Users.id});
                  
//                   return newUser[0]
        
        
                
//             } catch (error) {
//                 if(error instanceof Error){
//                     throw new Error(error.message)
        
//                 }else{
//                     throw new Error("Something went wrong")
//                 }
                
//             }
//             // return "success"

//         }
//        )
    
//     //    second step is to send welcome email
//     return result


//     }


// )



export const checkSaveAndSendUpdateEmailToUser = inngest.createFunction(
    { id: "checkSaveAndSendUpdateEmailToUser" },
    { event: "user.checkSaveAndSendUpdateEmailToUser" },
    async ({ event, step }) => {
        const { user } = event.data;
        if (!user) {
            throw new Error("No user data provided");
        }

        // Debugging: Log user data
        console.log("Received user:", user);

        const result = await step.run("check user and create new user", async () => {
            try {
                const logginedUser = await db
                    .select()
                    .from(Users)
                    .where(eq(Users.clerkUserId, user?.id))
                    .execute();

                // Debugging: Log database query result
                console.log("Logged in user result:", logginedUser);

                if (logginedUser.length > 0) {
                    return logginedUser[0];
                }

                const name = `${user.firstName} ${user.lastName}`;
                const newUser = await db.insert(Users).values({
                    name: name,
                    clerkUserId: user.id,
                    email: user.emailAddresses[0]?.emailAddress ?? "",
                }).returning({ id: Users.id });

                return newUser[0];
            } catch (error) {
                console.error("Error in database operation:", error);
                throw new Error("Error while processing the user.");
            }
        });

        // Debugging: Log final result
        console.log("Function result:", result);

        return result;
    }
);
