/**
 * 用于按需加载的所有路由配置
 */
import { createRoutes } from 'inferno-router'
/*{
 *    path        : '/',
 *    component   : App,
 *    indexRoute  : {
 *      component     : Home,
 *    },
 *    childRoutes : [
 *      {
 *        path : 'films/',
 *        component : Films,
 *        childRoutes : {
 *          path : 'detail/:id',
 *          component : FilmDetail,
 *        }
 *      },
 *      {
 *        path : '/*',
 *        component : NoMatch
 *      }
 *    ]
 *  }
 */
const rootRoute = [
  require('../routers/indexRouter'),
  require('../routers/iconRouter'),
  require('../routers/dialogRouter'),
  require('../routers/progressRouter'),
  require('../routers/keyboardRouter'),
  require('../routers/carouselRouter'),
  require('../routers/stepRouter'),
]

export default createRoutes(
  rootRoute.map(item => {
    item.onEnter = function () {}
    item.onLeave = function () {}
    item.path    = process.env.PATH + item.path;
    return item;
  }));
