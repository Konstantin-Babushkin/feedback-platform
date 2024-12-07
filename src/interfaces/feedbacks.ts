export interface Feedback {
  ts_created: string
  data: { [key: string]: unknown }
}

export interface FeedbackForm {
  fields: Input[]
  header: 'string'
}

type InputType = 'textarea' | 'select'
export interface Input {
  name: string
  label: string
  type: InputType
  required: boolean
  value: string | number | null
  options?: Array<number | string>
}

export interface FeedbackSubmitPayload {
  data: unknown
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
