import VueRouter from 'vue-router'
import { routeConfig } from '../../framework/util/util'

const routes = [
  require('../routers/indexRouter').default
]

export default routeConfig(new VueRouter({ routes }));
