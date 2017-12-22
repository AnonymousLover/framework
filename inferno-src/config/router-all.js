import Inferno from 'inferno'
import { Route } from 'inferno-router'

const index     = {
  path: '/',//路径定义
  getComponent(n, cb) {//获取模块回调
    require.ensure([], () => {
      cb(null, require('../pages/index').default)
    }, 'index')
  }
}, icon         = {
  path: '/icon',//路径定义
  getComponent(n, cb) {//获取模块回调
    require.ensure([], () => {
      cb(null, require('../pages/icont').default)
    }, 'icon')
  }
}, dialog       = {
  path: '/dialog',//路径定义
  getComponent(n, cb) {//获取模块回调
    require.ensure([], () => {
      cb(null, require('../pages/dialog').default)
    }, 'dialog')
  }
}, keyboard     = {
  path: '/keyboard',//路径定义
  getComponent(n, cb) {//获取模块回调
    require.ensure([], () => {
      cb(null, require('../pages/keyboard').default)
    }, 'keyboard')
  }
}, progress     = {
  path: '/progress',//路径定义
  getComponent(n, cb) {//获取模块回调
    require.ensure([], () => {
      cb(null, require('../pages/progress').default)
    }, 'progress')
  }
}, carousel     = {
  path: '/carousel',//路径定义
  getComponent(n, cb) {//获取模块回调
    require.ensure([], () => {
      cb(null, require('../pages/carousel').default)
    }, 'carousel')
  }
}, step         = {
  path: '/step',        //路径定义
  getComponent(n, cb) { //获取模块回调
    require.ensure([], () => {
      cb(null, require('../pages/step').default)
    }, 'step')
  }
}
const rootRoute = [
  index,
  icon,
  dialog,
  keyboard,
  carousel,
  progress,
  step
]

export default rootRoute.map(item => {
  item.onEnter = function () {}
  item.onLeave = function () {}
  item.path    = process.env.PATH + item.path;
  return <Route { ...item }/>;
})
