<template>
  <div class="progress-circle" :data-value="value">
    <svg viewBox="0 0 100 100">
      <path :d="trackPath"
            stroke="#e5e9f2"
            :stroke-width="relativeStrokeWidth"
            fill="none"/>
      <path :d="trackPath"
            stroke-linecap="round"
            :stroke="color"
            :stroke-width="relativeStrokeWidth"
            fill="none"
            :style="circlePathStyle"/>
    </svg>
    <span class="circle-text"><slot/></span>
  </div>
</template>
<script type="text/babel">

  import progressMixins from '../mixins/progress'
  import vProgressNumber from './progress.number.vue'
  import { base } from '../../../util'

  export default {
    components: { vProgressNumber },
    mixins    : [progressMixins],
    computed  : {
      trackPath() {
        const radius = parseInt(50 - this.relativeStrokeWidth / 2, 10);
        return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
      },
      relativeStrokeWidth() { return 5.8 },
      perimeter() {
        const radius = 50 - this.relativeStrokeWidth / 2;
        return 2 * Math.PI * radius;
      },
      circlePathStyle() {
        const { perimeter, time, total, percent } = this;
        return [
          'stroke-dasharray:' + perimeter + 'px,' + perimeter + 'px',
          'stroke-dashoffset:' + (1 - percent / total) * perimeter + 'px',
          'transition:stroke-dashoffset ' + time + 'ms, stroke ' + time + 'ms'
        ].join(';')
      }
    }
  }
</script>
