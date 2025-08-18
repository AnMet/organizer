export const TodoStatus = {
  doing: "doing",
  urgent: "urgent",
  next: "next",
  later: "later",
  done: "done",
} as const;

export const statusOrder = {
  doing: 1,
  urgent: 2,
  next: 3,
  later: 4,
  done: 5,
};

export type TodoStatusType = keyof typeof TodoStatus;

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: TodoStatusType;
  created_at: string;
  updated_at: string;
}
