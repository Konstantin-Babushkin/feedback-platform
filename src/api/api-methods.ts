import axiosInstance from '@/api/axios.ts'
// import { BACKEND_URL } from '@/config/env-variables.ts'

async function baseRequest(method: string, path: string, payload: unknown = {}) {
  // let fullPath = `${BACKEND_URL}${path}`
  const fullPath = `/api${path}`
  const response = await axiosInstance(fullPath, {
    method,
    data: payload,
  })
  return response?.data
}

async function get(path: string) {
  return await baseRequest('GET', path, {})
}

async function post(path: string, payload = {}) {
  return await baseRequest('POST', path, payload)
}

async function patch(path: string, payload = {}) {
  return await baseRequest('PATCH', path, payload)
}

async function remove(path: string, payload = {}) {
  return await baseRequest('DELETE', path, payload)
}

export { get, post, patch, remove }
