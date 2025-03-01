import { Hono, type Context, type MiddlewareHandler } from "hono";
import {
  CreateTodoValidator,
  type CreateTodo,
  type TodoModel,
} from "../api/todomodel";
import { zValidator } from "@hono/zod-validator";

export class TodoController {
  public readonly router: Hono = new Hono();

  constructor(private readonly todoModel: TodoModel) {
    this.router.get("/", this.getTodos.bind(this));
    this.router.get("/:id", this.getTodoById.bind(this));
    this.router.post(
      "/",
      zValidator("json", CreateTodoValidator),
      this.addTodo.bind(this)
    );
  }

  async getTodos(ctx: Context) {
    const todos = await this.todoModel.getTodos();
    return ctx.json(todos);
  }

  async getTodoById(ctx: Context) {
    const id = ctx.req.param("id");
    const todo = await this.todoModel.getTodoById(Number(id));
    if (!todo) {
      return ctx.notFound();
    }
    return ctx.json(todo);
  }

  async addTodo(
    ctx: Context<
      any,
      any,
      { in: { json: CreateTodo }; out: { json: CreateTodo } }
    >
  ) {
    const todo = await this.todoModel.addTodo(ctx.req.valid("json"));
    return ctx.json(todo);
  }
}
