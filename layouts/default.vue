<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";
import { useLogout } from "../composables/useLogout";
import { useUser } from "../composables/useUser";

const { user } = useUser();
const theme = useTheme();
const router = useRouter();

const toggleTheme = () => {
  theme.change(theme.global.current.value.dark ? "light" : "dark");
};

const isDark = computed(() => theme.global.current.value.dark);
const toolbarTextColor = computed(() => (isDark.value ? "white" : "black"));

async function handleLogout() {
  const success = await useLogout();
  if (success) router.push("/auth");
}
</script>

<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar color="primary" flat app>
      <v-app-bar-title class="font-weight-bold d-flex align-center">
        <router-link
          to="/"
          class="d-flex align-center text-decoration-none"
          :style="{ color: toolbarTextColor }"
        >
          <v-btn icon>
            <v-icon :color="toolbarTextColor">mdi-home</v-icon>
          </v-btn>
          <span class="text-h6">My Organizer</span>
        </router-link>
      </v-app-bar-title>

      <v-spacer />

      <!-- Theme Toggle -->
      <v-btn
        icon
        @click="toggleTheme"
        :title="isDark ? 'Light mode' : 'Dark mode'"
      >
        <v-icon :color="toolbarTextColor">mdi-theme-light-dark</v-icon>
      </v-btn>

      <!-- User/Login Icon -->
      <client-only>
        <v-btn
          text
          class="ml-4"
          v-if="user?.email"
          @click="handleLogout"
          :style="{ color: toolbarTextColor }"
        >
          Log out
        </v-btn>

        <v-btn
          icon
          v-if="user?.email"
          :title="'User Profile'"
          :to="'/auth'"
          :style="{ color: toolbarTextColor }"
        >
          <v-icon :color="toolbarTextColor">mdi-account-circle</v-icon>
        </v-btn></client-only
      >
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
