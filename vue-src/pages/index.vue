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
          { url: 'password', text: '密码组件' },
          { url: 'tabs', text: 'tab页组件' },
          { url: 'collapse', text: '折叠面板' },
          { url: 'filter', text: '筛选组件' },
          { url: 'carousel', text: '走马灯' },
          { url: 'step', text: '步骤条' },
          { url: 'picker', text: '选择器(不完整)' },
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
