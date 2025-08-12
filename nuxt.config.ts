import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineNuxtConfig } from "nuxt/config";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineNuxtConfig({
  srcDir: ".", // ✅ Use project root as source
  css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.css"],
  plugins: ["~/plugins/vuetify", "~/plugins/pinia"],
  modules: ["@pinia/nuxt"],
  imports: {
    dirs: ["stores"], // ✅ Auto-import Pinia stores
  },
  build: {
    transpile: ["vuetify"], // ✅ Transpile Vuetify for SSR
  },
  vite: {
    plugins: [
      vuetify({
        autoImport: true, // ✅ Auto-import Vuetify components
      }),
    ],
    vue: {
      template: {
        transformAssetUrls, // ✅ Fix asset URLs in templates
      },
    },
    server: {
      fs: {
        allow: [
          resolve(__dirname, "node_modules"),
          resolve(__dirname), // ✅ Allow access to project root
        ],
      },
    },
  },
  devtools: {
    enabled: true, // ✅ Enable Nuxt DevTools
  },
  compatibilityDate: "2025-05-15", // ✅ Future-proof compatibility
});
