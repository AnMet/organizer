<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSeedTodos } from "~/composables/useSeedTodos";
import { useTodos } from "~/composables/useTodos";
import { useUser } from "~/composables/useUser";
import type { Todo } from "~/types";
import { supabase } from "~/utils/supabaseClient";

const message = ref("");
const todos = ref([] as Todo[]);

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    message.value = "❌ No user connected";
    return;
  }

  const userId = data.user.id;
  const seeded = await useSeedTodos(userId);

  message.value = seeded
    ? "✅ Todos seeded for user: " + userId
    : "❌ Seeding failed";

  if (userId) {
    todos.value = await useTodos(userId);
  }
});

const { user } = useUser();
console.log("Current user:", user.value);
</script>

<template>
  <v-container>
    <h1>🚀 Seeding Todos</h1>
    <p>{{ message }}</p>
  </v-container>
</template>
