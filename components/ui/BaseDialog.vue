<script setup lang="ts">
const open = defineModel<boolean>();

const props = defineProps<{
  title?: string;
  persistent?: boolean;
  onSave: () => Promise<void> | void;
}>();

function save() {
  props.onSave();
  open.value = false;
}
</script>

<template>
  <v-dialog v-model="open" :persistent="persistent" width="unset">
    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center bg-primary text-white"
      >
        <span class="text-h6">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <slot />
      </v-card-text>

      <!-- <v-card-actions v-if="$slots.actions">
        <slot name="actions" />
      </v-card-actions> -->
      <v-divider></v-divider>
      <v-card-actions class="mx-4 mb-2">
        <v-btn color="primary" @click="open = false"> Cancel </v-btn>
        <v-spacer />
        <!-- :disabled="!todo.title.trim()"  -->
        <v-btn color="primary" @click="save">
          <v-icon size="18" class="mr-1">mdi-content-save</v-icon>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
