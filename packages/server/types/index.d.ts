import type { Middleware } from 'koa'

export interface IRouterMiddleware {
  path: string
  middleware: Middleware
}
