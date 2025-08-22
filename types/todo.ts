export const TodoStatus = {
  doing: "doing",
  urgent: "urgent",
  next: "next",
  later: "later",
  done: "done",
} as const;

export type TodoStatusType = keyof typeof TodoStatus;

export const statusOrder: Record<TodoStatusType, number> = {
  doing: 1,
  urgent: 2,
  next: 3,
  later: 4,
  done: 5,
};

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: TodoStatusType;
  created_at?: string;
  updated_at?: string;
}

export const statusColor: Record<TodoStatusType, string> = {
  [TodoStatus.doing]: "green",
  [TodoStatus.urgent]: "red",
  [TodoStatus.next]: "primary",
  [TodoStatus.later]: "orange",
  [TodoStatus.done]: "grey",
};

export const statusDescriptions: Record<TodoStatusType, string> = {
  doing: "tasks you're actively working on",
  urgent: "tasks that need immediate attention",
  next: "tasks coming up soon",
  later: "tasks for the future",
  done: "completed tasks",
};
