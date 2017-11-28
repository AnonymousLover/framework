<template>
  <span ref="number" :data-value="value"/>
</template>
<script type="text/babel">
  import progressMixins from '../mixins/progress'
  import { base, el } from '../../../util'

  export default {
    mixins: [progressMixins],
    watch : {
      oldValue(newVal, oldVal) {
        const { raf, time } = this;
        raf && raf();
        let t       = 1;
        const d     = Math.ceil(time / 1000 * 60);
        const step  = () => {
          const toVal = t >= d ? newVal
            : base.easeOut(t++, oldVal, newVal - oldVal, d);
          this.raf    = toVal === newVal ? null : el.$raf(step)

          this.$refs.number.textContent = toVal;
        }
        step();
      }
    },
  }
</script>
