<template>
  <header class="header">
    <div class="title">
      <slot>{{ title }}</slot>
    </div>
    <i v-for="btn in btnList"></i>
  </header>
</template>
<script type="text/babel">
  import defaultProps from '../defaultProps'

  export default {
    props: {
      back : defaultProps.boolTrue,
      title: defaultProps.string,
    },
    data() {
      return {
        btnList: []
      }
    }
  }
</script>
