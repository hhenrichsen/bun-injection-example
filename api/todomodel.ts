import { z } from "zod";

export const TodoModelId = Symbol("TodoModelId");

export const TodoValidator = z.object({
  id: z.number(),
  title: z.string(),
  done: z.boolean(),
});

export type Todo = z.infer<typeof TodoValidator>;

export const CreateTodoValidator = z.object({
  title: z.string(),
  done: z.boolean().optional().default(false),
});

export type CreateTodo = z.infer<typeof CreateTodoValidator>;

export interface TodoModel {
  getTodoById(id: number): Promise<Todo | undefined>;
  getTodos(): Promise<Todo[]>;
  addTodo(todo: CreateTodo): Promise<Todo>;
}
