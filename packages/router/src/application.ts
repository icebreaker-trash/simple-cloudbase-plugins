import Emitter from 'events'
import compose from 'koa-compose'
import type { Middleware, ComposedMiddleware } from 'koa-compose'
import type { BaseContext } from 'koa'
import context from './context'
import type {
  IBaseContext,
  IExtendableContext,
  ICloudbaseEvent,
  ICloudbaseContext
} from '#types'

class Application extends Emitter {
  public context: IBaseContext
  public middleware: Middleware<IBaseContext>[]
  constructor () {
    super()
    this.middleware = []
    this.context = Object.create(context)
  }

  use (fn: Middleware<IBaseContext>) {
    this.middleware.push(fn)
    return this
  }

  serve (event: ICloudbaseEvent, context: ICloudbaseContext) {}

  createContext (
    event: ICloudbaseEvent,
    context: ICloudbaseContext
  ): IExtendableContext {
    const ctx = Object.create(this.context)
    ctx.event = event
    ctx.context = context
    return ctx
  }
}

export default Application
