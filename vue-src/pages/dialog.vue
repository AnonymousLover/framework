<template>
  <div>
    <button class="btn-block" v-for="btn in btnList" @tap="btn.click" v-html="btn.text"/>
  </div>
</template>
<script type="text/babel">

  import $dialog from '../../framework/_vue/components/dialog'
  import $log from '../../framework/util/log'

  export default {
    data() {
      return {
        btnList: [
          { text: 'alert', click: this.alert.bind(this, false) },
          { text: 'alert不带标题', click: this.alert.bind(this, true) },
          { text: 'confirm', click: this.confirm.bind(this, false) },
          { text: 'confirm不带标题', click: this.confirm.bind(this, true) },
          { text: 'loading 加载中', click: this.loading.bind(this, '加载中') },
          { text: 'loading', click: this.loading.bind(this, '') },
          { text: 'toast提示', click: this.toast.bind(this, 'toast提示') },
          { text: 'actionSheet1', click: this.actionSheet.bind(this, ['拍照或录像', '选取现有的'], $log.debug) },
          { text: 'actionSheet2', click: this.actionSheet.bind(this, ['回复', '转发', '打印'], $log.debug) },
        ]
      }
    },
    methods: {
      alert(noTitle) {
        $dialog.alert({
          title  : noTitle ? '' : 'alert',
          content: '删除消息成功',
          click  : $log.debug
        })
      },
      confirm(noTitle) {
        $dialog.confirm({
          title  : noTitle ? '' : 'confirm',
          content: '确认要删除当前消息?',
          click  : $log.debug
        })
      },
      loading(text) {
        $dialog.spinner(text);
      },
      toast(text) {
        $dialog.toast(text)
      },
      actionSheet(btnList) {
        $dialog.actionSheet(btnList, $log.debug);
      },
    }
  }
</script>
