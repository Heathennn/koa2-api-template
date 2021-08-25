import { Context, Next } from 'koa'
export default function () {
  return function (ctx:Context, next:Next) {
    switch (ctx.status) {
      case 404:
        ctx.body = '404 - 错误的请求路径'
        break
    }
    return next()
  }
}
