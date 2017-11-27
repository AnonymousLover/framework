// vue-router config

import base, { browser } from './base'
import el from './el'

const { $body } = el

let timer = null;
export default (router) => {
  if (!browser) return router;
  router.beforeEach((to, from, next) => {
    if (from.matched.length) {
      $body.enable(false, 'transition');
      timer = setTimeout(function () {
        $body.enable(true, 'transition');
        timer = null;
      }, 300);
    }
    next();
  });
  router.afterEach(() => {
    if (timer) clearTimeout(timer);
    else {
      $body.enable(true, 'on');
      setTimeout(function () {
        $body.enable(false, 'on', 'transition')
      }, 400);
    }
  });
  return router;
}
