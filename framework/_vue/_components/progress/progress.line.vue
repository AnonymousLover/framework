<template>
  <div class="progress-line" :data-value="value">
    <div class="line-inner" :style="lineStyle"/>
  </div>
</template>
<script type="text/babel">
  import progressMixins from '../mixins/progress'
  import { base } from '../../../util'

  export default {
    mixins  : [progressMixins],
    computed: {
      lineStyle() {
        const { total, color, time, percent } = this;
        return [
          'width:' + (percent * 100 / total).toFixed(2) + '%',
          'transition-duration:' + time + 'ms',
          'background:' + color
        ].join(';')
      }
    }
  }
</script>
