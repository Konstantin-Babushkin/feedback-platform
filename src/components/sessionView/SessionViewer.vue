<template>
  <div class="session-view_content">
    <div class="session-view_content_title">
      <h2>Title: {{ data?.title }}</h2>
      <span>{{ sessionIsActive ? 'OPEN' : 'CLOSED' }}</span>
    </div>
    <CopyLinkButton v-if="sessionIsActive" :session-id="sessionId" title="Copy survey link" />

    <div v-if="loading">Loading...</div>
    <template v-if="sessionIsActive">
      <div class="session-view_content_open">
        <span>Results will be shown when you close the session</span>
        <button @click="handleCloseSession">Close session</button>
      </div>
    </template>
    <template v-else>
      <div class="session-view_content_closed">
        <span><strong>Responses:</strong> {{ data?.responses.length }} </span>
        <div class="session-view_content_closed_summary">
          <strong>Summary:</strong>
          <span>{{ data?.gpt_summary }} </span>
        </div>

        <!--      Feedback List -->
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { endSession, getMySessions } from '@/api/feedback.ts'
import type { FeedbackSession } from '@/interfaces/feedbacks.ts'
import router from '@/router'
import CopyLinkButton from '@/components/reusable/CopyLinkButton.vue'

const data = ref<FeedbackSession | null>(null)
const loading = ref(false)
const sessionId = computed(() => router.currentRoute.value.fullPath.split('/session/')[1])
const sessionIsActive = computed(() => data.value?.is_active)
async function getSessionData() {
  try {
    loading.value = true
    const response = await getMySessions()
    const sessionData = response.find((session) => session.id === sessionId.value)
    if (!sessionData) throw new Error('No session found')
    data.value = sessionData
  } finally {
    loading.value = false
  }
}

async function handleCloseSession() {
  await endSession(sessionId.value)
  await getSessionData()
}

watch(
  () => sessionId.value,
  async () => {
    await getSessionData()
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.session-view_content {
  max-width: 1200px;
  width: 100%;

  &_title {
    display: flex;
    gap: 24px;
    align-items: center;
    margin-block: 16px;

    h2 {
      margin: 0;
    }
  }

  &_open {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  &_closed {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &_summary {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }
}
</style>
