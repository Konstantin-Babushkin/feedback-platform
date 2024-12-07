import { get, patch } from '@/api/api-methods.ts'
import type { AuthData, EditableUserInfo, UserInfo } from '@/interfaces/auth.ts'

async function getUserData(userId: number) {
  return (await get(`/users/${userId}`)) as UserInfo
}

async function changeUserData(data: EditableUserInfo) {
  return (await patch('/users/', data)) as UserInfo
}

export { getUserData, changeUserData }
