<script setup>
import { computed, onMounted, ref } from "vue";
import {
  formatDateTimeParts,
  formats,
  locales,
  timezones,
} from "~/composables/useCalendar";
import { useCalendarStore } from "~/stores/CalendarStore";

const store = useCalendarStore();

const selectedTimezone = ref(store.$state.timezone);
const selectedFormat = ref(store.$state.format);
const selectedLocal = ref(store.$state.local);

const currentDateTime = ref(new Date());
const showToast = ref(false);

// Live preview based on current selections
const formattedDateTime = computed(() =>
  formatDateTimeParts(
    currentDateTime.value,
    selectedLocal.value,
    selectedTimezone.value,
    selectedFormat.value
  )
);

// Check if current selections match store
const isSaved = computed(
  () =>
    selectedTimezone.value === store.$state.timezone &&
    selectedFormat.value === store.$state.format &&
    selectedLocal.value === store.$state.local
);

function updateTime() {
  currentDateTime.value = new Date();
}

function saveSettings() {
  store.setTimezone(selectedTimezone.value);
  store.setFormat(selectedFormat.value);
  store.setLocal(selectedLocal.value); // Ensure this method exists in your store
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 3000);
}

onMounted(() => {
  updateTime();
  setInterval(updateTime, 60000);
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>📅 Calendar Settings</h2>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="selectedTimezone"
          :items="timezones"
          label="Select Timezone"
          outlined
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="selectedFormat"
          :items="formats"
          label="Select Format"
          outlined
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="selectedLocal"
          :items="locales"
          item-title="label"
          label="Select Language"
          outlined
        />
      </v-col>

      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" @click="saveSettings">💾 Save</v-btn>
      </v-col>

      <v-col cols="12">
        <v-card
          class="pa-4 mt-4"
          elevation="2"
          :class="isSaved ? 'border-green' : 'border-grey'"
        >
          <v-card-title class="d-flex justify-space-between align-center">
            <span>🕒 Current Date & Time preview</span>
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-chip
                  v-bind="props"
                  :color="isSaved ? 'success' : 'grey'"
                  variant="elevated"
                  size="small"
                >
                  {{ isSaved ? "Saved" : "Draft" }}
                </v-chip>
              </template>
              <span>
                {{ isSaved ? "Settings are saved" : "Unsaved changes" }}
              </span>
            </v-tooltip>
          </v-card-title>

          <v-row align="center" class="ma-2">
            <v-col cols="12" md="4">
              <div class="text-h6">{{ formattedDateTime.date }}</div>
            </v-col>

            <v-col cols="12" md="4">
              <div class="text-h6">{{ formattedDateTime.time }}</div>
            </v-col>

            <v-col cols="12" md="4" class="d-flex align-center">
              <span class="mr-1" style="font-size: 1rem">🌍</span>
              <div class="text-h6">{{ selectedTimezone }}</div>
            </v-col>
          </v-row>

          <div class="text-caption mt-2 ma-2">
            <div>
              Local:
              {{ locales.find((l) => l.value === selectedLocal).label }}
            </div>
            <div>Format: {{ selectedFormat }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- ✅ Toast Notification -->
    <v-snackbar
      v-model="showToast"
      color="success"
      timeout="3000"
      location="bottom right"
    >
      ✅ Modifications saved
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.border-green {
  border: 2px solid #4caf50;
  border-radius: 8px;
}
.border-grey {
  border: 2px solid #ccc;
  border-radius: 8px;
}
</style>
