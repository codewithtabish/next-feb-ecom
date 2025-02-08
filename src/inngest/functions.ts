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

        console.log("Received user data:", user); // Log the incoming user data

        const result = await step.run("check user and create new user", async () => {
            try {
                console.log("Checking for existing user in database...");
                const logginedUser = await db
                    .select()
                    .from(Users)
                    .where(eq(Users.clerkUserId, user?.id))
                    .execute();

                console.log("User found in database:", logginedUser); // Log the result from the DB query

                if (logginedUser.length > 0) {
                    return logginedUser[0];
                }

                const name = `${user.firstName} ${user.lastName}`;
                console.log("Creating new user with name:", name);
                const newUser = await db.insert(Users).values({
                    name: name,
                    clerkUserId: user.id,
                    email: user.emailAddresses[0]?.emailAddress ?? "",
                }).returning({ id: Users.id });

                console.log("New user created:", newUser); // Log the new user details

                return newUser[0];
            } catch (error) {
                console.error("Error during user processing:", error);
                // throw new Error("Error while processing the user.");
            }
        });

        console.log("Function result:", result); // Log the result of the step.run
        return result;
    }
);
