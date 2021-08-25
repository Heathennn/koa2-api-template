import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { Context } from 'koa'

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))


export const Auth = {
  // 登录时生成token TODO: userInfo类型
  sign: (ctx:Context, userInfo:any) => {
    // 过期时间 一天 number = 秒  1d 10h
    const token = jwt.sign(userInfo, publicKey, { expiresIn: '1d'})
    ctx.set('Authorization', `Bearer ${token}`)
    return token
  },
  verify: (token:string) => {
    let ret = true;
    try {
      jwt.verify(token, publicKey);
      ret = false;
    }catch(err) {
      console.log(`err.name`, err.name);
    }
    return ret
  }
}