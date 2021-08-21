/**
 * 用于接到jwt的错误码后进行特定的错误提示
 * @returns 
 */
module.exports = function () {
  return function (ctx, next) {
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
