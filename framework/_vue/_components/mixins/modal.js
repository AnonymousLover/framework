/**
 * Created by h5 on 2017/7/7.
 */
import vModal from '../container/modal.vue'
import vPop from '../container/pop.vue'
import vLoad from '../container/load.vue'

export default {
  components: { vModal, vPop, vLoad },
  props     : {
    showModal: { default: false },
    click    : Function
  },
  watch     : {
    showModal(val) {
      // false外发...
      val || this.$emit('update:showModal', val);
    }
  }
}
