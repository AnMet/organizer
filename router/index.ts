import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/tasks", component: () => import("../pages/Tasks.vue") },
  { path: "/calendar", component: () => import("../pages/Calendar.vue") },
  { path: "/notes", component: () => import("../pages/Notes.vue") },
  { path: "/books", component: () => import("../pages/Books.vue") },
  { path: "/weather", component: () => import("../pages/Weather.vue") },
  { path: "/diary", component: () => import("../pages/Diary.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
