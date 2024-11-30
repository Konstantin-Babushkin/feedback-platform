import { get, patch } from '@/api/api-methods.ts'
import type { AuthData, EditableUserInfo, UserInfo } from '@/interfaces/auth.ts'
import type { APIResponse } from '@/interfaces/common.ts'

async function getUserData(userId: number) {
  return (await get('/users/', { userId })) as APIResponse<Omit<UserInfo, 'is_admin'>>
}

async function changeUserData(data: EditableUserInfo) {
  return (await patch('/users/', data)) as APIResponse<AuthData>
}

export { getUserData, changeUserData }
