<template>
  <v-scroll>
    <ul class="item-view">
      <li class="item-list"
          v-for="doc in docList"
          v-html="doc.text"
          @click="click(doc.url)"/>
    </ul>
  </v-scroll>
</template>
<script type="text/babel">
  import { vScroll } from '../../framework/_vue/components/scroll'

  export default {
    components: {
      vScroll
    },
    data() {
      return {
        docList: [
          { url: 'icon', text: 'icon图标' },
          { url: 'dialog', text: 'dialog' },
          { url: 'keyboard', text: '虚拟键盘' },
          { url: 'form', text: 'form表单' },
          { url: 'password', text: '密码组件' },
          { url: 'carousel', text: '轮播组件' },
          { url: 'progress', text: '进度条' },
        ]
      }
    },
    methods   : {
      click(url) {
        this.$router.push(url);
      }
    }
  }
</script>
