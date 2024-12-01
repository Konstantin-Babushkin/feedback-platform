export interface Feedback {
  [key: string]: unknown
}

export interface FeedbackForm {
  fields: [{ [key: string]: string | null }]
  header: 'string'
}
export interface FeedbackSession {
  id: string
  author_id: number
  is_active: boolean
  ts_deactivated: string | null
  responses: Feedback[]
  title: string
  gpt_summary: string
}

export interface TotalSummary {
  total: string
}
