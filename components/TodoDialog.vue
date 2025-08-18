<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useTodoStore } from "~/stores/todos";
import { TodoStatus, type Todo } from "~/types";
import { supabase } from "~/utils/supabaseClient";

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

const createNew = computed(() => !props.id);
const todo = ref<Todo>({
  id: "",
  user_id: "",
  title: "",
  description: "",
  status: TodoStatus.next,
  created_at: "",
  updated_at: "",
});

// Load todo if editing
watch(
  () => props.id,
  async (id) => {
    if (!id) {
      todo.value = {
        id: "",
        user_id: "",
        title: "",
        description: "",
        status: TodoStatus.next,
        created_at: "",
        updated_at: "",
      };
      return;
    }

    const existing = store.todos.find((t) => t.id === id);
    if (existing) {
      todo.value = { ...existing };
    } else {
      const { data } = await supabase
        .from("todos")
        .select("*")
        .eq("id", id)
        .single();
      if (data) todo.value = data;
    }
  }
);

async function saveTodo() {
  const userId = (await supabase.auth.getUser()).data?.user?.id;
  if (!userId) return;

  todo.value.user_id = userId;

  if (createNew.value) {
    const { data, error } = await supabase
      .from("todos")
      .insert(todo.value)
      .select()
      .single();
    if (!error && data) {
      store.addTodo(data);
    }
  } else {
    const { error } = await supabase
      .from("todos")
      .update({
        title: todo.value.title,
        description: todo.value.description,
        status: todo.value.status,
      })
      .eq("id", todo.value.id);

    if (!error) {
      store.updateTodo(todo.value);
    }
  }

  dialog.value = false;
}

async function deleteTodo() {
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", todo.value.id);
  if (!error) {
    store.removeTodo(todo.value.id);
    dialog.value = false;
  }
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center bg-primary text-white"
      >
        {{ createNew ? "Create Todo" : "Edit Todo" }}
        <v-btn
          v-if="!createNew"
          size="small"
          color="error"
          variant="flat"
          @click="deleteTodo"
        >
          <v-icon size="18" class="mr-1">mdi-trash-can</v-icon> Delete
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="todo.title" label="Title" required />
        <v-textarea v-model="todo.description" label="Description" rows="3" />
        <v-select
          v-model="todo.status"
          :items="['doing', 'urgent', 'next', 'later', 'done']"
          label="Status"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="saveTodo">
          {{ createNew ? "Create" : "Save" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
