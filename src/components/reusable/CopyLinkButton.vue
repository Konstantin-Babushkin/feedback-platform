<template>
  <button @click="copyToClipboard">Copy survey link</button>
</template>

<script setup lang="ts">
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

<style lang="scss" scoped></style>
