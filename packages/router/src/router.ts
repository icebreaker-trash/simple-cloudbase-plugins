import compose from 'koa-compose'

class Router {
  middleware: any[]
  config: any
  constructor (config: any) {
    super()
    this.middleware = []
    this.config = config || {}
  }
}
