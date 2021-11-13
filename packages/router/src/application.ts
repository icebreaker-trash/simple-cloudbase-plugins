import Emitter from 'events'
import compose from 'koa-compose'
import type { Middleware, ComposedMiddleware } from 'koa-compose'
import context from './context'
import type {
  IBaseContext,
  IExtendableContext,
  ICloudbaseEvent,
  ICloudbaseContext
} from '#types'
import type { ScfError } from './error'

class Application extends Emitter {
  public context: IBaseContext
  public middleware: Middleware<IExtendableContext>[]
  constructor () {
    super()
    this.middleware = []
    this.context = Object.create(context)
  }

  use (fns: Middleware<IExtendableContext>) {
    this.middleware.push(fns)
    return this
  }

  serve (event: ICloudbaseEvent, context: ICloudbaseContext) {
    const ctx = this.createContext(event, context)
    const fn: ComposedMiddleware<IExtendableContext> = compose(this.middleware)
    return new Promise((resolve) => {
      fn(ctx)
        .then(() => {
          resolve(this.respond(ctx))
        })
        .catch((err: ScfError) => {
          resolve(this.handleError(err))
        })
    })
  }

  respond (ctx: IExtendableContext) {
    return ctx.body
  }

  handleError (err: ScfError) {
    return err.toJSON()
  }

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
