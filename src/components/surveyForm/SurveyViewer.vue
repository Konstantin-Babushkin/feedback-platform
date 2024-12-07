<template>
  <div class="survey-view_content">
    <div class="survey-view_content_title">
      <h2>Title: {{ data?.header }}</h2>
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
import { getFeedbackForm, submitFeedback } from '@/api/feedback.ts'
import type { FeedbackForm } from '@/interfaces/feedbacks.ts'
import router from '@/router'
import StringInput from '@/components/reusable/StringInput.vue'
import SelectInput from '@/components/reusable/SelectInput.vue'

const data = reactive<FeedbackForm>({} as FeedbackForm)
const loading = ref(false)
const sessionId = computed(() => router.currentRoute.value.fullPath.split('/survey/')[1])
async function getSurveyForm() {
  try {
    loading.value = true
    const response = await getFeedbackForm(sessionId.value)
    if (!response) throw new Error('No session found')
    data.header = response.header
    data.fields = response.fields.map((input) => ({
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
}
</style>
