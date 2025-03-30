<template>
  <div class="session-view_content">
    <div class="session-view_content_title">
      <h2>Title: {{ data?.title }}</h2>
      <div class="session-viewer_header_status" :class="{
        'session-viewer_header_status--open': sessionIsActive,
        'session-viewer_header_status--closed': !sessionIsActive
      }">
        <span>{{ sessionIsActive ? 'OPEN' : 'CLOSED' }}</span>
      </div>
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
@use "sass:map";
@use '@/css/base.scss' as *;

.session-view_content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: map.get($spacing, '8');
  background: map.get(map.get($colors, 'neutral'), 'white');
  border-radius: map.get($border-radius, 'xl');
  box-shadow: map.get($shadows, 'base');

  button {
    @include primary-button;
  }

  &_title {
    @include flex-center;
    gap: map.get($spacing, '6');
    margin-bottom: map.get($spacing, '8');
    padding-bottom: map.get($spacing, '4');
    border-bottom: 2px solid map.get(map.get($colors, 'neutral'), 'gray-200');

    h2 {
      margin: 0;
      font-size: map.get($font-sizes, '2xl');
      font-weight: map.get($font-weights, 'semibold');
      color: map.get(map.get($colors, 'neutral'), 'gray-800');
    }

    .session-viewer_header_status {
      @include status-badge;
    }
  }

  &_open {
    @include flex-center;
    flex-direction: column;
    gap: map.get($spacing, '6');
    padding: map.get($spacing, '8');
    text-align: center;
    color: map.get(map.get($colors, 'neutral'), 'gray-600');
    font-size: map.get($font-sizes, 'lg');

    button {
      @include error-button;
    }
  }

  &_closed {
    display: flex;
    flex-direction: column;
    gap: map.get($spacing, '6');

    span {
      @include value-text;
    }

    &_summary {
      @include summary-box;
    }

    &_feedbacks {
      display: flex;
      flex-direction: column;
      gap: map.get($spacing, '6');
    }
  }

  .loading {
    @include loading-text;
  }
}

@include respond-to('md') {
  .session-view_content {
    padding: map.get($spacing, '4');
    margin: map.get($spacing, '4');

    &_title h2 {
      font-size: map.get($font-sizes, 'xl');
    }

    &_open {
      padding: map.get($spacing, '4');
    }

    &_closed {
      gap: map.get($spacing, '4');

      &_summary {
        padding: map.get($spacing, '3');
      }

      &_feedbacks {
        gap: map.get($spacing, '4');
      }
    }
  }
}
</style>
