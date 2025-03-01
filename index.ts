import { Hono } from "hono";
import { TodoController } from "./routes/todo";
import { MemoryTodoModel } from "./api/memorytodomodel";

const app = new Hono();

const todoModel = new MemoryTodoModel();
const controller = new TodoController(todoModel);

app.route("/todo", controller.router);
//asdfsadfsadfasdfasdfasdfsadfsadfasdf

export default {
  port: 3000,
  fetch: app.fetch,
};
