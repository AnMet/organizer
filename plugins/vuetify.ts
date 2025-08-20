import "@mdi/font/css/materialdesignicons.css";
import { defineNuxtPlugin } from "nuxt/app";
import { createVuetify } from "vuetify";
import "vuetify/styles";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi", // Ensure Material Design Icons are used
    },
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          dark: false,
          colors: {
            background: "#f9f9f9",
            surface: "#ffffff",
            primary: "#1976d2",
            secondary: "#424242",
            error: "#d32f2f",
            info: "#0288d1",
            success: "#388e3c",
            warning: "#f57c00",
            onPrimary: "#ffffff",
            onBackground: "#1e1e1e",
          },
        },
        dark: {
          dark: true,
          colors: {
            background: "#121212",
            surface: "#1e1e1e",
            primary: "#90caf9",
            secondary: "#eeeeee",
            error: "#ef9a9a",
            info: "#81d4fa",
            success: "#a5d6a7",
            warning: "#ffcc80",
            onPrimary: "#000000",
            onBackground: "#ffffff",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
