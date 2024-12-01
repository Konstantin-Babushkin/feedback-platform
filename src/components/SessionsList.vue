<template>
  <div class="sessions-list">
    <template v-if="data">
      <SessionsPreview
        v-for="(session, index) in data"
        :key="session.id"
        :data="session"
        :index="index + 1"
      />
    </template>
    <template v-else> No data </template>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getMySessions } from '@/api/feedback.ts'
import type { FeedbackSession } from '@/interfaces/feedbacks.ts'
import SessionsPreview from '@/components/SessionsPreview.vue'

const data = ref<FeedbackSession[] | null>(null)
const loading = ref(false)

async function getMySessionsList() {
  try {
    loading.value = true
    data.value = await getMySessions()
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await getMySessionsList()
})
</script>

<style lang="scss" scoped>
.sessions-list {
  min-width: 600px;
  width: 100%;
}
</style>
