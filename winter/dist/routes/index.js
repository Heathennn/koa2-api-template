import MainRoutes from './main-routes';
import DBRouters from './douban';
import UserRouters from './user';
import ErrorRoutes from './error-routes'; // 加载全部路由

export function initLoadRouters(app) {
  app.use(MainRoutes.routes());
  app.use(DBRouters.routes());
  app.use(UserRouters.routes());
  app.use(ErrorRoutes());
}