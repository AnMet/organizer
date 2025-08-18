export * from "./book";
export * from "./calendar";
export * from "./todo";

export const WidgetType = {
  todos: "todos",
  calendar: "calendar",
  notes: "notes",
  books: "books",
  weather: "weather",
  diary: "diary",
} as const;

export type WidgetTypeKey = keyof typeof WidgetType;
export type WidgetTypeValue = (typeof WidgetType)[WidgetTypeKey];

export interface DashboardWidget {
  type: WidgetTypeValue;
  title: string;
  component: string | object;
  page: `/${string}`; // template literal type ensures it starts with "/"
}
