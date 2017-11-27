import { base } from '../../../util'
import defaultProps from '../defaultProps'

import vFilter from '../filter/filter.vue'

const { isNull } = base

export const $watch = (list, filterList, selectMap) => {
  let len     = filterList.length,
      _select = isNull(selectMap[len]) ? {} : selectMap[len],
      _item   = null, children;
  list.every(item => {
    if ((isNull(_select.code) && item.select)
      || item.code === _select.code) {
      return _item = item, false;
    }
  });
  _item          = _item || list[0] || {};
  selectMap[len] = { code: _item.code, text: _item.text };
  children       = _item.children || [];
  filterList.push(list);
  return children.length ? $watch(children, filterList, selectMap) : filterList;
}

export default {
  components: { vFilter },
  props     : {
    filterMap: defaultProps.array,
    change   : defaultProps.func
  },
  data() {
    return {
      select: [],//选择的项
      list  : [] //数据
    }
  },
  computed  : {
    clz() { return this.list.length > 1 ? 'lf' : 'tp' }
  },
  methods   : {
    _commit(idx) {
      this.$nextTick(() => {
        idx + 1 === this.list.length && this.change(this.select)
      })
    }
  },
  beforeMount() {
    this.list = $watch(this.filterMap, [], this.select)
  },
  watch     : {
    filterMap(val) { this.list = $watch(val, [], this.select) },
    select(val) { this.list = $watch(this.filterMap, [], val) }
  }
}
