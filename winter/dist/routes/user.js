import KoaRouter from 'koa-router';
import controllers from '../controllers';
const router = new KoaRouter({
  prefix: '/public/user'
});
export default router.get('/list', controllers.user.getUserList);