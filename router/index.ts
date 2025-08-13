import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/todos", component: () => import("~/pages/todos.vue") },
  { path: "/calendar", component: () => import("~/pages/calendar.vue") },
  { path: "/notes", component: () => import("~/pages/notes.vue") },
  { path: "/books", component: () => import("~/pages/books.vue") },
  { path: "/weather", component: () => import("~/pages/weather.vue") },
  { path: "/diary", component: () => import("~/pages/diary.vue") },
  { path: "/signup", component: () => import("~/pages/signup.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
