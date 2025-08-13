<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLogin } from "~/composables/useLogin";
import { useSignup } from "~/composables/useSignup";

const email = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();

async function handleSignup() {
  const user = await useSignup(email.value, password.value);
  if (user) {
    message.value = "✅ Account created";
    router.push("/");
  } else {
    message.value = "❌ Signup failed";
  }
}

async function handleLogin() {
  const user = await useLogin(email.value, password.value);
  if (user) {
    message.value = "✅ Logged in!";
    router.push("/");
  } else {
    message.value = "❌ Login failed";
  }
}
</script>

<template>
  <v-container>
    <h2>🔐 Welcome</h2>

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

    <v-row class="mt-2" justify="space-between">
      <v-btn color="primary" @click="handleSignup">Create Account</v-btn>
      <v-btn color="secondary" @click="handleLogin">Login</v-btn>
    </v-row>

    <p class="mt-4">{{ message }}</p>
  </v-container>
</template>
