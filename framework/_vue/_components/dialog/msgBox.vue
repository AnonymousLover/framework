<template>
  <v-pop v-model="showModal">
    <div class="popup">
      <div class="popup-head" v-if="title">
        <h3 class="popup-title" v-html="title"/>
      </div>
      <div class="popup-body">
        <slot>{{ content }}</slot>
      </div>
      <div class="flex-box popup-btn-wrapper">
        <span class="flex btn" v-for="(b, i) in btnList" :key="i"
              :class="b.type||'btn-default'"
              @tap="trigger(i)" v-html="b.text"/>
      </div>
    </div>
  </v-pop>
</template>
<script type="text/babel">
  import _modal from '../mixins/modal'
  import defaultProps from '../defaultProps'

  export default {
    mixins: [_modal],
    props : {
      title  : defaultProps.string,
      content: defaultProps.string,
      btnList: defaultProps.array
    }
  }
</script>
