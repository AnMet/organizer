<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useTodoStore } from "~/stores/todos";
import { SnackbarType, TodoStatus, type Todo } from "~/types";
import { supabase } from "~/utils/supabaseClient";
import AppSnackbar from "../ui/AppSnackbar.vue";

const props = defineProps<{
  id?: string;
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const store = useTodoStore();
const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const confirmDeleteDialog = ref(false);
const showDeletionConfirm = ref(false);

// Get current user once
const {
  data: { user },
} = await supabase.auth.getUser();
const userId = user?.id;

const todo = ref<Omit<Todo, "id" | "created_at" | "updated_at">>({
  user_id: userId ?? "",
  title: "",
  description: "",
  status: TodoStatus.next,
});

watch(
  () => props.id,
  async (id) => {
    if (!id) {
      resetForm();
      return;
    }

    const existing = store.todos.find((t) => t.id === id);
    if (existing) {
      const { user_id, title, description, status } = existing;
      todo.value = { user_id, title, description, status };
    } else {
      const { data } = await supabase
        .from("todos")
        .select("user_id, title, description, status")
        .eq("id", id)
        .single();
      if (data) {
        const { user_id, title, description, status } = data;
        todo.value = { user_id, title, description, status };
      }
    }
  },
  { immediate: true }
);

function resetForm() {
  todo.value = {
    user_id: userId ?? "",
    title: "",
    description: "",
    status: TodoStatus.next,
  };
}

async function saveTodo() {
  if (!userId) {
    console.error("User not authenticated");
    return;
  }

  todo.value.user_id = userId;

  if (!props.id) {
    await store.addTodo(todo.value);
  } else {
    await store.updateTodo(todo.value, props.id!);
  }

  dialog.value = false;
}

function requestDelete() {
  confirmDeleteDialog.value = true;
}

async function performDelete() {
  if (!props.id) return;

  const { error } = await supabase.from("todos").delete().eq("id", props.id);

  if (!error) {
    await store.deleteTodo(props.id);
    dialog.value = false;
  }

  confirmDeleteDialog.value = false;
  showDeletionConfirm.value = true;
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center bg-primary text-white"
      >
        {{ !props.id ? "Create a new task" : "Edit the task" }}

        <div>
          <!--  v-if="isDraft" -->
          <v-btn
            variant="outlined"
            prepend-icon="mdi-refresh"
            @click="resetForm"
            class="mr-1"
            >Reset
          </v-btn>
          <v-btn variant="text" icon="mdi-close" @click="dialog = false">
          </v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="todo.title"
          label="Title"
          required
          :rules="[(v: any) => !!v || 'Title is required']"
        />
        <v-textarea v-model="todo.description" label="Description" rows="3" />
        <v-select
          v-model="todo.status"
          :items="Object.values(TodoStatus)"
          label="Status"
        />
      </v-card-text>

      <v-card-actions class="mx-4 mb-2">
        <v-btn v-if="props.id" color="error" @click="requestDelete">
          <v-icon size="18" class="mr-1">mdi-trash-can</v-icon> Delete
        </v-btn>
        <v-spacer />
        <v-btn color="primary" :disabled="!todo.title.trim()" @click="saveTodo">
          <v-icon size="18" class="mr-1">mdi-content-save</v-icon>
          {{ !props.id ? "Create" : "Save" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Confirm delete -->
  <v-dialog v-model="confirmDeleteDialog" max-width="400">
    <v-card>
      <v-card-title class="text-h6">Confirm Deletion</v-card-title>
      <v-card-text>Are you sure you want to delete this todo?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="confirmDeleteDialog = false">Cancel</v-btn>
        <v-btn color="error" @click="performDelete">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <AppSnackbar
    v-model="showDeletionConfirm"
    message="Task deleted
  successfully."
    :type="SnackbarType.success"
  />
</template>
