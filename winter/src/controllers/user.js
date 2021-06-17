import UserModel from '../models/User'
export const getUserList = async (ctx, next) => {
    let list = await UserModel.find()
    ctx.body = {
        data:list,
        msg: '请求成功'
    }
    next()
}