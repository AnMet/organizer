<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import FullscreenLoader from "~/components/FullscreenLoader.vue";
import TodoDialog from "~/components/TodoDialog.vue";
import TodoPageDescription from "~/components/TodoPageDescription.vue";
import { useTodoStore } from "~/stores/todos";
import { statusColor, statusOrder, type Todo } from "~/types";
import { supabase } from "~/utils/supabaseClient";

const router = useRouter();
const loading = ref(true);
const store = useTodoStore();

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    loading.value = false;
    router.push("/login");
    return;
  }

  const userId = data.user.id;

  // Seed todos
  await store.seedTodos(userId);

  loading.value = false;
});

// ✅ Use store.todos instead of local todos
const sortedTodos = computed(() =>
  store.todos.slice().sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  })
);

const dialogOpen = ref(false);
const selectedTodo = ref<Todo | null>(null);

function openEditDialog(todo: Todo) {
  selectedTodo.value = todo;
  dialogOpen.value = true;
}
</script>

<template>
  <v-container height="100%">
    <FullscreenLoader v-if="loading" />

    <div v-else>
      <!-- Page title -->
      <h1 class="text-h4 mb-4">🚀 Todos</h1>

      <!-- Description -->
      <TodoPageDescription />

      <!-- Add new todo button -->
      <div class="d-flex">
        <v-btn class="mx-auto mb-3" @click="openEditDialog({} as Todo)">
          <v-icon class="mr-1">mdi-plus</v-icon>
          Add new task
        </v-btn>
      </div>

      <!-- Todos elements -->
      <div v-if="sortedTodos.length">
        <v-card
          v-for="todo in sortedTodos"
          :key="todo.id"
          class="mb-1"
          variant="tonal"
          color="surface-variant"
          :subtitle="todo.description"
          :title="todo.title"
          style="position: relative"
        >
          <!-- Status Chip -->
          <v-chip
            :color="statusColor[todo.status]"
            class="status-chip"
            size="small"
            label
          >
            {{ todo.status }}
          </v-chip>

          <!-- Edit Button -->
          <v-btn
            icon
            size="x-small"
            class="menu-button"
            variant="text"
            @click="openEditDialog(todo)"
          >
            <v-icon size="18">mdi-pencil</v-icon>
          </v-btn>
        </v-card>
      </div>
      <div v-else>
        <p>No todos found.</p>
      </div>

      <!-- Todo edit dialogue -->
      <TodoDialog v-model="dialogOpen" :id="selectedTodo?.id" />
    </div>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
}

.status-chip {
  position: absolute;
  top: 8px;
  right: 48px; /* leave space for menu button */
}

.menu-button {
  position: absolute;
  top: 4px;
  right: 8px;
  z-index: 2;
}
</style>
