import Vue from 'vue'

import router from './config/router'

new Vue({
  router,
  render: h => h('router-view')
}).$mount('#app');
