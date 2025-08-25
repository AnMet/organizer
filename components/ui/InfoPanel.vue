<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <v-expansion-panels variant="accordion" multiple class="mb-4">
    <v-expansion-panel>
      <v-expansion-panel-title
        collapse-icon="mdi-minus"
        expand-icon="mdi-plus"
        class="text-primary d-flex align-center"
      >
        {{ title }}
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <slot />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
