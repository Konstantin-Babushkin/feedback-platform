<template>
  <div class="string-input-container">
    <label v-if="label" class="string-input-container_label">{{ label }}</label>
    <input
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
      class="string-input-container_input"
      :class="{ 'string-input-container_input--readonly': readonly }"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  placeholder?: string
  required?: boolean
  readonly?: boolean
}

defineProps<Props>()
defineModel({ type: String, required: true })
const emit = defineEmits(['update:modelValue'])
const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>

<style scoped lang="scss">
.string-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Arial', sans-serif;

  &_label {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
  }

  &_input {
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-family: 'Arial', sans-serif;
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;

    &:focus {
      border-color: #888;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    }

    &--readonly {
      background-color: #c8c8c8;

      &:focus {
        border-color: #c8c8c8;
        box-shadow: none;
      }
    }
  }
}
</style>
