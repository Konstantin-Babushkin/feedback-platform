<template>
  <div class="sessions-list">
    <template v-if="data">
      <SessionsPreview
        v-for="(session, index) in data"
        :key="session.id"
        :data="session"
        :index="index + 1"
      />
      <div class="sessions-list_plus-button" @click="router.push('/create-session')">
        <img src="https://www.svgrepo.com/show/532997/plus-large.svg" alt="plus sign" />
        <span>New session</span>
      </div>
    </template>
    <template v-else> No data </template>
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
.sessions-list {
  min-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &_plus-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;

    img {
      max-width: 24px;
      padding: 10px;
      border: 1px solid #9e9a9a;
      border-radius: 10px;
    }

    img,
    span {
      cursor: pointer;
    }
  }
}
</style>
