<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:color", value: string): void;
}>();

const color = ref(props.modelValue);

// Sync external modelValue to internal color
watch(
  () => props.modelValue,
  (newColor) => {
    color.value = newColor;
  }
);

// Emit updated color when user picks a new one
watch(color, (newColor) => {
  emit("update:color", newColor);
});
</script>

<template>
  <v-color-picker elevation="0" class="width-auto" v-model="color" />
</template>
