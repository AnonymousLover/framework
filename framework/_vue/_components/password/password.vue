<template>
  <ul class="simple-password" @tap="click">
    <li v-for="(b,i) in items" :key="i" v-html="b"/>
  </ul>
</template>

<script type="text/babel">
  import '../../../less/password.less'
  import defaultProps from '../defaultProps'
  import keyboardMixin from '../mixins/keyboard';
  import $keyboard from "../../components/keyboard";

  export default {
    mixins : [keyboardMixin],
    props  : {
      value : defaultProps.string,
      length: defaultProps.setValue(6),
      click : defaultProps.func
    },
    data() {
      return { items: [] }
    },
    mounted() { this._mask(this.value) },
    watch  : {
      value(val = '') {
        this._mask(val);
        this.$emit('input', val);
      }
    },
    methods: {
      _mask(val) {
        let inputs = (val || '').split(''),
            i      = 0,
            ii     = this.length,
            items  = [];
        for (; i < ii; i++) {
          items.push(inputs[i] == null ? '&nbsp;' : '●')
        }
        this.items = items;
      }
    }
  }
</script>
