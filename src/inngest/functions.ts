import { db } from "@/configs/db/db";
import { inngest } from "./client";
import { CourseChapters, StudyMaterialTable, Users } from "@/configs/schemas/schema";
import { eq } from "drizzle-orm";
import { generateNotesAIModel } from "@/configs/models/ai-model";

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


        const result = await step.run("check user and create new user", async () => {
            try {
                const logginedUser = await db
                    .select()
                    .from(Users)
                    .where(eq(Users.clerkUserId, user?.id))
                    .execute();


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
                console.error("Error during user processing:", error);
                // throw new Error("Error while processing the user.");
            }
        });

        return result;
    }
);



// generate notes for each  course chapter

export const generateNotesForChapters=inngest.createFunction(
    
    {id:"generateNotesForChapters"},
    {event: "courses.generateNotes"},
    async ({event,step})=>{
        const {course}=event.data
        const notes=await step.run("gnerate notes for chapters",async()=>{
            if(!course){
                console.log('The course is not available')
                return
            }
            const chapters=course?.courseLayout?.chapters 
            if(!chapters || chapters.length==0){
                return
            }
            chapters?.map(async(chapter:any,index:any)=>{
                const PRMOT=`Generate exam material detail content for each chapter ,Make sure to include all topic point in the content , make sure to give content in html format(Do not add HTMLKL, Head, body, title tag),The chapters :`+JSON.stringify(chapter)

                const result = await generateNotesAIModel.sendMessage(PRMOT)
                const notesResponse=result.response.text()
                // now it is the time to save the related chapter notes in DB
                const dbResponse=await db.insert(CourseChapters)
                .values({
                    chapterId:index,
                    courseId:course.courseId,
                    notes:notesResponse

                })



            })
            return "notes generated successfully"

        })
        // update status to ready 
        const updateCoursesStatus=await step.run("UpdateCourseStatus to ready state",async()=>{

        const dbUpdateStatus=  await db.update(StudyMaterialTable)
        .set({status:"Ready"})
        .where(eq(StudyMaterialTable.courseId,course?.courseId))

        })
        return 'Updated successfully the course material status'
        
    }





)
