<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { formatDateTimeParts } from "~/composables/useCalendar";
import { useCalendarStore } from "~/stores/calendar";
import { useDiaryStore } from "~/stores/diary";

const calendarStore = useCalendarStore();
const diaryStore = useDiaryStore();

onMounted(() => {
  title.value = diaryStore.dayTitle;
});

const datetime = computed(() =>
  formatDateTimeParts(
    new Date(),
    calendarStore.locale,
    calendarStore.timezone,
    calendarStore.format
  )
);

// Diary fields
const title = ref<string>("");
const moodTags = ref<string[]>([]); // todo type
</script>

<template>
  <div class="bg-white rounded elevation-2 pa-4">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-4">
      <div>
        <h2 class="text-h6 font-weight-bold mb-1">📅 {{ datetime.date }}</h2>
        <v-text-field
          v-model="title"
          placeholder="Add a title of the day"
          variant="plain"
          hide-details
          class="text-subtitle-1 font-italic"
          @blur="diaryStore.updateDayTitle(title)"
        />
      </div>

      <!-- Weather placeholder -->
      <div class="ml-auto">
        <div class="bg-grey-lighten-3 pa-2 rounded text-caption text-center">
          🌤️ Weather widget here
        </div>
      </div>
    </div>

    <!-- <v-row>
      <v-col sm="9">
        <h2>{{ datetime.date }}</h2>
        <div>add title</div>
      </v-col>
      <v-col sm="3">weather</v-col>
    </v-row> -->
  </div>
</template>

<!-- <style scoped>
.diary-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
}
section {
  margin-top: 1.5rem;
}
textarea,
input,
select {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style> -->
