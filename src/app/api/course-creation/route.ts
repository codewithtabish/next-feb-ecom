import { db } from "@/configs/db/db";
import { courseOutlineMethod } from "@/configs/models/ai-model";
import { StudyMaterialTable } from "@/configs/schemas/schema";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { courseId, courseType, courseTitle, difficultyLevel, createdBy } = await req.json();
    const PROMPT = `Generate a study material for ${courseTitle} for ${courseType} and level of ${difficultyLevel} will be EASY with summary of course, list of chapters along with summary for each chapter, Topic list in each chapter, all result in json format`;

    try {
        const response1 = await courseOutlineMethod.sendMessage(PROMPT);
        const aiText = response1.response.text();


        let aiResult;
        try {
            aiResult = JSON.parse(aiText);
        } catch (err) {
            return NextResponse.json({ status: "error", message: "Invalid JSON response from AI" }, { status: 500 });
        }


        const dbResult = await db.insert(StudyMaterialTable).values({
            courseId,
            courseType,
            difficultyLevel,
            topic: courseTitle,
            createdBy,
            courseLayout: aiResult
        }).returning()

        // .returning({ courseId: StudyMaterialTable?.courseId });

        console.log('THE CREATED COURSE HERE IS again third',dbResult[0])
        
          
                if (dbResult[0]) {
                    const inngestUpdateCourseStatus = await inngest.send({
                        name: 'courses.generateNotes',
                        data: {
                            course: dbResult[0] // Send the first item
                        }
                    });
        
                    console.log('inngestUpdateCourseStatus', inngestUpdateCourseStatus);
                } 
             
        
        

        // const dbResult = await db.insert(StudyMaterialTable).values({
        //     courseId,
        //     courseType,
        //     difficultyLevel,
        //     topic: courseTitle,
        //     createdBy,
        //     courseLayout: aiResult
        // }).returning({ courseId: StudyMaterialTable.courseId });

        // if (dbResult.length > 0) {
        //     const createdCourse = await db.select().from(StudyMaterialTable)
        //     .where(eq(studyMaterialTable?.courseId,dbResult[0].courseId))
        // }

        // console.log("DB Results:", dbResult[0]);

        return NextResponse.json({
            status: "success",
            dbData: dbResult
        });

    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ status: "error", message: "An error occurred while creating and saving the course" }, { status: 500 });
    }
}
