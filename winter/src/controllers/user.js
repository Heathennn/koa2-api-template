import UserModel from '../models/User';
import { Auth } from './auth';
export const getUserList = async (ctx, next) => {
  let list = await UserModel.find();
  ctx.body = {
    data: list,
    msg: '请求成功',
  };
  next();
};

export const userLogin = async (ctx, next) => {
  let { userName, password } = ctx.request.body;
  console.log(`userName`, userName);
  if (userName === 'admin' && password === '123') {
    let token = Auth.sign(ctx, { userName, password });
    ctx.body = {
      data: {
        token,
      },
      msg: '请求成功',
    };
  } else {
    ctx.body = {
        code: 400,
        data: null,
        msg: '用户名和密码错误',
      };
  }

  next();
};
