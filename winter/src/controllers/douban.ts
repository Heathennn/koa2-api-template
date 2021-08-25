import DBBookModel from '../models/DBBook'
import { Context } from 'koa'
import { getListWithPage, checkPagination } from '../lib/pagination'
export const getDBBookTop250 = async (ctx:Context, next:any) => {
    if (await checkPagination(ctx)) {
        let reqBody = ctx.request.body
        let page = +reqBody.page
        let pageSize = +reqBody.pageSize
        // 总数
        let count = await DBBookModel.find().countDocuments()
        let list  = await getListWithPage(DBBookModel, page, pageSize)
        ctx.body = {
            page,
            pageSize,
            code: 200,
            data: list,
            total: count,
            msg: '请求成功'
        }
        next()
    } else {
        next()
    } 
}