<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLogin } from "~/composables/useLogin";

const email = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();

async function handleLogin() {
  const user = await useLogin(email.value, password.value);
  if (user) {
    message.value = "✅ Logged in!";
    router.push("/todo"); // or wherever you want to go
  } else {
    message.value = "❌ Login failed";
  }
}
</script>

<template>
  <v-container>
    <h2>🔐 Login</h2>

    <v-text-field
      v-model="email"
      label="Email"
      outlined
      type="email"
      required
    />

    <v-text-field
      v-model="password"
      label="Password"
      outlined
      type="password"
      required
    />

    <v-btn color="primary" class="mt-2" @click="handleLogin"> Login </v-btn>

    <p class="mt-4">{{ message }}</p>
  </v-container>
</template>
