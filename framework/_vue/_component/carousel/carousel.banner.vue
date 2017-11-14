<template>
  <div class="carousel-wrapper">
    <div class="carousel-body"
         ref="_body"
         @drag="_drag"
         @dragend="_dragEnd">
      <div class="carousel-item"
           v-for="(image,index) in imgList"
           :key="index"
           @tap="_click(image)">
        <img :src="image.src"/>
      </div>
    </div>
    <ol class="carousel-indicator"
        ref="_indicator">
      <li class="indicator"
          v-for="(item,index) in items"
          :key="index"/>
    </ol>
  </div>
</template>
<script type="text/babel">
  import carouselMixins from '../mixins/carousel'

  export default {
    mixins : [carouselMixins],
    props  : {
      items : { default: [] },
      isLoop: { default: false },
      auto  : { default: 0 },
      click : '',
    },
    created() {
      this.initialize();
    },
    watch  : {
      items() {
        this.initialize();
      },
      isLoop() {
        this.initialize();
      },
      auto() {
        this.vStatus = 0;
        setTimeout(() => this.vStatus = 2, 16.7);
      }
    },
    methods: {
      initialize() {
        let items    = Object.assign([], this.items);
        this.imgList = this.isLoop ? items.slice(-1)
          .concat(items).concat(items.slice(0, 1)) : items;
        this.vStatus = 0;
        this.$nextTick(() => this._tick());
      },
      _click(item) {
        this.click && this.click(Object.assign({}, item));
      }
    }
  }
</script>
