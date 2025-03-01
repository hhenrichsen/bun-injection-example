import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  done: integer("done", { mode: "boolean" }).notNull().default(false),
});

export type TodoRecord = typeof todoTable.$inferSelect;
export type InsertTodoRecord = typeof todoTable.$inferInsert;
