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
            background: "#FDF6F0", // soft cream
            surface: "#FFFFFF",
            primary: "#A3BFF2", // pastel blue
            secondary: "#D8B4F8", // pastel purple
            accent: "#FDE68A", // pastel yellow
            info: "#93C5FD",
            success: "#A7F3D0",
            warning: "#FCD34D",
            error: "#FCA5A5",
          },
        },
        dark: {
          dark: true,
          colors: {
            background: "#0B0F1A", // deep space blue
            surface: "#1A1F2B", // galaxy shadow
            primary: "#7F5AF0", // cosmic violet
            secondary: "#5BC0BE", // nebula teal
            accent: "#F4D35E", // star yellow
            info: "#3ABFF8",
            success: "#2EC4B6",
            warning: "#FF9F1C",
            error: "#E63946",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
