export type TodoStatus = "later" | "next" | "urgent" | "doing" | "done";

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  created_at: string;
  updated_at: string;
}
