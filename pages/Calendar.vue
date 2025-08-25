<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAuthGuard } from "~/composables/useAuthGuard";
import { formatDateTimeParts } from "~/composables/useCalendar";
import { useCalendarStore } from "~/stores/calendar";
import {
  dateFormatOptions,
  localeOptions,
  SnackbarType,
  timezoneOptions,
  type DateFormatType,
  type LocaleCode,
  type TimezoneCode,
} from "~/types";

const store = useCalendarStore();

const selectedTimezone = ref<TimezoneCode>(store.$state.timezone);
const selectedFormat = ref<DateFormatType>(store.$state.format);
const selectedLocale = ref<LocaleCode>(store.$state.locale);

const currentDateTime = ref(new Date());
const showModifConfirm = ref(false);

const { loading, userId } = useAuthGuard();

onMounted(() => {
  updateTime();
  setInterval(updateTime, 60000);
});

// Live preview based on current selections
const formattedDateTime = computed(() =>
  formatDateTimeParts(
    currentDateTime.value,
    selectedLocale.value,
    selectedTimezone.value,
    selectedFormat.value as DateFormatType
  )
);

// Check if current selections match store
const isSaved = computed(
  () =>
    selectedTimezone.value === store.$state.timezone &&
    selectedFormat.value === store.$state.format &&
    selectedLocale.value === store.$state.locale
);

function updateTime() {
  currentDateTime.value = new Date();
}

function saveSettings() {
  store.setTimezone(selectedTimezone.value);
  store.setFormat(selectedFormat.value);
  store.setLocale(selectedLocale.value);
  showModifConfirm.value = true;
}
</script>

<template>
  <v-container>
    <FullscreenLoader v-if="loading" />

    <v-row v-else>
      <v-col cols="12">
        <h2>📅 Calendar Settings</h2>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="selectedTimezone"
          :items="timezoneOptions"
          item-title="label"
          item-value="value"
          label="Select Timezone"
          outlined
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="selectedFormat"
          :items="dateFormatOptions"
          label="Select Format"
          outlined
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="selectedLocale"
          :items="localeOptions"
          item-title="label"
          item-value="value"
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
              {{
                localeOptions.find(
                  (opt: { value: string; label: string }) =>
                    opt.value === selectedLocale
                )?.label
              }}
            </div>
            <div>Format: {{ selectedFormat }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- ✅  Notification -->
    <AppSnackbar
      v-model="showModifConfirm"
      message="Modifications saved."
      :type="SnackbarType.success"
    />
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
