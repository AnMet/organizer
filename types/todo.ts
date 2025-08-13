export const TodoStatus = {
  later: "later",
  next: "next",
  urgent: "urgent",
  doing: "doing",
  done: "done",
} as const;

export type TodoStatusType = (typeof TodoStatus)[keyof typeof TodoStatus];

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: TodoStatusType;
  created_at: string;
  updated_at: string;
}
