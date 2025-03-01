import type { Todo } from "./todomodel";

export class MemoryTodoModel {
  private todos: Todo[] = [];

  async getTodoById(id: number): Promise<Todo | undefined> {
    return this.todos[id];
  }

  async getTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async addTodo(todo: Omit<Todo, "id">): Promise<Todo> {
    const newTodo = { ...todo, id: this.todos.length };
    this.todos.push(newTodo);
    return newTodo;
  }
}
