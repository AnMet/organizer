export * from "./book";
export * from "./todo";
export * from "./user";

export const WidgetType = {
  tasks: "tasks",
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

export const DateFormat = {
  full: "full",
  long: "long",
  medium: "medium",
  short: "books",
} as const;

export type DateFormatType = (typeof DateFormat)[keyof typeof DateFormat];
