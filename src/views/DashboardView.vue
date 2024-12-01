<template>
  <main class="dashboard-view">
    <div class="dashboard-view_content">
      <TotalSummary />
      <SessionsList />
    </div>
  </main>
</template>

<script setup lang="ts">
import TotalSummary from '@/components/TotalSummary.vue'
import SessionsList from '@/components/SessionsList.vue'
</script>

<style lang="scss" scoped>
.dashboard-view {
  display: flex;
  justify-content: center;

  &_content {
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 64px;
  }
}
</style>
