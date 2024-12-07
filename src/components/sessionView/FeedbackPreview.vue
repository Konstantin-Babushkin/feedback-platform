<template>
  <div class="feedback-preview">
    <div>
      <span>{{ index }}</span>
    </div>
    <div class="feedback-preview_content">
      <div class="feedback-preview_content_fields">
        <div
          class="feedback-preview_content_fields-item"
          v-for="[key, value] in Object.entries(data?.data || {})"
          :key="key"
        >
          {{ key }}: {{ value }}
        </div>
      </div>
      <span class="feedback-preview_content_time">Submitted on {{ formattedDate }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Feedback } from '@/interfaces/feedbacks.ts'
import { MONTH_NAMES } from '@/config/contstants.ts'

const props = defineProps<{
  data: Feedback
  index: number
}>()

const date = props.data.ts_created ? new Date(props.data.ts_created) : null

const formattedDate = date
  ? `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  : null
</script>

<style lang="scss" scoped>
.feedback-preview {
  display: flex;
  width: 100%;
  gap: 12px;

  &_content {
    width: 100%;

    &_fields {
    }

    &_time {
      color: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
