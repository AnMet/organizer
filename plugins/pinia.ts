// plugins/pinia.ts
import { defineNuxtPlugin } from "nuxt/app";
import type { Pinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
  (nuxtApp.$pinia as Pinia).use(piniaPluginPersistedstate);
});
