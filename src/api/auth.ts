import { post } from '@/api/api-methods.ts'
import type { AuthData, UserInfo } from '@/interfaces/auth.ts'

async function signIn(username: string, password: string) {
  return (await post('/auth/token', { username, password })) as AuthData
}

async function me() {
  return (await post('/auth/me')) as UserInfo
}

export { signIn, me }
