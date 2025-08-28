<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { formatDateTimeParts } from "~/composables/useCalendar";
import { useCalendarStore } from "~/stores/calendar";
import { useDiaryStore } from "~/stores/diary";
import type { MoodTag } from "~/types/diary";
import { resolveMoodTag } from "~/utils/tags";
import BaseDialog from "../ui/BaseDialog.vue";
import ColorPicker from "../ui/ColorPicker.vue";
import MoodTagsPicker from "../ui/MoodTagsPicker.vue";

const calendarStore = useCalendarStore();
const diaryStore = useDiaryStore();

const colorPickerDialog = ref(false);
const selectedBgColor = ref(diaryStore.backgroundColor);
const isDarkMode = ref(diaryStore.dark);

const moodTagsDialog = ref(false);
const selectedMoodTagsIds = ref(diaryStore.moodTagIds);

const resolvedTags = computed((): MoodTag[] =>
  diaryStore.moodTagIds
    .map((id) => resolveMoodTag(id))
    .filter((tag): tag is MoodTag => tag !== undefined)
);

function updateBgColorConfig() {
  diaryStore.updateBackgroundColor(selectedBgColor.value);
  diaryStore.updateDarkMode(isDarkMode.value);
}

function updateMoodTags() {
  diaryStore.updateMoodTags(selectedMoodTagsIds.value);
}

onMounted(() => {
  diaryStore.loadTodayPage();
});

const datetime = computed(() =>
  formatDateTimeParts(
    new Date(),
    calendarStore.locale,
    calendarStore.timezone,
    calendarStore.format
  )
);

// Sync the store value when dialog opens
watch(colorPickerDialog, (isOpen) => {
  if (isOpen) {
    selectedBgColor.value = diaryStore.backgroundColor;
    isDarkMode.value = diaryStore.dark;
  }
});

watch(moodTagsDialog, (isOpen) => {
  if (isOpen) {
    selectedMoodTagsIds.value = diaryStore.moodTagIds;
  }
});

const textColorClass = computed(() =>
  diaryStore.dark ? "text-white" : "text-black"
);
</script>

<template>
  <div
    class="rounded elevation-2 pa-4"
    :style="{ backgroundColor: diaryStore.backgroundColor || '#ffffff' }"
  >
    <!-- Header: date and bg color picker -->
    <div class="d-flex justify-space-between align-center">
      <div :class="[textColorClass, 'text-h6']">{{ datetime.date }}</div>
      <v-btn
        variant="text"
        size="medium"
        color="primary"
        icon="mdi-palette"
        @click="colorPickerDialog = true"
        class="ml-auto"
      ></v-btn>
      <BaseDialog
        v-model="colorPickerDialog"
        title="Choose Background Color"
        :onSave="updateBgColorConfig"
      >
        <!-- Dark mode switch -->
        <v-switch v-model="isDarkMode" label="Dark mode" color="primary" />
        <!-- BG color picker -->
        <ColorPicker
          :modelValue="selectedBgColor"
          @update:color="selectedBgColor = $event"
        />
      </BaseDialog>
    </div>

    <!-- Main day info: mood tags, title and weather -->
    <div class="d-flex mb-4">
      <div class="flex-grow-1">
        <v-textarea
          v-model="diaryStore.dayTitle"
          placeholder="Add a title of the day"
          :class="textColorClass"
          variant="plain"
          hide-details
          auto-grow
          rows="1"
          class="pt-0"
          @blur="diaryStore.updateDayTitle(diaryStore.dayTitle)"
        />

        <!-- Mood tags -->
        <v-btn
          v-if="!diaryStore.moodTagIds?.length"
          @click="moodTagsDialog = true"
          size="small"
          class="mt-2"
          >Add tags</v-btn
        >

        <div class="d-flex flex-wrap align-center" v-else>
          <v-chip v-for="tag in resolvedTags" :key="tag.id" class="ma-1">
            {{ tag.emoji }} {{ tag.text }}
          </v-chip>
          <v-btn
            @click="moodTagsDialog = true"
            variant="text"
            size="small"
            color="primary"
            icon="mdi-plus"
          ></v-btn>
        </div>

        <BaseDialog
          v-model="moodTagsDialog"
          title="Choose your mood tags"
          :onSave="updateMoodTags"
        >
          <MoodTagsPicker
            :modelValue="selectedMoodTagsIds"
            @update:tags="selectedMoodTagsIds = $event"
          />
        </BaseDialog>
      </div>

      <!-- Weather placeholder -->
      <div
        class="ml-auto bg-grey-lighten-3 pa-2 rounded text-caption text-center"
      >
        🌤️ Weather widget here
      </div>
    </div>
    <v-divider></v-divider>

    <!-- Content editor -->
    <div fluid class="full-page">
      <v-btn variant="text" prepend-icon="mdi-plus" color="primary">
        Add new block
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.full-page {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
