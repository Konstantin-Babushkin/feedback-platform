<template>
  <main class="session-view">
    <SessionViewer />
  </main>
</template>

<script setup lang="ts">
import SessionViewer from '@/components/sessionView/SessionViewer.vue'
</script>

<style lang="scss" scoped>
.session-view {
  display: flex;
  justify-content: center;
}
</style>
