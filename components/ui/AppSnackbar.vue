<template>
  <v-snackbar
    v-model="model"
    timeout="3000"
    location="bottom right"
    :color="type"
  >
    <span class="me-2">{{ messageIcons[type] }}</span> {{ message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { defineModel, defineProps, type PropType } from "vue";
import { SnackbarType, type SnackbarTypeKey } from "~/types";

const model = defineModel<boolean>();

const props = defineProps({
  message: { type: String, required: true },
  type: {
    type: String as PropType<SnackbarTypeKey>,
    default: SnackbarType.success,
    validator: (val: string) => Object.keys(SnackbarType).includes(val),
  },
});

const messageIcons: Record<SnackbarTypeKey, string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};
</script>
