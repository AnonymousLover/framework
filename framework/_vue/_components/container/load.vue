<template>
  <div class="loading-container" :class="[ clz ]">
    <slot/>
  </div>
</template>
<script type="text/babel">
  import container from '../mixins/container'

  export default { mixins: [container] }
</script>
