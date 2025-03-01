import { Hono } from "hono";
import { TodoController } from "./routes/todo";
import { MemoryTodoModel } from "./api/memorytodomodel";

const app = new Hono();

const todoModel = new MemoryTodoModel();
const controller = new TodoController(todoModel);

// this is the todo route lol
app.route("/todo", controller.router);

// Every good server has a health check
app.get("/health", (c) => {
  return c.text("OK", 200);
});

export default {
  port: 3000,
  fetch: app.fetch,
};
