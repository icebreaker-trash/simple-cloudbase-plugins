export interface IRequestOption {
  mode: 'serverless' | 'legacy'
  httpMethod?: 'post'
  baseUrl?: string
}

export type RequestMode = 'serverless' | 'legacy'
