import type { AuthData, UserInfo } from '@/interfaces/auth.ts'
import axios from 'axios'
import { get } from '@/api/api-methods.ts'
import type { APIResponse } from '@/interfaces/common.ts'
import { BACKEND_URL } from '@/config/env-variables'

async function signIn(username: string, password: string) {
  return (await axios.post(`${BACKEND_URL}/auth/token`, new URLSearchParams({ username, password }), {
    timeout: 60000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })) as APIResponse<AuthData>
}

async function me() {
  return (await get('/auth/me')) as UserInfo
}

export { signIn, me }
