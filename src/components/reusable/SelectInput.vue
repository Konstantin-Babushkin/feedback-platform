<template>
  <div class="string-input-container">
    <label v-if="label" class="label">{{ label }}</label>
    <select
      v-if="options && options.length > 0"
      :value="modelValue"
      @change="onSelect"
      :required="required"
      class="select"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <input
      v-else
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
      class="input"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  placeholder?: string
  required?: boolean
  readonly?: boolean
  options?: (string | number)[] // Array of string or number
}

defineProps<Props>()
defineModel<number | string | null>({ required: true })
const emit = defineEmits(['update:modelValue'])

// Handles input for text
const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}

const onSelect = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const value = select.value
  const coercedValue = isNaN(Number(value)) ? value : Number(value)
  emit('update:modelValue', coercedValue)
}
</script>

<style scoped lang="scss">
.string-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Arial', sans-serif;
}

.label {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.input,
.select {
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
}
</style>
