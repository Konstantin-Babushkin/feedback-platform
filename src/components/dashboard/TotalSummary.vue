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
@use "sass:map";
@use '@/css/base.scss' as *;

.total-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: map.get($spacing, '6');
  padding: map.get($spacing, '6');
  background: map.get(map.get($colors, 'neutral'), 'white');
  border-radius: map.get($border-radius, 'xl');
  box-shadow: map.get($shadows, 'base');

  &_item {
    display: flex;
    flex-direction: column;
    gap: map.get($spacing, '2');
    padding: map.get($spacing, '4');
    background-color: map.get(map.get($colors, 'neutral'), 'gray-50');
    border-radius: map.get($border-radius, 'lg');
    border: 1px solid map.get(map.get($colors, 'neutral'), 'gray-200');
    transition: $transition-base;

    &:hover {
      box-shadow: map.get($shadows, 'md');
    }

    .label {
      font-size: map.get($font-sizes, 'sm');
      color: map.get(map.get($colors, 'neutral'), 'gray-500');
      font-weight: map.get($font-weights, 'medium');
    }

    .value {
      font-size: map.get($font-sizes, '2xl');
      color: map.get(map.get($colors, 'neutral'), 'gray-800');
      font-weight: map.get($font-weights, 'semibold');
    }
  }
}

@include respond-to('md') {
  .total-summary {
    padding: map.get($spacing, '4');
    gap: map.get($spacing, '4');

    &_item {
      padding: map.get($spacing, '3');
    }
  }
}
</style>
