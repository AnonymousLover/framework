<template>
  <div class="popup-container"
       :class="{'active':show}">
    <slot/>
  </div>
</template>
<script type="text/babel">

  import container from '../mixins/container'

  export default {
    mixins: [container]
  }
</script>
