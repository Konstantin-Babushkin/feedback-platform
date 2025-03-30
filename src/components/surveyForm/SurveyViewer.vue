<template>
  <div class="survey-view_content">
    <div class="survey-view_content_title">
      <h2>Title: {{ data?.header }}</h2>
    </div>
    <div v-if="analytics" class="survey-view_content_analytics">
      <h3>Performance Analytics</h3>
      <div class="analytics-grid">
        <div v-if="analytics.summarized" class="analytics-summary">
          <h4>Summary:</h4>
          <span class="value">{{ analytics.summarized }}</span>
        </div>
        <div v-if="analytics.fields?.length" class="analytics-fields">
          <h4>Metrics</h4>
          <div v-for="field in analytics.fields" :key="field.name" class="analytics-field-item">
            <span class="label">{{ field.label }}</span>
            <span class="value">{{ field.value }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-for="question in data?.fields" :key="question.name">
        <SelectInput
          v-if="question.type === 'select'"
          v-model="question.value"
          :label="question.label"
          :required="question.required"
          :options="question.options"
        />
        <StringInput
          v-else-if="question.type === 'textarea'"
          v-model="question.value"
          :label="question.label"
          :required="question.required"
          placeholder="Enter text"
        />
      </div>
    </div>
    <button @click="handleSubmit">Submit</button>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { getFeedbackForm, getPerformanceAnalytics, submitFeedback } from '@/api/feedback.ts'
import type { FeedbackForm, PerformanceAnalytics } from '@/interfaces/feedbacks.ts'
import router from '@/router'
import StringInput from '@/components/reusable/StringInput.vue'
import SelectInput from '@/components/reusable/SelectInput.vue'

const data = reactive<FeedbackForm>({} as FeedbackForm)
const analytics = ref<PerformanceAnalytics>({} as PerformanceAnalytics)
const loading = ref(false)
const sessionId = computed(() => router.currentRoute.value.fullPath.split('/survey/')[1])
async function getSurveyForm() {
  try {
    loading.value = true
    const analyticsResponse = await getPerformanceAnalytics(sessionId.value)
    if (analyticsResponse) {
      analytics.value = analyticsResponse
    }
    const form = await getFeedbackForm(sessionId.value)
    if (!form) throw new Error('No session found')
    data.header = form.header
    data.fields = form.fields.map((input) => ({
      ...input,
      value: null,
    }))
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  const formData = Object.fromEntries(data.fields.map((input) => [input.name, input.value]))
  await submitFeedback(sessionId.value, {
    data: formData,
  })
}

watch(
  () => sessionId.value,
  async () => {
    await getSurveyForm()
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.survey-view_content {
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

  &_analytics {
    margin: 24px 0;
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 8px;

    h3 {
      margin: 0 0 16px 0;
      font-size: 1.2rem;
      color: #333;
    }

    h4 {
      margin: 0 0 12px 0;
      font-size: 1rem;
      color: #444;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .analytics-summary {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      grid-column: 1 / -1;

      .value {
        font-size: 1.1rem;
        font-weight: 500;
        color: #333;
        width: 100%;
      }
    }

    .analytics-fields {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .analytics-field-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
        background-color: white;
        border-radius: 4px;

        .label {
          font-size: 0.9rem;
          color: #666;
        }

        .value {
          font-size: 1rem;
          color: #333;
        }
      }
    }
  }
}
</style>
