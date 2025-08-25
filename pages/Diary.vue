<script setup lang="ts">
import DairyPageDescription from "~/components/diary/DairyPageDescription.vue";
import TodayDiary from "~/components/diary/TodayDiary.vue";
import InfoPanel from "~/components/ui/InfoPanel.vue";
import { useAuthGuard } from "~/composables/useAuthGuard";
import { useDiaryStore } from "~/stores/diary";

const diaryStore = useDiaryStore();

const { loading, userId } = useAuthGuard();
</script>

<template>
  <v-container height="100%">
    <FullscreenLoader v-if="loading" />
    <div v-else>
      <!-- Page title -->
      <h1 class="text-h4 mb-4">📓 My Diary</h1>

      <!-- Description -->
      <InfoPanel title="How this page works">
        <DairyPageDescription />
      </InfoPanel>
      <!-- Diary archive -->

      <!-- Content editor -->
      <TodayDiary />
    </div>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
}
</style>
