<template>
  <v-modal v-model="showModal">
    <div class="action-sheet">
      <ul class="item-view">
        <li class="item-list"
            v-for="(button,index) in btnList"
            :key="index"
            @tap="_click(index)"
            v-html="button.text == null ? btn : btn.text"/>
      </ul>
      <ul class="item-view">
        <li class="item-list cancel" @tap="_click(false)">取消</li>
      </ul>
    </div>
  </v-modal>
</template>
<script type="text/babel">
  import _modal from '../mixins/modal'

  export default {
    mixins : [_modal],
    props  : {
      btnList: { default: [] }
    },
    methods: {
      _click(item) {
        switch (item) {
          case false:
            return this.showModal = false;
          default:
            this.click && this.click(item);
        }
      }
    }
  }
</script>
