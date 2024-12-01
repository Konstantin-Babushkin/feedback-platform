<template>
  <div class="total-summary">
    <h2>Total summary</h2>
    <span>{{ summaryText }}</span>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getMyTotalSummary } from '@/api/feedback.ts'

const summaryText = ref<string | null>(null)
const loading = ref(false)

async function getTotalSummary() {
  try {
    loading.value = true
    const response = await getMyTotalSummary()
    summaryText.value = response.total
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await getTotalSummary()
})
</script>

<style lang="scss" scoped>
.total-summary {
}
</style>
