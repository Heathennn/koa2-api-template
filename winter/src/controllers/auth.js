import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))


export const Auth = {
  // 登录时生成token
  sign: (ctx, userInfo) => {
    let secret = publicKey + +new Date()
    // 过期时间 一天 number = 秒  1d 10h
    const token = jwt.sign(userInfo, publicKey, { expiresIn: '1d'})
    ctx.set('Authorization', `Bearer ${token}`)
    return token
  },
  verify: (ctx, decodedToken, token) => {
    let ret = true;
    try {
      const payload = jwt.verify(token, publicKey);
      ret = false;
    }catch(err) {
      console.log(`err.name`, err.name);
    }
    return ret
  }
}
// 用户登录的时候返回token
// let token = jwt.sign({
//   userInfo: userInfo // 你要保存到token的数据
// }, publicKey, { expiresIn: '7d' })

/**
 * 检查授权是否合法
 */
const CheckAuth = (ctx, next) => {
  const token = ctx.request.header.authorization
  console.log(`token`, token);
  try {
    const decoded = jwt.verify(token.substr(7), publicKey)
    if (decoded.userInfo) {
      return {
        status: 1,
        result: decoded.userInfo
      }
    } else {
      return {
        status: 403,
        result: {
          errInfo: '没有授权'
        }
      }
    }
  } catch (err) {
    return {
      status: 503,
      result: {
        errInfo: '解密错误'
      }
    }
  }
}

export const Post = (ctx, next) => {
  switch (ctx.params.action) {
    case 'check':
      return CheckAuth(ctx).then(result => { ctx.body = result; next() })
    default:
      return CheckAuth(ctx).then(result => { ctx.body = result; next() })
  }
}
