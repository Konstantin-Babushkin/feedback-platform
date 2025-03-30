<template>
  <div class="sessions-preview" @click="router.push(`/session/${data.id}`)">
    <div>
      <span>{{ index }}</span>
    </div>
    <div class="sessions-preview_content">
      <div class="sessions-preview_content_required">
        <div class="sessions-preview_content_required_title">
          <h3>{{ data.title }}</h3>
          <div class="sessions-preview_content_required_title_status" :class="{
            'sessions-preview_content_required_title_status--open': data.is_active,
            'sessions-preview_content_required_title_status--closed': !data.is_active
          }">
            {{ data.is_active ? 'Open' : 'Closed' }}
          </div>
        </div>
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
@use "sass:map";
@use '@/css/base.scss' as *;

.sessions-preview {
  width: 100%;
  padding: map.get($spacing, '4');
  background-color: map.get(map.get($colors, 'neutral'), 'white');
  border-radius: map.get($border-radius, 'lg');
  border: 1px solid map.get(map.get($colors, 'neutral'), 'gray-200');
  transition: $transition-base;

  &:hover {
    box-shadow: map.get($shadows, 'md');
  }

  &_content {
    display: flex;
    flex-direction: column;
    gap: map.get($spacing, '4');

    &_required {
      display: flex;
      flex-direction: column;
      gap: map.get($spacing, '2');

      &_title {
        @include flex-between;
        gap: map.get($spacing, '2');

        h3 {
          margin: 0;
          font-size: map.get($font-sizes, 'lg');
          font-weight: map.get($font-weights, 'semibold');
          color: map.get(map.get($colors, 'neutral'), 'gray-800');
        }

        &_status {
          @include status-badge;
        }
      }

      &_label {
        @include label-text;
      }

      &_value {
        @include value-text;
      }
    }

    &_closed-info {
      @include info-text;
    }
  }

  &_footer {
    @include flex-between;
    margin-top: auto;
    padding-top: map.get($spacing, '4');
    border-top: 1px solid map.get(map.get($colors, 'neutral'), 'gray-200');

    &_date {
      @include date-text;
    }

    &_responses {
      @include responses-text;
    }
  }
}

@include respond-to('md') {
  .sessions-preview {
    padding: map.get($spacing, '3');

    &_content {
      gap: map.get($spacing, '3');
    }
  }
}
</style>
