<template>
  <main class="survey-view">
    <SurveyViewer />
  </main>
</template>

<script setup lang="ts">
import SurveyViewer from '@/components/surveyForm/SurveyViewer.vue'
</script>

<style lang="scss" scoped>
.survey-view {
  display: flex;
  justify-content: center;
}
</style>
