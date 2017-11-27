import VueRouter from 'vue-router'

import { vueConfig } from '../../framework/util'

const routes = [
  require('../routers/indexRouter').default,
  require('../routers/iconRouter').default,
  require('../routers/dialogRouter').default,
  require('../routers/keyboardRouter').default,
  require('../routers/passwordRouter').default,
  require('../routers/carouselRouter').default,
]

export default vueConfig(new VueRouter({ routes }));
