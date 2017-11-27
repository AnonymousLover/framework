import base, { browser } from './base'

const raf        = requestAnimationFrame || webkitRequestAnimationFrame,
      cancelRaf  = cancelAnimationFrame || webkitCancelAnimationFrame,
      rafSupport = !!cancelRaf;

const $raf = rafSupport ? (fn) => {
  let id = raf(fn);
  return () => { cancelRaf(id) }
} : (fn) => {
  let timer = setTimeout(fn, 16.666); // 1000 / 60 = 16.666
  return () => { clearTimeout(timer) }
}

$raf.supported = rafSupport;

const { NO_OP } = base

const body = browser ? document.body :
  { appendChild: NO_OP, removeChild: NO_OP };

function create(tag, attrs) {
  let el = browser ? document.createElement(tag) : {}
  base.each(attrs, (val, key) => { el[key] = val })
  return el;
}

function toggle(el, clazz, add) {
  browser && el instanceof Element && ((clazz) => {
    let old = (el.className || '').split(/\s+/)
      .filter(item => item);
    clazz.forEach(clz => {
      let i = old.indexOf(clz);
      add ? i === -1 && old.push(clz)
        : i !== -1 && old.splice(i, 1);
    })
    el.className = old.join(' ');
  })((clazz + '').split(' '));
}

function patch(el, type, data) {
  browser && el && el.dispatchEvent(
    new CustomEvent(type, {
      detail: data, bubbles: true, cancelable: true
    })
  )
}

//dom 操作
const $el = { create, toggle, patch }

const $body = {
  enable(should) {
    toggle(body, base.toArr(arguments, 1), !!should)
  },
  append(ele) {
    body.appendChild(ele.length ? ele[0] : ele);
  },
  remove(ele) {
    body.removeChild(ele.length ? ele[0] : ele);
  },
  locked(remove) {
    this.enable(!remove, 'drop-open')
  }
}

let dropEl = create('div', { className: 'backdrop-container' }),
    _stack = 0;

browser && $body.append(dropEl);

const $backdrop = {
  retain() {
    ++_stack && $raf(() => {
      toggle(dropEl, 'active', true);
      $body.locked();
    })
  },
  release() {
    --_stack || $raf(() => {
      toggle(dropEl, 'active');
      $body.locked(true)
    })
  }
}

export default {
  $raf,
  $el,
  $body,
  $backdrop
}

