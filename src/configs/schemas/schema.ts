import { boolean, integer, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

 const Users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkUserId:varchar().notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isMember:boolean().default(false)
});


const StudyMaterialTable= pgTable("StudyMaterial",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
courseId:varchar().notNull(),
courseType: varchar().notNull(),
difficultyLevel:varchar().default("Easy"),
topic: varchar().notNull(),
courseImage: varchar(),
courseLayout:json(),
status: varchar().default("Generating"),
createdBy: varchar().notNull(),




})



 const CourseChapters=pgTable("CourseChapters",{
  id:serial().primaryKey(),
  courseId:varchar().notNull(),
  chapterId:integer().notNull(),
  notes:text()
})

export  {
    Users,
    StudyMaterialTable,
    CourseChapters,  // Add your other tables here...

}