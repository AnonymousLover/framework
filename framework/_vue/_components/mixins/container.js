//
import '../../../less/dialog.less'
import defaultProps from '../defaultProps'
import { debounce, $backdrop } from '../../../util/util'

export default {
  props   : {
    value: defaultProps.bool
  },
  data() {
    this.display(this.value);
    return { show: !1 }
  },
  methods : {
    display: debounce(function (val) { this.show = !!val }, 16.7)
  },
  computed: {
    clz() { return this.show ? 'active' : '' }
  },
  beforeDestroy() { this.show && $backdrop.release() },
  watch   : {
    value(val) { this.display(val) },
    show(val) {
      $backdrop[val ? 'retain' : 'release']();
      this.$emit('input', !!val)
    }
  }
}
