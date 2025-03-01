import { eq } from "drizzle-orm";
import { db } from "..";
import type { CreateTodo, Todo, TodoModel } from "../../api/todomodel";
import { todoTable } from "../schema";

export class DatabaseTodoModel implements TodoModel {
  async getTodoById(id: number): Promise<Todo | undefined> {
    return db.query.todoTable.findFirst({
      where: eq(todoTable.id, Number(id)),
    });
  }

  async getTodos(): Promise<Todo[]> {
    return db.query.todoTable.findMany();
  }

  async addTodo(todo: CreateTodo): Promise<Todo> {
    const [result] = await db
      .insert(todoTable)
      .values(todo)
      .returning({
        id: todoTable.id,
        title: todoTable.title,
        done: todoTable.done,
      })
      .execute();
    return result;
  }
}
