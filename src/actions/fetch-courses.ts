import { db } from "@/configs/db/db";
import { StudyMaterialTable } from "@/configs/schemas/schema";
import { eq } from "drizzle-orm";

// Function to fetch courses based on the user's email
const fetchCourses = async (userEmail: string) => {
  try {
    // Attempting to fetch data from the database
    const courses = await db
      .select()
      .from(StudyMaterialTable)
      .where(eq(StudyMaterialTable.createdBy,userEmail));

    // Returning the fetched courses
    if (courses.length === 0) {
      return { status: "success", message: "No courses found for this user." };
    }

    return { status: "success", data: courses };
  } catch (error: unknown) {
    // Type assertion to assert that the error is an instance of Error
    if (error instanceof Error) {
      // Logging the error message for debugging purposes
      console.error("Error fetching courses:", error.message);

      // Returning a structured error response
      return {
        status: "error",
        message: error.message || "An error occurred while fetching courses.",
      };
    } else {
      // Handling unknown error types (non-Error objects)
      console.error("Unknown error:", error);

      // Returning a generic error message
      return {
        status: "error",
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

export default fetchCourses;
