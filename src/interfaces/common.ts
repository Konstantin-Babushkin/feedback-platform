export interface APIResponse<T> {
  data: T
  status: number
  statusText: string
}
