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

        <div class="session-view_content_closed_feedbacks">
          <div v-for="(feedback, index) in parsedFeedbackData" :key="feedback.ts_created">
            <FeedbackPreview :data="feedback" :index="index + 1" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { endSession, getMySessions } from '@/api/feedback.ts'
import type { Feedback, FeedbackSession } from '@/interfaces/feedbacks.ts'
import router from '@/router'
import CopyLinkButton from '@/components/reusable/CopyLinkButton.vue'
import FeedbackPreview from '@/components/sessionView/FeedbackPreview.vue'

const data = ref<FeedbackSession | null>(null)
const loading = ref(false)
const sessionId = computed(() => router.currentRoute.value.fullPath.split('/session/')[1])
const sessionIsActive = computed(() => data.value?.is_active)

const FEEDBACKS_MOCK = [
  {
    ts_created: '2024-12-01T15:10:07.681589',
    data: '{ "perf_scale":10, "perf_scale_input":"sdfsd sdfsdf", "overall_score":9, "overall_score_input":"sdjfldld dldkjsldf" }',
  },
  {
    ts_created: '2024-12-03T15:10:07.681589',
    data: '{"perf_scale":9,"perf_scale_input":"eewew","overall_score":3,"overall_score_input":"rrrr"}',
  },
  {
    ts_created: '2024-12-05T15:10:07.681589',
    data: '{ "perf_scale":7, "perf_scale_input":"asd asd asd as dasdasssda", "overall_score":4, "overall_score_input":"sd asdasd dsda df hhj jhjhf" }',
  },
]

const parsedFeedbackData = computed(() =>
  FEEDBACKS_MOCK.map(
    (item) =>
      ({
        ts_created: item.ts_created,
        data: JSON.parse(item.data),
      }) as Feedback,
  ),
)

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

    &_feedbacks {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
}
</style>
