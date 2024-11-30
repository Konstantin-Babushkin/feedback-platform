import axiosInstance from '@/api/axios.ts'
import { BACKEND_URL } from '@/config/env-variables.ts'

async function baseRequest(
  method: string,
  path: string,
  payload: unknown = {},
  queries: unknown = {},
) {
  let fullPath = `${BACKEND_URL}${path}`
  if (queries && Object.keys(queries).length > 0) {
    fullPath = `${fullPath}?${new URLSearchParams(queries as URLSearchParams).toString()}`
  }
  const response = await axiosInstance(fullPath, {
    method,
    data: payload,
  })
  return response?.data
}

async function get(path: string, queries = {}) {
  return await baseRequest('GET', path, {}, queries)
}

async function post(path: string, payload = {}, queries = {}) {
  return await baseRequest('POST', path, payload, queries)
}

async function patch(path: string, payload = {}, queries = {}) {
  return await baseRequest('PATCH', path, payload, queries)
}

async function remove(path: string, payload = {}, queries = {}) {
  return await baseRequest('DELETE', path, payload, queries)
}

export { get, post, patch, remove }
