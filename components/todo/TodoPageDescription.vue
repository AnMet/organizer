<script setup lang="ts">
import {
  statusColor,
  statusDescriptions,
  TodoStatus,
  type TodoStatusType,
} from "~/types";
</script>

<template>
  <div class="text-body-2 text-medium-emphasis mb-4">
    This page helps you manage your tasks by organizing them based on their
    status.
  </div>

  <div class="border px-4 pt-3 pb-2">
    <div class="text-body-1 mb-2">
      Your tasks will now appear in this order:
    </div>

    <v-list
      v-for="status in Object.keys(TodoStatus)"
      :key="status"
      density="compact"
      class="pa-0 mb-1"
    >
      <v-list-item>
        <div>
          <v-chip
            class="mr-1"
            :color="statusColor[status as TodoStatusType]"
            size="small"
            label
          >
            {{ status }}
          </v-chip>
          <span class="text-body-2">
            - {{ statusDescriptions[status as TodoStatusType] }}</span
          >
        </div>
      </v-list-item>
    </v-list>
  </div>

  <v-alert class="mt-3 text-body-2" type="info" variant="tonal"
    >You can delete or update the content and the status of each task by
    clicking on the edition button
    <v-icon size="15">mdi-pencil</v-icon>
    .
  </v-alert>
</template>
