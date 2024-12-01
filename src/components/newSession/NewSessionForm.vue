<template>
  <div class="new-session-form">
    <h2>Start a new feedback session</h2>
    <StringInput
      v-model="sessionTitle"
      label="Enter a title for your new session"
      placeholder="e.g. Q1 Performance review"
    />
    <button @click="handleStart">Start</button>
  </div>
  <SessionCreatedDialog :session-id="createdSession?.id" />
</template>

<script setup lang="ts">
import StringInput from '@/components/reusable/StringInput.vue'
import { ref } from 'vue'
import { startNewSession } from '@/api/feedback.ts'
import SessionCreatedDialog from '@/components/newSession/SessionCreatedDialog.vue'
import type { FeedbackSession } from '@/interfaces/feedbacks.ts'

const sessionTitle = ref()
const createdSession = ref<FeedbackSession>()

async function handleStart() {
  createdSession.value = await startNewSession(sessionTitle.value)
  window.dispatchEvent(new Event('OPEN_DIALOG'))
}
</script>

<style lang="scss" scoped>
.new-session-form {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 64px;
}
</style>
