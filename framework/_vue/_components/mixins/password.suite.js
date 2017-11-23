//密码套件的混合js
import defaultProps from '../defaultProps'

import vPassword from '../password/password.vue'
import vInput from '../form/input.vue'

export default {
  components: { vPassword, vInput },
  props     : {
    type     : defaultProps.setValue('simple'),
    hasChange: defaultProps.setValue(true),
    forget   : ''
  },
  computed  : {
    _hasForget() {
      return typeof this.forget === 'function'
    }
  },
  methods   : {
    change() {
      this.password = { value: '' };
      this.simple   = !this.simple;
    }
  }
}
