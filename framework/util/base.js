let arr               = [],
    slice             = arr.slice,
    indexOf           = arr.indexOf,
    getProto          = Object.getPrototypeOf,
    hasOwnProperty    = Object.prototype.hasOwnProperty,
    toStr             = Object.prototype.toString,
    undefined         = undefined,
    clz2type          = {},
    _ARR              = 'array',
    _STR              = 'string',
    _FUN              = 'function',
    _BOO              = 'boolean',
    _OBJ              = 'object',
    _NUM              = 'number',
    _DAT              = 'date',
    _REG              = 'regexp',
    NODE_TYPE_ELEMENT = 1;

export const browser = !!(typeof window !== 'undefined' && window.document);

function isWin(obj) { return obj && obj.window === obj }

function getType(obj) { return typeof obj === _OBJ || typeof obj === _FUN ? clz2type[toStr.call(obj)] || _OBJ : typeof obj }

function isArr(obj) { return getType(obj) === _ARR }

function isStr(obj) { return getType(obj) === _STR }

function isFunc(obj) { return getType(obj) === _FUN }

function isBool(obj) { return getType(obj) === _BOO }

function isObj(obj) { return typeof obj === _OBJ }

function isNum(obj) { return getType(obj) === _NUM }

function isDate(obj) { return getType(obj) === _DAT }

function isReg(obj) { return getType(obj) === _REG }

function isUndef(obj) { return obj === undefined }

function isDef(obj) { return obj !== undefined }

function isNull(obj) { return obj === null || isUndef(obj)}

function isEmpty(obj) { return !(obj && Object.keys(obj).length) }

'Boolean Number String Function Array Date RegExp Object Error Symbol'
  .split(' ').forEach(name => {clz2type["[object " + name + "]"] = name.toLowerCase()})

function isArrLike(obj) {
  if (isNull(obj) || isWin(obj)) return false;
  let length = obj.length,
      type   = getType(obj);
  if (obj.nodeType === NODE_TYPE_ELEMENT && length) return true;
  return type === _STR || type === _ARR || length === 0
    || isNum(length) && length > 0 && (length - 1) in obj;
}

function trim(val) { return isStr(val) ? val.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : val }

function includes(arr, obj) { return indexOf.call(arr, obj) !== -1 }

function toJson(obj) { return isUndef(obj) ? undefined : JSON.stringify(obj) }

function fromJson(json) { return isStr(json) ? JSON.parse(json) : json }

function toArr(arrLike, start) { return slice.call(arrLike, start || 0) }

function toMap(str, obj, val) {
  let items = isArr(str) ? str : str.split(","),
      i     = 0,
      ii    = items.length;
  for (; i < ii; i++) obj[items[i]] = isNull(val) ? true : val;
  return obj;
}

function valueFn(value) { return function () { return value } }

const extend = Object.assign

function each(obj, iterator, context) {
  isArr(obj) ? toArr(obj).forEach(
    (val, key) => {
      iterator.call(context, val, key)
    }
  ) : obj &&
    Object.keys(obj).forEach(
      val => {
        iterator.call(context, obj[val], val)
      }
    )
}

function hashCode(str) {
  let hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr  = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

function NO_OP() {}

function toQueryStr(params) {
  let parts = [];
  each(params, function (value, key) {
    if (isNull(value)) return;
    (isArr(value) ? value : [value])
      .forEach(v => {
        isObj(v) ? v = isDate(v) ? v.toISOString() : toJson(v) : '';
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(v));
      })
  });
  return parts.join("&");
}

function buildUrl(url, params) {
  if (!params) return url;
  let parts = toQueryStr(params);
  return parts.length ? url + (url.indexOf('?') === -1 ? '?' : '&') + parts : url;
}

function debounce(fn, delay) {
  let timer = null
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, toArr(arguments)), timer = null
    }, delay)
  }
}

function throttle(fn, delay) {
  let timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, toArr(arguments)), timer = null
      }, delay)
    }
  }
}

function toFixed(number, len) {
  number = (Number(number).toFixed(len) + '');
  return len ? number.replace(/0*$/g, '').replace(/\.*$/g, '') : number
}

function easeOut(t, b, c, d, f) {
  let t1 = t / d - 1;
  return toFixed(c * (t1 * t1 * t1 + 1) + b, f ? 1 : 0);
}

export default {
  isWin,
  getType,
  isArr,
  isStr,
  isFunc,
  isBool,
  isObj,
  isNum,
  isDate,
  isReg,
  isUndef,
  isDef,
  isNull,
  isEmpty,
  isArrLike,
  trim,
  includes,
  toJson,
  fromJson,
  toArr,
  toMap,
  valueFn,
  extend,
  each,
  hashCode,
  NO_OP,
  toQueryStr,
  buildUrl,
  debounce,
  throttle,
  toFixed,
  easeOut,
}





