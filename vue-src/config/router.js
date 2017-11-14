import VueRouter from 'vue-router'
import { routeConfig } from '../../framework/util/util'

const routes = [
  require('../routers/indexRouter').default,
  require('../routers/dialogRouter').default,
]

export default routeConfig(new VueRouter({ routes }));
