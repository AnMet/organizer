<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSignup } from "~/composables/useSignup";
import { supabase } from "~/utils/supabaseClient";

const email = ref("");
const password = ref("");
const message = ref("");

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();
});

async function handleSignup() {
  const user = await useSignup(email.value, password.value);
  if (user) {
    message.value = "✅ Account created";
  } else {
    message.value = "❌ Signup failed";
  }
}
</script>

<template>
  <v-container>
    <h2>📝 Create Account</h2>

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

    <v-btn color="primary" class="mt-2" @click="handleSignup">
      Create Account
    </v-btn>

    <p class="mt-4">{{ message }}</p>
  </v-container>
</template>
