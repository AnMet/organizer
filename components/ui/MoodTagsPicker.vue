<script setup lang="ts">
import { ref, watch } from "vue";
import type { TagCategoryType } from "~/types/diary";
import { moodTags } from "~/utils/tags";

const moodTagBackgrounds: Record<TagCategoryType, string> = {
  mood: "#FFF9C4",
  act: "#E1F5FE",
  focus: "#F3E5F5",
  health: "#E8F5E9",
  reflect: "#FBE9E7",
};

const props = defineProps<{
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: "update:tags", value: string[]): void;
}>();

const selectedTagsIds = ref(props.modelValue);

// Sync external modelValue to internal tags
watch(
  () => props.modelValue,
  (newTagsIds) => {
    selectedTagsIds.value = newTagsIds;
  }
);

// Emit updated tags when user picks a new one
watch(selectedTagsIds, (newTagsIds) => {
  emit("update:tags", newTagsIds);
});
</script>

<template>
  <v-chip-group v-model="selectedTagsIds" multiple column>
    <div
      v-for="[category, tags] in Object.entries(moodTags)"
      :key="category"
      class="mb-4 rounded px-3 py-2"
      :style="{ backgroundColor: moodTagBackgrounds[category as TagCategoryType] }"
    >
      <h3 class="text-subtitle-1 font-weight-bold mb-1">
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </h3>

      <div class="d-flex flex-wrap">
        <v-chip
          v-for="tag in tags"
          :key="tag.id"
          :value="tag.id"
          class="ma-1"
          filter
        >
          {{ tag.emoji }} {{ tag.text }}
        </v-chip>
      </div>
    </div>
  </v-chip-group>
</template>
