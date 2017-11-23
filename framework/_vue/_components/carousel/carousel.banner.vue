<template>
  <div class="carousel-wrapper">
    <div class="carousel-body" ref="_body" @drag="_drag" @dragend="_dragEnd">
      <div class="carousel-item" v-for="(b,i) in imgList" :key="i" @tap="tap(b)">
        <img :src="b.src"/>
      </div>
    </div>
    <ol class="carousel-indicator" ref="_indicator">
      <li class="indicator" v-for="(b,i) in items" :key="i"/>
    </ol>
  </div>
</template>
<script type="text/babel">
  import carouselMixins from '../mixins/carousel'
  import defaultProps from '../defaultProps'
  import { $$raf, extend } from '../../../util/util'

  export default {
    mixins : [carouselMixins],
    props  : {
      items : defaultProps.array,
      isLoop: defaultProps.bool,
      auto  : defaultProps.number,
      click : defaultProps.func,
    },
    created() { this.initialize() },
    watch  : {
      items() { this.initialize() },
      isLoop() { this.initialize() },
      auto() {
        this.vStatus = 0;
        $$raf(() => this.vStatus = 2);
      }
    },
    methods: {
      initialize() {
        let items    = extend([], this.items);
        this.imgList = this.isLoop ? items.slice(-1)
          .concat(items).concat(items.slice(0, 1)) : items;
        this.vStatus = 0;
        this.$nextTick(() => this._tick());
      },
      tap(item) { this.click && this.click(extend({}, item)) }
    }
  }
</script>
