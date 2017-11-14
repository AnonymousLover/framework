<template>
  <ul class="item-view">
    <li class="item-list"
        v-for="doc in docList"
        v-html="doc.text"
        @click="click(doc.url)"/>
  </ul>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        docList: [
          { url: 'icon', text: 'icon图标' },
          { url: 'dialog', text: 'dialog' },
          { url: 'keyboard', text: '虚拟键盘' },
          { url: 'form', text: 'form表单' },
          { url: 'password', text: '密码组件' }
        ]
      }
    },
    methods: {
      click(url) {
        this.$router.push(url);
      }
    }
  }
</script>
