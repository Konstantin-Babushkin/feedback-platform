import type { AuthData, UserInfo } from '@/interfaces/auth.ts'
import axios from 'axios'
import { get } from '@/api/api-methods.ts'
import type { APIResponse } from '@/interfaces/common.ts'

async function signIn(username: string, password: string) {
  return (await axios.post('/api/auth/token', new URLSearchParams({ username, password }), {
    timeout: 60000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })) as APIResponse<AuthData>
}

async function me() {
  return (await get('/auth/me')) as UserInfo
}

export { signIn, me }
