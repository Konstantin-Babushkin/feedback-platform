import { post, get, patch } from '@/api/api-methods.ts'
import { USER_ID } from '@/config/local-storage-keys.ts'
import type { FeedbackForm, FeedbackSession, TotalSummary } from '@/interfaces/feedbacks.ts'
import type { APIResponse } from '@/interfaces/common.ts'

async function getMySessions() {
  const userId = localStorage.getItem(USER_ID)
  return (await get(`/feedback-sessions/${userId}`)) as FeedbackSession[]
}

async function getMyTotalSummary() {
  const userId = localStorage.getItem(USER_ID)
  return (await get(`/feedback-sessions/total-summary/${userId}`)) as TotalSummary
}

async function startNewSession(title: string) {
  return (await post('/feedback-sessions/', { title })) as FeedbackSession
}

async function endSession(sessionId: string) {
  return (await patch(`/feedback-sessions/${sessionId}`)) as FeedbackSession
}

async function getFeedbackForm(sessionId: string) {
  return (await get(`/feedback/${sessionId}`)) as APIResponse<FeedbackForm>
}

async function getSessionFeedbacks(sessionId: string | null) {
  if (!sessionId) return
  return (await get(`/feedback/${sessionId}/sent`)) as APIResponse<unknown>
}

async function submitFeedback(sessionId: string | null, data: never) {
  if (!sessionId) return
  return (await post(`/feedback/${sessionId}`, data)) as APIResponse<unknown>
}

export {
  getMySessions,
  getMyTotalSummary,
  startNewSession,
  endSession,
  getFeedbackForm,
  getSessionFeedbacks,
  submitFeedback,
}
