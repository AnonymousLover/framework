<template>
  <div class="modal-container" :class="[ clz ]" @tap="tap">
    <slot/>
  </div>
</template>
<script type="text/babel">
  import container from '../mixins/container'

  export default {
    mixins : [container],
    methods: {
      tap(event) {
        const { classList } = event.target;
        classList.contains('modal-container') && this.display(false);
        event.stopPropagation();
      }
    }
  }
</script>
