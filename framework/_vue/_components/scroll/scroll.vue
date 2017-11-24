<template>
  <div class="scroll-wrapper">
    <div class="scroll-body">
      <slot/>
    </div>
  </div>
</template>

<script type="text/babel">
  import '../../../less/scroll.less'
  import defaultProps from '../defaultProps'

  export default {
    props: {
      scroll    : defaultProps.func,
      vertical  : defaultProps.boolTrue,
      horizontal: defaultProps.bool
    },
    mounted() {
      const _scroll = new IScroll(
        this.$el, {
          scrollX: this.horizontal,
          scrollY: this.vertical
        });
      _scroll.toggleEvent('scroll', this.scroll)
      this._scroll = _scroll;
    }
  }
</script>
