<script setup lang="ts">
import { computed } from "vue";
import { useTodoStore } from "~/stores/todos";
import { statusColor, statusOrder, type TodoStatusType } from "~/types";

const store = useTodoStore();

// Group todos by status, sort by order and count them
const sortedStatusCounts = computed(() => {
  const counts: Record<string, number> = {};

  for (const todo of store.todos) {
    counts[todo.status] = (counts[todo.status] || 0) + 1;
  }

  return Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .sort(
      ([statusA], [statusB]) =>
        statusOrder[statusA as TodoStatusType] -
        statusOrder[statusB as TodoStatusType]
    );
});

function taskLabel(count: number) {
  return count === 1 ? "task" : "tasks";
}
</script>

<template>
  <div v-if="sortedStatusCounts.length" class="d-flex flex-wrap gap-2">
    <div
      v-for="[status, count] in sortedStatusCounts"
      :key="status"
      class="d-inline-flex align-center border rounded py-1 px-2 mr-1"
    >
      <v-chip
        :color="statusColor[status as TodoStatusType]"
        class="status-chip"
        size="small"
        label
      >
        {{ status }}
      </v-chip>
      <span class="ml-1"> {{ count }} {{ taskLabel(count) }}</span>
    </div>
  </div>

  <div v-else>No task created yet.</div>
</template>
