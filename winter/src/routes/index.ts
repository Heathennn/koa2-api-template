import MainRoutes from './main-routes'
import DBRouters from './douban'
import UserRouters from './user'
import ErrorRoutes from './error-routes'
import Koa2 from 'koa'

// 加载全部路由
export function initLoadRouters(app:Koa2) {
    app.use(MainRoutes.routes())
    app.use(DBRouters.routes())
    app.use(UserRouters.routes())
    app.use(ErrorRoutes())
  }