<template>
  <div class="account-editor">
    <div class="account-editor_title">
      <h2>Account settings</h2>
    </div>
    <div v-if="loading">Loading...</div>
    <template v-else-if="data">
      <div>
        <StringInput
          v-model="data.full_name"
          label="Fullname"
          placeholder="Your fullname"
          required
        />
        <StringInput v-model="data.username" label="Username" readonly />
        <StringInput v-model="data.id" label="ID" readonly />
        <StringInput v-model="data.company" label="Company" readonly />
        <StringInput v-model="data.position" label="Position" readonly />
      </div>
      <div class="account-editor_btn">
        <button @click="handleAccountUpdate" :disabled="noChanges">Update</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import StringInput from '@/components/reusable/StringInput.vue'
import { getUserData, changeUserData } from '@/api/user-mangement.ts'
import { USER_ID } from '@/config/local-storage-keys.ts'
import type { EditableUserInfo, UserInfo } from '@/interfaces/auth.ts'

const originalData = ref<UserInfo | null>(null)
const data = ref<UserInfo | null>(null)
const loading = ref(false)
const noChanges = computed(() => originalData.value?.full_name === data.value?.full_name)

async function fetchAccountData() {
  try {
    loading.value = true
    const userId = localStorage.getItem(USER_ID)
    const response = await getUserData(Number(userId))
    if (!response) throw new Error('Failed to fetch user data')
    originalData.value = JSON.parse(JSON.stringify(response))
    data.value = response
  } finally {
    loading.value = false
  }
}

async function handleAccountUpdate() {
  try {
    loading.value = true
    if (!data.value) throw new Error('Account data is invalid')
    const { full_name, position, company } = data.value
    if (!full_name) throw new Error('Missing full name')
    const response = await changeUserData({ full_name, position, company } as EditableUserInfo)
    originalData.value = JSON.parse(JSON.stringify(response))
    data.value = response
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await fetchAccountData()
})
</script>

<style lang="scss" scoped>
.account-editor {
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

  &_btn {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }
}
</style>
