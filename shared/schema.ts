import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const urls = pgTable("urls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalUrl: text("original_url").notNull(),
  shortCode: varchar("short_code", { length: 8 }).notNull().unique(),
});

export const insertUrlSchema = createInsertSchema(urls).pick({
  originalUrl: true,
}).extend({
  originalUrl: z.string().url("Please enter a valid URL"),
  customShortCode: z.string()
    .optional()
    .refine((val) => !val || /^[a-zA-Z0-9]{3,20}$/.test(val), {
      message: "Custom code must be 3-20 alphanumeric characters"
    }),
});

export type InsertUrl = z.infer<typeof insertUrlSchema>;
export type Url = typeof urls.$inferSelect;
