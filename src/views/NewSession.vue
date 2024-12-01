<template>
  <main class="new-session-view">
    <NewSessionForm />
  </main>
</template>

<script setup lang="ts">
import NewSessionForm from '@/components/newSession/NewSessionForm.vue'
</script>

<style lang="scss" scoped>
.new-session-view {
  display: flex;
  justify-content: center;
}
</style>
