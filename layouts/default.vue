<template>
  <v-app>
    <!-- Toolbar -->
    <v-app-bar color="primary" flat app>
      <v-app-bar-title class="font-weight-bold d-flex align-center">
        <router-link
          to="/"
          class="d-flex align-center text-decoration-none text-black"
        >
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <span class="text-h6">My Organizer</span>
        </router-link>
      </v-app-bar-title>

      <v-spacer />

      <!-- Theme Toggle -->
      <v-btn
        icon
        @click="toggleTheme"
        :title="theme.global.current.value.dark ? 'Light mode' : 'Dark mode'"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <!-- User/Login Icon -->
      <v-btn icon :title="'User Profile'">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>

<style scoped>
.v-app-bar-title {
  font-size: 1.25rem;
}
</style>
