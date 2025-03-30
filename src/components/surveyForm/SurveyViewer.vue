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
  // TODO success screen
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
@use "sass:map";
@use '@/css/base.scss' as *;

.survey-view_content {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: map.get($spacing, '8');
  background: map.get(map.get($colors, 'neutral'), 'white');
  border-radius: map.get($border-radius, 'xl');
  box-shadow: map.get($shadows, 'base');

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
  }

  &_analytics {
    margin: map.get($spacing, '8') 0;
    padding: map.get($spacing, '6');
    background-color: map.get(map.get($colors, 'neutral'), 'gray-50');
    border-radius: map.get($border-radius, 'xl');
    border: 1px solid map.get(map.get($colors, 'neutral'), 'gray-200');
    transition: $transition-smooth;

    &:hover {
      box-shadow: map.get($shadows, 'lg');
    }

    h3 {
      margin: 0 0 map.get($spacing, '6') 0;
      font-size: map.get($font-sizes, 'xl');
      font-weight: map.get($font-weights, 'semibold');
      color: map.get(map.get($colors, 'neutral'), 'gray-800');
    }

    h4 {
      margin: 0 0 map.get($spacing, '4') 0;
      font-size: map.get($font-sizes, 'lg');
      font-weight: map.get($font-weights, 'medium');
      color: map.get(map.get($colors, 'neutral'), 'gray-700');
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: map.get($spacing, '6');
    }

    .analytics-summary {
      display: flex;
      flex-direction: column;
      gap: map.get($spacing, '2');
      width: 100%;
      grid-column: 1 / -1;
      padding: map.get($spacing, '4');
      background: map.get(map.get($colors, 'neutral'), 'white');
      border-radius: map.get($border-radius, 'lg');
      border: 1px solid map.get(map.get($colors, 'neutral'), 'gray-200');

      .value {
        font-size: map.get($font-sizes, 'lg');
        font-weight: map.get($font-weights, 'medium');
        color: map.get(map.get($colors, 'neutral'), 'gray-800');
        line-height: 1.5;
      }
    }

    .analytics-fields {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: map.get($spacing, '4');

      .analytics-field-item {
        display: flex;
        flex-direction: column;
        gap: map.get($spacing, '2');
        padding: map.get($spacing, '4');
        background-color: map.get(map.get($colors, 'neutral'), 'white');
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
          font-size: map.get($font-sizes, 'base');
          color: map.get(map.get($colors, 'neutral'), 'gray-800');
          font-weight: map.get($font-weights, 'semibold');
        }
      }
    }
  }

  button {
    display: block;
    width: 100%;
    max-width: 200px;
    margin: map.get($spacing, '8') auto;
    padding: map.get($spacing, '3') map.get($spacing, '6');
    background-color: map.get(map.get($colors, 'primary'), 'base');
    color: map.get(map.get($colors, 'neutral'), 'white');
    border: none;
    border-radius: map.get($border-radius, 'lg');
    font-size: map.get($font-sizes, 'base');
    font-weight: map.get($font-weights, 'medium');
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      background-color: map.get(map.get($colors, 'primary'), 'hover');
    }
  }

  .loading {
    text-align: center;
    padding: map.get($spacing, '8');
    color: map.get(map.get($colors, 'neutral'), 'gray-500');
    font-size: map.get($font-sizes, 'lg');
  }
}

@include respond-to('md') {
  .survey-view_content {
    padding: map.get($spacing, '4');
    margin: map.get($spacing, '4');

    &_title {
      h2 {
        font-size: map.get($font-sizes, 'xl');
      }
    }

    &_analytics {
      padding: map.get($spacing, '4');
      margin: map.get($spacing, '6') 0;

      .analytics-fields {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
