import { Context, Next } from 'koa'
/**
 * 用于接到jwt的错误码后进行特定的错误提示
 * @returns 
 */
export default function () {
  return function (ctx:Context, next:Next) {
    return next().catch((err) => {
      switch (err.status) {
        case 401:
          ctx.status = 200
          ctx.body = {
            status: 401,
            msg: '无权限访问'
          }
          break
        default:
          throw err
      }
    })
  }
}
