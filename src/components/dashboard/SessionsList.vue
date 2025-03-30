<template>
  <div class="sessions-list">
    <div class="sessions-list_title">
      <h2>Sessions</h2>
      <button class="sessions-list_title_button sessions-list_title_button--positive" @click="router.push('/create-session')">
        <span>+ New session</span>
      </button>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="sessions-list_content">
      <SessionsPreview v-for="(session, index) in data" :key="session.id" :data="session" :index="index + 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getMySessions } from '@/api/feedback.ts'
import type { FeedbackSession } from '@/interfaces/feedbacks.ts'
import SessionsPreview from '@/components/dashboard/SessionsPreview.vue'
import router from '@/router'

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
@use "sass:map";
@use '@/css/base.scss' as *;

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: map.get($spacing, '6');

  &_title {
    @include flex-between;
    margin-bottom: map.get($spacing, '4');

    h2 {
      margin: 0;
      font-size: map.get($font-sizes, 'xl');
      font-weight: map.get($font-weights, 'semibold');
      color: map.get(map.get($colors, 'neutral'), 'gray-800');
    }

    &_button {
      @include primary-button;
      display: flex;
      align-items: center;
      gap: map.get($spacing, '2');

      img {
        width: map.get($spacing, '4');
        height: map.get($spacing, '4');
      }
    }
  }

  &_content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: map.get($spacing, '6');
  }

  .loading {
    @include loading-text;
  }
}

@include respond-to('md') {
  .sessions-list {
    gap: map.get($spacing, '4');

    &_title {
      margin-bottom: map.get($spacing, '3');
    }

    &_content {
      gap: map.get($spacing, '4');
    }
  }
}
</style>
