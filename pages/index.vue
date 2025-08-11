<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const widgets = ref([
  { type: "tasks", title: "🧭 Tasks", text: "Manage your tasks here." },
  {
    type: "calendar",
    title: "📅 Calendar",
    text: "Your schedule at a glance.",
  },
  { type: "notes", title: "📝 Notes", text: "Jot down ideas and thoughts." },
  { type: "books", title: "📚 Books", text: "Track your reading list." },
  { type: "weather", title: "🌤️ Weather", text: "Current weather info." },
  { type: "diary", title: "📔 Diary" }, // ← New Diary Widget
]);

const diaryEntry = ref("");
const uploadedImages = ref([]);
const selectedEmoji = ref("");

function handleImageUpload(files) {
  uploadedImages.value = Array.from(files);
}
</script>

<template>
  <v-container fluid>
    <div class="text-center pa-10">
      <h1>Welcome to Galaxy UI ✨</h1>
      <p>Drag and drop your widgets to customize your dashboard.</p>
    </div>

    <draggable
      v-model="widgets"
      item-key="title"
      class="d-flex flex-wrap"
      :animation="200"
    >
      <template #item="{ element }">
        <v-col cols="12" md="6">
          <!-- Render standard widgets -->
          <v-card
            v-if="element.type !== 'diary'"
            class="pa-4 mb-4"
            elevation="3"
          >
            <v-card-title>{{ element.title }}</v-card-title>
            <v-card-text>{{ element.text }}</v-card-text>
          </v-card>

          <!-- Render Diary Widget -->
          <v-card v-else class="pa-4 mb-4" elevation="3">
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
          </v-card>
        </v-col>
      </template>
    </draggable>
  </v-container>
</template>
