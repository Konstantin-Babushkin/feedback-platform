<template>
  <div class="sessions-preview" @click="router.push(`/session/${data.id}`)">
    <div>
      <span>{{ index }}</span>
    </div>
    <div class="sessions-preview_content">
      <div class="sessions-preview_content_required">
        <span class="sessions-preview_content_required_title">{{ data.title }}</span>
        <span
          class="sessions-preview_content_required_status"
          :class="{
            'sessions-preview_content_required_status--open': data.is_active,
            'sessions-preview_content_required_status--closed': !data.is_active,
          }"
          >{{ data.is_active ? 'OPEN' : 'CLOSED' }}</span
        >
      </div>
      <div v-if="!data.is_active" class="sessions-preview_content_closed-info">
        <span class="sessions-preview_content_closed-info_responses-count"
          >Responses {{ data?.responses.length }}</span
        >
        <span class="sessions-preview_content_closed-info_time">on {{ formattedDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FeedbackSession } from '@/interfaces/feedbacks.ts'
import { MONTH_NAMES } from '@/config/contstants.ts'
import router from '@/router'

const props = defineProps<{
  data: FeedbackSession
  index: number
}>()

const date = props.data.ts_deactivated ? new Date(props.data.ts_deactivated) : null

const formattedDate = date
  ? `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  : null
</script>

<style lang="scss" scoped>
.sessions-preview {
  display: flex;
  width: 100%;
  gap: 12px;
  cursor: pointer;

  &_content {
    width: 100%;

    &_required {
      display: flex;
      width: 100%;
      justify-content: space-between;

      &_title {
        font-weight: 600;
      }

      &_status {
        &--open {
          color: rgba(0, 128, 0, 0.6);
        }
        &--closed {
          color: rgba(255, 0, 0, 0.6);
        }
      }
    }

    &_closed-info {
      display: flex;
      width: 100%;
      justify-content: space-between;

      &_responses-count {
        color: rgba(0, 0, 0, 0.7);
      }

      &_time {
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
</style>
