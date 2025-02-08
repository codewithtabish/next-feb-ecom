import { db } from "@/configs/db/db";
import { courseOutlineMethod } from "@/configs/models/ai-model";
import { StudyMaterialTable } from "@/configs/schemas/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { courseId, courseType, courseTitle, difficultyLevel, createdBy } = await req.json();
    const PROMPT = `Generate a study material for ${courseTitle} for ${courseType} and level of ${difficultyLevel} will be EASY with summary of course, list of chapters along with summary for each chapter, Topic list in each chapter, all result in json format`;

    try {
        const response1 = await courseOutlineMethod.sendMessage(PROMPT);
        const aiText = response1.response.text();

        console.log("Raw AI Response:", aiText);

        let aiResult;
        try {
            aiResult = JSON.parse(aiText);
        } catch (err) {
            console.error("JSON Parsing Error:", err);
            return NextResponse.json({ status: "error", message: "Invalid JSON response from AI" }, { status: 500 });
        }

        const dbResult = await db.insert(StudyMaterialTable).values({
            courseId,
            courseType,
            difficultyLevel,
            topic: courseTitle,
            createdBy,
            courseLayout: aiResult
        }).returning({ id: StudyMaterialTable.id });

        console.log("DB Results:", dbResult[0]);

        return NextResponse.json({
            status: "success",
            dbData: dbResult
        });

    } catch (error) {
        console.error("Unexpected Error:", error);
        return NextResponse.json({ status: "error", message: "An error occurred while creating and saving the course" }, { status: 500 });
    }
}
