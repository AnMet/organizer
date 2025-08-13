import { defineNuxtPlugin } from "nuxt/app";
import { loadUser } from "~/composables/useUser";

export default defineNuxtPlugin(() => {
  loadUser();
});
