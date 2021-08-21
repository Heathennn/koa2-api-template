module.exports = function () {
  return function (ctx, next) {
    switch (ctx.status) {
      case 404:
        ctx.body = '404 - 错误的请求路径'
        break
    }
    return next()
  }
}
