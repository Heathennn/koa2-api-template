import { Context, Next } from 'koa'

export const Get = (ctx:Context, next:Next) => {
  ctx.body = {
    result: 'get',
    name: ctx.params.name,
    para: ctx.query
  }

  next()
}

export const Post = async (ctx:Context, next:Next) => {
  ctx.body = {
    result: 'post',
    name: ctx.params.name,
    para: ctx.request.body
  }

  next()
}

export const Put = (ctx:Context, next:Next) => {
  ctx.body = {
    result: 'put',
    name: ctx.params.name,
    para: ctx.request.body
  }

  next()
}

export const Delete = (ctx:Context, next:Next) => {
  ctx.body = {
    result: 'delete',
    name: ctx.params.name,
    para: ctx.request.body
  }

  next()
}
