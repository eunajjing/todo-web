import Koa from 'koa'
import morgan from 'koa-morgan'
import mount from 'koa-mount'
import qs from 'koa-qs'
import cookie from 'koa-cookie'
import Router from 'koa-router'
import next from 'next'

const SESSION_KEY = 'x-todo-session'

const dev = process.env.NODE_ENV !== 'production'
const PORT = parseInt(process.env.PORT || '8000', 10)

async function main() {
  const nextApp = next({ dev })
  const app = qs(new Koa(), 'extended')
  const router = new Router()

  const handler = nextApp.getRequestHandler()

  await nextApp.prepare()

  router
    .get(
      '/',
      renderNext({
        nextApp,
        route: '/index',
      }),
    )
    .get(
      '/signin',
      renderNext({
        nextApp,
        route: '/signin',
      }),
    )
    .get(
      '/signup',
      renderNext({
        nextApp,
        route: '/signup',
      }),
    )

  app
    .use(cookie())
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

function renderNext({
  nextApp,
  route,
  isRequiredAuth,
}: {
  nextApp: any
  route: string
  isRequiredAuth?: boolean
}) {
  return (ctx: Koa.Context) => {
    ctx.res.statusCode = 200
    ctx.respond = false

    if (isRequiredAuth) {
      authValidator(ctx)
    }

    nextApp.render(ctx.req, ctx.res, route, { ...ctx.params, ...ctx.query })
  }
}

function authValidator(ctx: Koa.Context) {
  if (!ctx.cookie[SESSION_KEY]) {
    ctx.redirect('/signin')
  }
  return true
}

try {
  main()
} catch (err) {
  // nothing...
}
