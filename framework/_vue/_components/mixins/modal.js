/**
 * Created by h5 on 2017/7/7.
 */
import defaultProps from '../defaultProps'

import vModal from '../container/modal.vue'
import vPop from '../container/pop.vue'
import vLoad from '../container/load.vue'

export default {
  components: { vModal, vPop, vLoad },
  props     : {
    showModal: defaultProps.bool,
    click    : defaultProps.func
  },
  methods   : {
    display(val) { this.showModal = !!val },
    trigger(val) { this.click && this.click(val) }
  },
  watch     : {
    showModal(val) {
      val || this.$emit('update:showModal', val);
    }
  }
}
