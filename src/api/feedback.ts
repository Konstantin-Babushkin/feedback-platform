import { post, get, patch } from '@/api/api-methods.ts'
import { USER_ID } from '@/config/local-storage-keys.ts'
import type { FeedbackForm, FeedbacksSession, TotalSummary } from '@/interfaces/feedbacks.ts'

async function getMySessions() {
  const userId = localStorage.getItem(USER_ID)
  return (await get('/feedback-sessions/', { userId })) as FeedbacksSession
}

async function getMyTotalSummary() {
  const userId = localStorage.getItem(USER_ID)
  return (await get('/feedback-sessions/total-summary/', { userId })) as TotalSummary
}

async function startNewSession(title: string) {
  return (await post('/feedback-sessions/', { title })) as FeedbacksSession
}

async function endSession(sessionId: string) {
  return (await patch('/feedback-sessions/', undefined, { sessionId })) as FeedbacksSession
}

async function getFeedbackForm(sessionId: string) {
  return (await get('/feedback/', { sessionId })) as FeedbackForm
}

async function getSessionFeedbacks(sessionId: string | null) {
  if (!sessionId) return
  return await get(`/feedback/${sessionId}/sent`)
}

async function submitFeedback(sessionId: string | null, data: unknown) {
  if (!sessionId) return
  return await post('/feedback/', data, { sessionId })
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
