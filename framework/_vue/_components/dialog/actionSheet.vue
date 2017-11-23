<template>
  <v-modal v-model="showModal">
    <div class="action-sheet">
      <ul class="item-view">
        <li class="item-list" v-for="(b,i) in btnList" :key="i"
            @tap="tap(i)" v-html="b.text == null ? b : b.text"/>
      </ul>
      <ul class="item-view">
        <li class="item-list cancel" @tap="tap(false)">取消</li>
      </ul>
    </div>
  </v-modal>
</template>
<script type="text/babel">
  import _modal from '../mixins/modal'

  import defaultProps from '../defaultProps'

  export default {
    mixins : [_modal],
    props  : {
      btnList: defaultProps.array
    },
    methods: {
      tap(i) { i === false ? this.display(false) : this.trigger(i) }
    }
  }
</script>
