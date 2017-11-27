import base from './base';
import $log from './log'

const caches = {}

const { extend } = base

const $cache = (cacheId, options) => {
  if (cacheId in caches)
    return $log.error('iid', cacheId + ' is in!');
  let MAX_VALUE = Number.MAX_VALUE,
      size      = 0,
      stats     = extend({}, options, { id: cacheId }),
      data      = {},
      capacity  = (options && options.capacity) || MAX_VALUE,
      lruHash   = {},
      freshEnd  = null,
      staleEnd  = null;
  return caches[cacheId] = {
    put    : function (key, value) {
      if (capacity < MAX_VALUE) {
        refresh(lruHash[key] || (lruHash[key] = { key }))
      }
      if (base.isDef(value)) {
        key in data || size++
        data[key] = value;
        size > capacity && this.remove(staleEnd.key);
      }
      return value;
    },
    get    : function (key) {
      if (capacity < MAX_VALUE) {
        let lruEntry = lruHash[key];
        if (!lruEntry) return;
        refresh(lruEntry);
      }
      return data[key];
    },
    remove : function (key) {
      if (capacity < MAX_VALUE) {
        let lruEntry = lruHash[key];
        if (!lruEntry) return;
        if (lruEntry === freshEnd) freshEnd = lruEntry.p;
        if (lruEntry === staleEnd) staleEnd = lruEntry.n;
        link(lruEntry.n, lruEntry.p);
        delete lruHash[key];
      }
      delete data[key];
      size--;
    },
    clear  : function () {
      data     = {};
      size     = 0;
      lruHash  = {};
      freshEnd = staleEnd = null;
    },
    destroy: function () {
      data = stats = lruHash = null;
      delete caches[cacheId];
    },
    info   : function () {
      return extend({}, stats, { size });
    }
  };

  function refresh(entry) {
    if (entry !== freshEnd) {
      staleEnd = !staleEnd ? entry : staleEnd === entry ? entry.n : staleEnd;
      link(entry.n, entry.p);
      link(entry, freshEnd);
      freshEnd   = entry;
      freshEnd.n = null;
    }
  }

  function link(nextEntry, prevEntry) {
    if (nextEntry !== prevEntry) {
      if (nextEntry) nextEntry.p = prevEntry;
      if (prevEntry) prevEntry.n = nextEntry;
    }
  }
};

$cache.info = () => {
  let info = {}
  base.each(caches, (val, key) => { info[key] = val.info() })
  return info;
}

$cache.get = (cacheId) => caches[cacheId]

export default $cache
