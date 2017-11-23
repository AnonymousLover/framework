//密码套件的混合js
import defaultProps from '../defaultProps'

import vPassword from '../password/password.vue'
import vInput from '../form/input.vue'

export default {
  components: { vPassword, vInput },
  props     : {
    type     : defaultProps.setValue('simple'),
    hasChange: defaultProps.setValue(true),
    forget   : defaultProps.func
  },
  computed  : {
    _hasForget() {
      return typeof this.forget === 'function'
    }
  },
  methods   : {
    checkType(val) {
      return (val || this.show) === 'simple'
    },
    change() {
      this.value = '';
      this.show  = this.checkType() ? 'complex' : 'simple';
    }
  }
}
