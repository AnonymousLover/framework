<template>
  <div class="key-body row" :class="[ clz ]">
    <slot/><!-- 内嵌插槽--组合组件  -->
    <h5><i/>安全键盘</h5>
    <ul class="col number row" @tap="tap">
      <li class="col-4" v-for="(k,i) in keys" :key="i" :class="getClass(k)" v-html="k"/>
    </ul>
    <ul class="col num-other" @tap="tap">
      <li v-for="(o,i) in others" :key="i" :class="getClass(o)" v-html="o"/>
    </ul>
  </div>
</template>
<script type="text/babel">
  import '../../../less/keyboard.less'
  import defaultProps from '../defaultProps'

  export default {
    props   : {
      keys  : defaultProps.array,
      others: defaultProps.array,
      click : defaultProps.func
    },
    computed: {
      clz() { return this.isNine() ? 'keyAll' : '' }
    },
    methods : {
      isNine() { return !(this.others && this.others.length) },
      getClass(n) {
        return /[a-z|A-Z]/.test(n) ? `key-${n}` : /\*/.test(n)
          ? 'key-dis' : /确定/.test(n) ? 'key-ent' : '';
      },
      tap(event) {
        let target = event.target, result;
        if (target.tagName === 'LI') {
          result = target.innerHTML;
          switch (result) {
            case '*':
              return;
            default:
              this.click && this.click(true, result);
          }
        }
      }
    }
  }
</script>
