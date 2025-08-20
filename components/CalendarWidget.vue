<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { formatDateTimeParts } from "~/composables/useCalendar";
import { useCalendarStore } from "~/stores/calendar";

const store = useCalendarStore();
const currentDateTime = ref(new Date());

const formattedDateTime = computed(() =>
  formatDateTimeParts(
    currentDateTime.value,
    store.$state.locale,
    store.$state.timezone,
    store.$state.format
  )
);

onMounted(() => {
  setInterval(() => {
    currentDateTime.value = new Date();
  }, 60000);
});
</script>

<template>
  <v-card class="pa-4" elevation="1" color="grey-lighten-4">
    <client-only>
      <v-row align="center">
        <v-col cols="12" md="5">
          <div class="text-body-1 font-weight-medium">
            {{ formattedDateTime.date }}
          </div>
        </v-col>

        <v-col cols="12" md="2">
          <div class="text-body-1 font-weight-medium">
            {{ formattedDateTime.time }}
          </div>
        </v-col>

        <v-col cols="12" md="5" class="d-flex align-center">
          <span class="mr-1" style="font-size: 1rem">🌍</span>
          <div class="text-body-1 font-weight-medium">
            {{ store.$state.timezone }}
          </div>
        </v-col>
      </v-row>
    </client-only>
  </v-card>
</template>
