<template>
  <DialogWrapper>
    <div class="session-created-dialog">
      <div class="session-created-dialog_title">
        <h2>Thank you!</h2>
        <p>New session has been started</p>
      </div>
      <div class="session-created-dialog_controls">
        <CopyLinkButton :session-id="sessionId" title="Copy session link" />
        <RouterLink to="/">
          <button>Home</button>
        </RouterLink>
      </div>
    </div>
  </DialogWrapper>
</template>

<script setup lang="ts">
import DialogWrapper from '@/components/reusable/DialogWrapper.vue'
import CopyLinkButton from '@/components/reusable/CopyLinkButton.vue'

defineProps<{ sessionId: string | undefined }>()
</script>

<style lang="scss" scoped>
.session-created-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  &_title {
    text-align: center;
  }

  &_controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    button {
      max-width: fit-content;
    }
  }
}
</style>
