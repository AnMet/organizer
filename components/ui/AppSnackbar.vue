<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSnackbarStore } from "~/stores/snackbar";
import { type SnackbarTypeKey } from "~/types";

const snackbar = useSnackbarStore();
const { visible, message, type } = storeToRefs(snackbar);

const messageIcons: Record<SnackbarTypeKey, string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};
</script>

<template>
  <v-snackbar
    v-model="visible"
    timeout="3000"
    location="bottom right"
    :color="type"
    variant="tonal"
  >
    <span class="me-2">{{ messageIcons[type] }}</span> {{ message }}
  </v-snackbar>
</template>
