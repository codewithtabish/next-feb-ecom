import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

 const Users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkUserId:varchar().notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isMember:boolean().default(false)
});



export  {
    Users

}