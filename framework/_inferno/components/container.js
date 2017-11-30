import Inferno from 'inferno'
import { el, base } from '../../util'

const { toArr, timeout, NO_OP, extend, isFunc } = base;

const { $el, $body, $backdrop } = el;

const { create, toggle } = $el

const ACTIVE = 'active';

export const $modal = {
  _attr   : { className: 'modal-container' },
  _el     : null,       //容器
  _stack  : 0,          // 堆栈
  delay   : 500,        // 关闭延时
  timer   : null,       // 定时器句柄
  show(content, opt) {
    const that = this;
    that._el || ((el) => {
      $body.append(that._el = el);
      that._bindEvent()
    })(create('div', that._attr))
    isFunc(this.timer) && this.timer();
    that._stack++ ? that.hide(() => {
      that._append(content, opt)
    }) : that._append(content, opt);
  },
  // 事件绑定
  _bindEvent() {
    const { _el } = this;
    _el.addEventListener('tap',
      event => {
        event.target === _el && this.hide()
      }, false)
  },
  /*
   * 私有方法 -- 不允许外部使用
   */
  _append(content, opt) {
    const { _el } = this;
    $backdrop.retain()
    Inferno.render(content, _el)
    timeout(toggle.bind(null, _el, ACTIVE, true))
    this._delayFn(opt || {})
  },
  _delayFn: NO_OP,
  hide(cb, arg2) {
    const noClose = arg2 === true;
    // 关闭
    noClose || this._hide()
    timeout(() => {
      cb && cb.apply(null, toArr(arguments, noClose ? 2 : 1))
    }, noClose ? 0 : this.delay);
  },
  _hide() {
    this._stack--;
    toggle(this._el, ACTIVE);
    $backdrop.release();
  }
}

export const $pop = extend(
  {}, $modal, {
    _bindEvent: NO_OP,
    _attr     : { className: 'popup-container' },
    delay     : 300
  })

export const $load = extend(
  { _timer: null }, $pop, {
    _bindEvent: NO_OP,
    _attr     : { className: 'loading-container' },
    _timer    : null,
    _delayFn(opt) {
      isFunc(this._timer) && this._timer()
      const delay = opt.delay || 10000;
      const cb    = isFunc(opt) ? opt : opt.cb;
      this._timer = timeout(this.hide.bind(this, cb), delay);
    },
    _hide() {
      isFunc(this._timer) && this._timer()
      this._stack--, this._timer = null;
      toggle(this._el, ACTIVE);
      $backdrop.release();
    }
  })
