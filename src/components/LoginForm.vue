<template>
  <div class="login-form">
    <div class="form-container">
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" placeholder="Enter your username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" placeholder="Enter your password" />
      </div>
      <button @click="trySignIn" :disabled="!username || !password" class="sign-in-button">
        Sign in
      </button>
    </div>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { me, signIn } from '@/api/auth.ts'
import { AUTH_TOKEN, USER_ID } from '@/config/local-storage-keys.ts'
import { useRouter } from 'vue-router'

const username = ref<string | null>(null)
const password = ref<string | null>(null)
const loading = ref(false)
const { push } = useRouter()

async function trySignIn() {
  try {
    loading.value = true
    const authData = await signIn(username.value as string, password.value as string)
    localStorage.setItem(AUTH_TOKEN, authData.data.access_token)
    const userInfo = await me()
    localStorage.setItem(USER_ID, String(userInfo.id))
    await push('/')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

.form-container {
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .form-group {
    margin-bottom: 15px;
    max-width: 100%;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
      color: #333;
    }

    input {
      width: calc(100% - 22px);
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    input:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    }
  }

  .sign-in-button {
    width: 100%;
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover:not([disabled]) {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
