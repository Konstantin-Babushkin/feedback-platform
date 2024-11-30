import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import { AUTH_TOKEN } from '@/config/local-storage-keys.ts'

const axiosParams = {
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
}

const router = useRouter()

const axiosInstance = axios.create(axiosParams)

function setAuthToken(config: InternalAxiosRequestConfig) {
  const authToken = localStorage.getItem(AUTH_TOKEN)
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`
  }
  return config
}

axiosInstance.interceptors.request.use(setAuthToken, (error) => Promise.reject(error))

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      void router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
