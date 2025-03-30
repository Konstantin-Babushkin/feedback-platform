<template>
  <main class="dashboard-view">
    <div class="dashboard-view_content">
      <TotalSummary />
      <SessionsList />
    </div>
  </main>
</template>

<script setup lang="ts">
import TotalSummary from '@/components/dashboard/TotalSummary.vue'
import SessionsList from '@/components/dashboard/SessionsList.vue'
</script>

<style lang="scss" scoped>
@use "sass:map";
@use '@/css/base.scss' as *;

.dashboard-view {
  display: flex;
  justify-content: center;
  padding: map.get($spacing, '8');
  min-height: 100vh;

  &_content {
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: map.get($spacing, '8');
  }
}

@include respond-to('md') {
  .dashboard-view {
    padding: map.get($spacing, '4');
  }
}
</style>
