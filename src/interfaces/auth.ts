export interface AuthData {
  access_token: string
  token_type: string
}

export interface UserInfo {
  id: number
  username: string
  is_admin: boolean
  full_name: string | null
  position: string | null
  company: string | null
}

export interface EditableUserInfo {
  full_name: string
  position: string
  company: string
}
