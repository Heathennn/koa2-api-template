export async function getListWithPage(model, page, pageSize) {
  return model.find().skip((page - 1) * pageSize).limit(pageSize);
}
export const checkPagination = async ctx => {
  let reqBody = ctx.request.body;
  let page = +reqBody.page;
  let pageSize = +reqBody.pageSize;

  if (!page || !pageSize) {
    ctx.body = {
      code: 400,
      msg: '请传入page(从1开始)和pageSize'
    };
    return false;
  }

  return true;
};