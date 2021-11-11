import Koa from 'koa'
import type { IRouterMiddleware } from '#types'
import Router from '@koa/router'
import fs, { promises as fsp } from 'fs'
import koaBody from 'koa-body'

export function createApp () {
  return new Koa()
}

export function createRouter () {
  return new Router()
}

export async function transformEventFunctions2Middleware (distDir: string) {
  const dirs = await fsp.readdir(distDir)
  const mids: IRouterMiddleware[] = []
  for (let i = 0; i < dirs.length; i++) {
    const stat = fs.statSync(dirs[i])
    if (stat.isDirectory()) {
      try {
        const { main } = require(dirs[i])
        mids.push({
          path: '/' + dirs[i],
          middleware: async (ctx, next) => {
            ctx.body = await main(ctx.request.body, ctx)
            next()
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
  return mids
}

export async function createDevServer (distDir: string) {
  const app = createApp()
  app.use(koaBody())
  const router = createRouter()
  const mids = await transformEventFunctions2Middleware(distDir)
  for (let i = 0; i < mids.length; i++) {
    const mid = mids[i]
    router.post(mid.path, mid.middleware)
  }
  app.use(router.routes()).use(router.allowedMethods())
  const server = app.listen(9000)
  console.log('DevServer is listening 9000')
  return server
}
