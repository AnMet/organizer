<script setup>
import { computed, onMounted, ref } from "vue";

const selectedTimezone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone);
const selectedFormat = ref("full"); // Options: 'full', 'long', 'medium', 'short'
const currentDateTime = ref(new Date());

const formattedDateTime = computed(() => {
  return currentDateTime.value.toLocaleString("en-US", {
    timeZone: selectedTimezone.value,
    dateStyle: selectedFormat.value,
    timeStyle: selectedFormat.value,
  });
});

function updateTime() {
  currentDateTime.value = new Date();
}

onMounted(() => {
  updateTime();
  setInterval(updateTime, 60000);
});

const timezones = [
  "UTC",
  "Europe/Paris",
  "America/New_York",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Europe/Moscow",
];
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>📅 Calendar Settings</h2>
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="selectedTimezone"
          :items="timezones"
          label="Select Timezone"
          outlined
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="selectedFormat"
          :items="['full', 'long', 'medium', 'short']"
          label="Select Format"
          outlined
        />
      </v-col>

      <v-col cols="12">
        <v-card class="pa-4" elevation="2">
          <v-card-title>🕒 Current Date & Time</v-card-title>
          <v-card-text>
            <div class="text-h6">{{ formattedDateTime }}</div>
            <div class="text-caption mt-2">
              Timezone: {{ selectedTimezone }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
