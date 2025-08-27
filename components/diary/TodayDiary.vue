<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { formatDateTimeParts } from "~/composables/useCalendar";
import { useCalendarStore } from "~/stores/calendar";
import { useDiaryStore } from "~/stores/diary";
import BaseDialog from "../ui/BaseDialog.vue";
import ColorPicker from "../ui/ColorPicker.vue";

const calendarStore = useCalendarStore();
const diaryStore = useDiaryStore();

const colorPickerDialog = ref(false);
const selectedBgColor = ref(diaryStore.backgroundColor);

function saveBgColor() {
  diaryStore.updateBackgroundColor(selectedBgColor.value);
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
  }
});
</script>

<template>
  <div
    class="rounded elevation-2 pa-4"
    :style="{ backgroundColor: diaryStore.backgroundColor || '#ffffff' }"
  >
    <!-- Header: date and bg color picker -->
    <div class="d-flex justify-space-between align-center">
      <div class="text-h6">{{ datetime.date }}</div>
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
        :showClose="true"
        :onSave="saveBgColor"
      >
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
          variant="plain"
          hide-details
          auto-grow
          rows="1"
          class="pt-0"
          @blur="diaryStore.updateDayTitle(diaryStore.dayTitle)"
        />

        <v-btn size="small" class="mt-2">Add tags</v-btn>
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
