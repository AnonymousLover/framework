<template>
  <v-load v-model="showModal">
    <div class="spinner">
      <svg v-if="!toast" class="spinner-circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none"/>
      </svg>
      <p v-if="text" :class="{'loading-txt':!toast}" v-html="text"/>
    </div>
  </v-load>
</template>
<script type="text/babel">
  import _modal from '../mixins/modal'
  import defaultProps from '../defaultProps'

  export default {
    mixins: [_modal],
    props : {
      text : defaultProps.string,
      toast: defaultProps.bool
    }
  }
</script>
