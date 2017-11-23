<template>
  <div class="carousel-wrapper">
    <div class="carousel-body" ref="_body" @drag="_drag" @dragend="_dragEnd">
      <slot/>
    </div>
    <ol class="indicator" ref="_indicator">
      <li v-for="(slot,i) in $slots.default" :key="i"/>
    </ol>
  </div>
</template>
<script type="text/babel">
  import carouselMixins from '../mixins/carousel'

  export default {
    mixins : [carouselMixins],
    created() { this.initialize() },
    watch  : { vStatus() {} },
    methods: {
      initialize() {
        this.vStatus = 0;
        this.$nextTick(() => this._tick());
      }
    }
  }
</script>
