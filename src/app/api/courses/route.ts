import { StudyMaterialTable } from "@/configs/schemas/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db/db";

export async function GET(req: NextRequest) {
  try {
    // Fetch the current user based on Clerk's authentication
    //    const { userEmail } = req.query;
    // Parse the query parameters from the request URL
    const url = new URL(req.url);
    const userEmail = url.searchParams.get('userEmail');

    // If no userEmail is provided, return an error
    if (!userEmail) {
      return NextResponse.json(
        { status: 'error', message: 'User email is required.' },
        { status: 400 }
      );
    }

    // const user = await currentUser();
    console.log('yes we are here in courses route')

 

    // const userEmail =  user?.emailAddresses[0]?.emailAddress ?? ""

    //  user.emailAddresses[0]?.emailAddress; // Get the user's email from Clerk

    if (!userEmail) {
      return NextResponse.json({ status: "error", message: "User email not found." }, { status: 400 });
    }

    // Fetch the courses from the database using the user's email
    const courses = await db
      .select()
      .from(StudyMaterialTable)
      .where(eq(StudyMaterialTable.createdBy, userEmail));

    //   console.log('There are courses', courses);

    // If no courses are found, return a success response with no data
    if (courses.length === 0) {
      return NextResponse.json({
        status: "success",
        message: "No courses found for this user.",
      });
    }

    // Return the courses data as JSON with caching headers
    const response = NextResponse.json({
      status: "success",
      data: courses,
    });

    // Cache the response for 1 hour
    // response.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    return response;
  } catch (error) {
    // Handle errors and return appropriate error response
    console.error("Error fetching courses:", error);
    return NextResponse.json({
      status: "error",
      message: "An error occurred while fetching courses.",
    }, { status: 500 });
  }
}
