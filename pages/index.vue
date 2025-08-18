<script setup lang="ts">
import { markRaw, ref } from "vue";
import draggable from "vuedraggable";

import BooksWidget from "~/components/BooksWidget.vue";
import CalendarWidget from "~/components/CalendarWidget.vue";
import DiaryWidget from "~/components/DiaryWidget.vue";
import NotesWidget from "~/components/NotesWidget.vue";
import TodosWidget from "~/components/TodosWidget.vue";
import WeatherWidget from "~/components/WeatherWidget.vue";
import { WidgetType, type DashboardWidget } from "~/types";

const widgets = ref<DashboardWidget[]>([
  {
    type: WidgetType.todos,
    title: "🧭 Todo list",
    component: markRaw(TodosWidget),
    page: `/${WidgetType.todos}`,
  },
  {
    type: WidgetType.calendar,
    title: "📅 Calendar",
    component: markRaw(CalendarWidget),
    page: `/${WidgetType.calendar}`,
  },
  {
    type: WidgetType.notes,
    title: "📝 Notes",
    component: markRaw(NotesWidget),
    page: `/${WidgetType.notes}`,
  },
  {
    type: WidgetType.books,
    title: "📚 Books",
    component: markRaw(BooksWidget),
    page: `/${WidgetType.books}`,
  },
  {
    type: WidgetType.weather,
    title: "🌤️ Weather",
    component: markRaw(WeatherWidget),
    page: `/${WidgetType.weather}`,
  },
  {
    type: WidgetType.diary,
    title: "📔 Diary",
    component: markRaw(DiaryWidget),
    page: `/${WidgetType.diary}`,
  },
]);
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
        </v-col>
      </template>
    </draggable>
  </v-container>
</template>
