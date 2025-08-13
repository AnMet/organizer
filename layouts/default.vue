<script setup lang="ts">
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";
import { useLogout } from "~/composables/useLogout";
import { useUser } from "~/composables/useUser";

const { user } = useUser();
const theme = useTheme();
const router = useRouter();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

async function handleLogout() {
  const success = await useLogout();
  if (success) router.push("/auth");
}
</script>

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
      <v-btn text class="ml-4" v-if="user?.email" @click="handleLogout"
        >Log out</v-btn
      >

      <router-link v-else to="/auth">
        <v-btn icon :title="'User Profile'"
          ><v-icon>mdi-account-circle</v-icon></v-btn
        >
      </router-link>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<style scoped>
.v-app-bar-title {
  font-size: 1.25rem;
}
</style>
