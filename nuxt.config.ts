import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineNuxtConfig } from "nuxt/config";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineNuxtConfig({
  srcDir: ".", // ✅ Force Nuxt to use project root
  plugins: ["~/plugins/vuetify"],
  css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.css"],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@pinia/nuxt",
    // Inject Vuetify plugin into Vite
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins?.push(
          vuetify({
            autoImport: true, // ✅ No `ssr` option needed
          })
        );
      });
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    server: {
      fs: {
        allow: [
          resolve(__dirname, "node_modules"),
          resolve(__dirname), // ✅ Project root
        ],
      },
    },
  },
  imports: {
    dirs: ["stores"],
  },
  devtools: { enabled: true },
  compatibilityDate: "2025-05-15",
});
