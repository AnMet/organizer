<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import FullscreenLoader from "~/components/FullscreenLoader.vue";
import { useSeedTodos } from "~/composables/useSeedTodos";
import { useTodos } from "~/composables/useTodos";
import { useUser } from "~/composables/useUser";
import { statusOrder, type Todo } from "~/types";
import { supabase } from "~/utils/supabaseClient";

const router = useRouter();
const todos = ref([] as Todo[]);
const loading = ref(true);

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    loading.value = false;
    router.push("/login"); // 🔐 Redirect if not authenticated
    return;
  }

  const userId = data.user.id;

  // 🧠 Load existing todos
  const existingTodos = await useTodos(userId);

  if (existingTodos.length === 0) {
    // 🌱 Seed only if none exist
    const seeded = await useSeedTodos(userId);
    if (seeded) {
      todos.value = await useTodos(userId); // Re-fetch after seeding
    }
  } else {
    todos.value = existingTodos;
  }

  loading.value = false; // ✅ Done loading
});

const { user } = useUser();

const sortedTodos = computed(() =>
  todos.value.slice().sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  })
);

function statusColor(status: string) {
  switch (status) {
    case "next":
      return "blue";
    case "doing":
      return "green";
    case "later":
      return "orange";
    case "done":
      return "grey";
    default:
      return "primary";
  }
}

const dialogOpen = ref(false);
const selectedTodo = ref<Todo | null>(null);

function openEditDialog(todo: Todo) {
  selectedTodo.value = todo;
  dialogOpen.value = true;
}

async function saveTodo() {
  if (!selectedTodo.value) return;

  const { error } = await supabase
    .from("todos")
    .update({
      title: selectedTodo.value.title,
      description: selectedTodo.value.description,
      status: selectedTodo.value.status,
    })
    .eq("id", selectedTodo.value.id);

  if (error) {
    console.error("❌ Failed to update todo:", error);
  } else {
    console.log("✅ Todo updated");
    dialogOpen.value = false;
  }
}

function deleteTodo(id: string) {
  console.log("Delete todo:", id);
  // Confirm and delete logic
}
</script>

<template>
  <v-container height="100%">
    <FullscreenLoader v-if="loading" />

    <div v-else>
      <!-- Page title -->
      <h1 class="text-h4 mb-4">🚀 Todos</h1>

      <!-- Description -->
      <v-expansion-panels variant="accordion" multiple class="mb-4">
        <v-expansion-panel>
          <v-expansion-panel-title
            collapse-icon="mdi-minus"
            expand-icon="mdi-plus"
            class="text-primary d-flex align-center"
          >
            How this page works
          </v-expansion-panel-title>

          <v-expansion-panel-text class="pa-4">
            <div class="text-body-1 text-medium-emphasis mb-4">
              This page helps you manage your tasks by organizing them based on
              their status.
            </div>

            <div class="text-body-1 mb-2">
              Your todos will now appear in this order:
            </div>

            <v-list density="compact" class="mb-4">
              <v-list-item>
                <div>
                  🟢 <strong class="text-primary">doing</strong> — tasks you're
                  actively working on
                </div>
              </v-list-item>
              <v-list-item>
                <div>
                  🔴 <strong class="text-error">urgent</strong> — tasks that
                  need immediate attention
                </div>
              </v-list-item>
              <v-list-item>
                <div>
                  🔵 <strong class="text-info">next</strong> — tasks coming up
                  soon
                </div>
              </v-list-item>
              <v-list-item>
                <div>
                  🟠 <strong class="text-warning">later</strong> — tasks for the
                  future
                </div>
              </v-list-item>
              <v-list-item>
                <div>
                  ⚫ <strong class="text-disabled">done</strong> — completed
                  tasks
                </div>
              </v-list-item>
            </v-list>

            <div class="text-body-1 text-medium-emphasis">
              You can update the status of each todo by clicking on the status
              label
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Add new todo button -->
      <div class="d-flex">
        <v-btn class="mx-auto mb-3">
          <v-icon class="mr-1">mdi-plus</v-icon>
          Add new tusk
        </v-btn>
      </div>

      <!-- Todos elements -->
      <div v-if="todos.length">
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
            :color="statusColor(todo.status)"
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

          <!-- Todo edit dialogue -->
          <TodoDialog
            v-if="selectedTodo"
            v-model="dialogOpen"
            :id="selectedTodo.id"
          />
        </v-card>
      </div>
      <div v-else>
        <p>No todos found.</p>
      </div>
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
  right: 8px;
  z-index: 1;
}

.status-chip {
  position: absolute;
  top: 8px;
  right: 48px; /* leave space for menu button */
  z-index: 1;
}

.menu-button {
  position: absolute;
  top: 4px;
  right: 8px;
  z-index: 2;
}
</style>
