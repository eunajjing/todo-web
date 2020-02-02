import Koa from 'koa'
import morgan from 'koa-morgan'
import mount from 'koa-mount'
import qs from 'koa-qs'
import cookie from 'koa-cookie'
import Router from 'koa-router'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const PORT = parseInt(process.env.PORT || '3000', 10)

async function main() {
  const nextApp = next({ dev })
  const app = qs(new Koa(), 'extended')
  const router = new Router()

  const handler = nextApp.getRequestHandler()

  await nextApp.prepare()

  router.get('/', renderNext(nextApp, '/index'))

  app.use(cookie())
  app
    .use(
      mount('/health-check', (ctx: Koa.Context) => {
        ctx.status = 200
      }),
    )
    .use(morgan('combined'))
    .use(router.routes())
    .use(
      mount('/', (ctx: Koa.Context) => {
        ctx.respond = false
        handler(ctx.req, ctx.res)
      }),
    )

  app.listen(PORT)
}

function renderNext(nextApp: any, route: string) {
  return (ctx: Koa.Context) => {
    ctx.res.statusCode = 200
    ctx.respond = false

    nextApp.render(ctx.req, ctx.res, route, { ...ctx.params, ...ctx.query })
  }
}

try {
  main()
} catch (err) {
  // nothing...
}
