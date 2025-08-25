<script setup lang="ts">
import { computed, ref, watch } from "vue";
import TodoDialog from "~/components/todo/TodoDialog.vue";
import TodoPageDescription from "~/components/todo/TodoPageDescription.vue";
import FullscreenLoader from "~/components/ui/FullscreenLoader.vue";
import InfoPanel from "~/components/ui/InfoPanel.vue";
import { useAuthGuard } from "~/composables/useAuthGuard";
import { useTodoStore } from "~/stores/todos";
import { statusColor, statusOrder, type Todo } from "~/types";

const store = useTodoStore();

const { loading, userId } = useAuthGuard();

// Seed todos
watch(userId, async (id) => {
  if (id) await store.seedTodos(userId.value);
});

const sortedTodos = computed(() =>
  store.todos.slice().sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  })
);

const dialogOpen = ref(false);
const selectedTodo = ref<Todo | null>(null);

function openEditDialog(todo: Todo | null) {
  selectedTodo.value = todo;
  dialogOpen.value = true;
}

async function generateTodos() {
  loading.value = true;
  await store.seedTodos(userId.value, true);
  loading.value = false;
}
</script>

<template>
  <v-container height="100%">
    <FullscreenLoader v-if="loading" />

    <div v-else>
      <!-- Page title -->
      <h1 class="text-h4 mb-4">🚀 My Task manager</h1>

      <!-- Description -->
      <InfoPanel title="How this page works">
        <TodoPageDescription />
      </InfoPanel>

      <!-- Add new todo button -->
      <div class="d-flex">
        <v-btn class="mx-auto mb-3" @click="openEditDialog(null)">
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
        <v-alert
          variant="tonal"
          type="info"
          border="start"
          elevation="2"
          colored-border
        >
          <strong>No tasks found.</strong><br />
          You haven’t added any tasks yet — but it’s a great time to start!
          ✨<br />
          📝 Create your first task and take control of your day!<br /><br />

          <div>
            Or let us help you get started with some default tasks:
            <v-btn
              color="primary"
              size="small"
              class="mt-2"
              @click="generateTodos"
            >
              Generate Sample Tasks
            </v-btn>
          </div>
        </v-alert>
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
