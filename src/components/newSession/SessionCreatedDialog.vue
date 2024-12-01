<template>
  <DialogWrapper>
    <div class="session-created-dialog">
      <div class="session-created-dialog_title">
        <h2>Thank you!</h2>
        <p>New session has been started</p>
      </div>
      <div class="session-created-dialog_controls">
        <button @click="copyToClipboard">Copy survey link</button>
        <RouterLink to="/">
          <button>Home</button>
        </RouterLink>
      </div>
    </div>
  </DialogWrapper>
</template>

<script setup lang="ts">
import DialogWrapper from '@/components/reusable/DialogWrapper.vue'
import { toRefs } from 'vue'

const props = defineProps<{ sessionId: string | undefined }>()

const { sessionId } = toRefs(props)

const copyToClipboard = () => {
  try {
    if (!sessionId.value) throw new Error('Missing session id')

    const sessionLink = `http://localhost:5173/session/${sessionId.value}`

    const tempInput = document.createElement('input')
    tempInput.value = sessionLink
    document.body.appendChild(tempInput)

    tempInput.select()
    tempInput.setSelectionRange(0, 99999)

    const successful = document.execCommand('copy')

    if (successful) window.alert('Copied link to clipboard')
    else throw new Error('Failed to copy')

    document.body.removeChild(tempInput)
  } catch (err) {
    console.error('Failed to copy: ', err)
    window.alert('Failed to copy link to clipboard')
  }
}
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
