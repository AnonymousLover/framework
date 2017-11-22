import Vue from 'vue'

import router from './config/router'

import './styles/index.less'

new Vue({
  router,
  render: h => h('router-view')
}).$mount('#app');
