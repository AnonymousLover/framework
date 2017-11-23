<template>
  <v-modal v-model="showModal">
    <!-- 简单键盘 -->
    <v-keyboard-simple v-if="type!='complex'" :keys="keys" :others="others" :click="click"/>
    <!-- 复杂键盘 -->
    <v-keyboard-complex v-else :click="click"/>
  </v-modal>
</template>
<script type="text/babel">
  import defaultProps from '../defaultProps'

  import vKeyboardSimple from './keyboard.simple.vue'
  import vKeyboardComplex from './keyboard.complex.vue'
  import _modal from '../mixins/modal'

  export default {
    mixins    : [_modal],
    components: {
      vKeyboardSimple,
      vKeyboardComplex
    },
    props     : {
      type  : defaultProps.setValue('simple'),
      keys  : defaultProps.array,
      others: defaultProps.array,
    }
  }
</script>
