import KoaRouter from 'koa-router'
import controllers from '../controllers'

const router = new KoaRouter({
    prefix: '/db'
})

export default router
    .post('/book/top250', controllers.db.getDBBookTop250)