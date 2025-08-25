<template>
  <div v-if="visible" class="fullscreen-loader">
    <v-progress-circular :size="size" :color="color" indeterminate />
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  size: {
    type: [Number, String],
    default: 40,
  },
  color: {
    type: String,
    default: "primary",
  },
});
</script>

<style scoped>
.fullscreen-loader {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
