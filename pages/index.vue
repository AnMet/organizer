<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";

import BooksWidget from "~/components/BooksWidget.vue";
import CalendarWidget from "~/components/CalendarWidget.vue";
import DiaryWidget from "~/components/DiaryWidget.vue";
import NotesWidget from "~/components/NotesWidget.vue";
import TasksWidget from "~/components/TasksWidget.vue";
import WeatherWidget from "~/components/WeatherWidget.vue";
import { WidgetType, type DashboardWidget } from "~/types";

const widgets = ref<DashboardWidget[]>([
  {
    type: WidgetType.tasks,
    title: "🧭 Tasks",
    component: TasksWidget,
    page: `/${WidgetType.tasks}`,
  },
  {
    type: WidgetType.calendar,
    title: "📅 Calendar",
    component: CalendarWidget,
    page: `/${WidgetType.calendar}`,
  },
  {
    type: WidgetType.notes,
    title: "📝 Notes",
    component: NotesWidget,
    page: `/${WidgetType.notes}`,
  },
  {
    type: WidgetType.books,
    title: "📚 Books",
    component: BooksWidget,
    page: `/${WidgetType.books}`,
  },
  {
    type: WidgetType.weather,
    title: "🌤️ Weather",
    component: WeatherWidget,
    page: `/${WidgetType.weather}`,
  },
  {
    type: WidgetType.diary,
    title: "📔 Diary",
    component: DiaryWidget,
    page: `/${WidgetType.diary}`,
  },
]);

// const diaryEntry = ref("");
// const uploadedImages = ref([]);
// const selectedEmoji = ref("");

// function handleImageUpload(files) {
//   uploadedImages.value = Array.from(files);
// }

const router = useRouter();

function goToCalendarPage() {
  router.push("/calendar");
}
</script>

<template>
  <v-container fluid>
    <div class="text-center pa-10">
      <h1>Welcome to your Organizer ✨</h1>
      <p>Drag and drop your widgets to customize your dashboard.</p>
    </div>

    <draggable
      v-model="widgets"
      item-key="type"
      class="d-flex flex-wrap"
      :animation="200"
    >
      <template #item="{ element }">
        <v-col cols="12" md="6">
          <!-- Render widgets -->
          <v-card class="pa-4 mb-4" elevation="3">
            <v-card-title class="d-flex justify-space-between align-center"
              ><span>{{ element.title }}</span>

              <v-btn icon :to="element.page" variant="text" color="primary">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text><component :is="element.component" /></v-card-text>
          </v-card>

          <!-- Render Diary Widget -->
          <!-- <v-card v-else class="pa-4 mb-4" elevation="3">
            <v-card-title>{{ element.title }}</v-card-title>
            <v-card-text>
              <v-textarea
                v-model="diaryEntry"
                label="Write your thoughts..."
                auto-grow
                rows="4"
                prepend-icon="mdi-pencil"
              />

              <div class="mt-4">
                <v-btn icon @click="selectedEmoji = '😊'">😊</v-btn>
                <v-btn icon @click="selectedEmoji = '😢'">😢</v-btn>
                <v-btn icon @click="selectedEmoji = '🔥'">🔥</v-btn>
                <v-btn icon @click="selectedEmoji = '🌈'">🌈</v-btn>
                <span class="ml-2">Selected: {{ selectedEmoji }}</span>
              </div>

              <v-file-input
                class="mt-4"
                label="Add photos"
                multiple
                accept="image/*"
                @change="handleImageUpload"
                prepend-icon="mdi-image"
              />

              <v-row class="mt-2" v-if="uploadedImages.length">
                <v-col
                  v-for="(img, index) in uploadedImages"
                  :key="index"
                  cols="6"
                >
                  <v-img :src="URL.createObjectURL(img)" aspect-ratio="1" />
                </v-col>
              </v-row>

              <v-text-field
                label="Search GIFs (coming soon)"
                prepend-icon="mdi-gif"
                disabled
                class="mt-4"
              />
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary">Save Entry</v-btn>
            </v-card-actions>
          </v-card> -->
        </v-col>
      </template>
    </draggable>
  </v-container>
</template>
