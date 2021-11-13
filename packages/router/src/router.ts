import compose from 'koa-compose'
import Emitter from 'events'
export class Router extends Emitter {
  middleware: any[]
  options: any
  constructor (options: any) {
    super()
    this.middleware = []
    this.options = options || {}
  }

  use (fn) {
    this.middleware.push(fn)
    return this
  }
}
// const app = new Router()

// app.
