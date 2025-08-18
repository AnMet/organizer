import { defineStore } from "pinia";
import { type Todo } from "../types";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    addTodo(todo: Todo) {
      this.todos.push(todo);
    },
    updateTodo(updated: Partial<Todo> & { id: string }) {
      const todo = this.todos.find((t) => t.id === updated.id);
      if (todo) {
        Object.assign(todo, updated);
        todo.updated_at = new Date().toISOString();
      }
    },
    removeTodo(id: string) {
      this.todos = this.todos.filter((t: Todo) => t.id !== id);
    },
  },
});
