<script setup>
import { onMounted, ref } from "vue";

const date = ref("");
const time = ref("");
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function updateTime() {
  const now = new Date();

  date.value = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  time.value = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

onMounted(() => {
  updateTime();
  setInterval(updateTime, 60000);
});
</script>

<template>
  <div>
    <v-card class="pa-4" elevation="1" color="grey-lighten-4">
      <v-row align="center">
        <v-col cols="12" md="5">
          <div class="text-body-1 font-weight-medium">{{ date }}</div>
        </v-col>

        <v-col cols="12" md="2">
          <div class="text-body-1 font-weight-medium">
            {{ time }}
          </div>
        </v-col>

        <v-col cols="12" md="5" class="d-flex align-center">
          <span class="mr-1" style="font-size: 1rem">🌍</span>
          <div class="text-body-1 font-weight-medium">{{ timezone }}</div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
