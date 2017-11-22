//
import '../../../less/dialog.less'

import { debounce, $backdrop } from '../../../util/util'

export default {
  props   : {
    value: { default: !1 }
  },
  data() {
    this.display(this.value);
    return { show: !1 }
  },
  methods : {
    display: debounce(function(val) { this.show = !!val }, 16.7)
  },
  computed: {
    typeClazz() { return this.show ? 'active' : '' }
  },
  beforeDestroy() {
    this.show && $backdrop.release()
  },
  watch   : {
    value(val) { this.display(val) },
    show(val) {
      $backdrop[val ? 'retain' : 'release']();
      this.$emit('input', !!val)
    }
  }
}
