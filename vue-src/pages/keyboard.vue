<template>
  <v-form :submit="submit">
    <v-input v-for="(i,idx) in inputs"
             :readonly="i.readonly"
             :type="i.type"
             :key="idx"
             :name="i.name"
             :class="i.className"
             v-model="i.value"
             :click="i.click ? i.click.bind(i,i) : null"
             :label="i.label"
             :validate="i.validate"
             :require="i.require"
             :placeholder="i.placeholder"/>
  </v-form>
</template>
<script type="text/babel">

  import {
    vInput, vForm,
    keyboardMixins,
    $keyboard
  } from '../../framework/_vue'

  import { log as $log } from '../../framework/util'

  const closeFn = $log.debug.bind($log, '关闭键盘');

  export default {
    mixins    : [keyboardMixins],
    components: {
      vInput,
      vForm
    },
    data() {
      return {
        options: {
          title: {
            value: '虚拟键盘'
          }
        },
        inputs : [
          {
            label   : '账号', placeholder: '系统键盘', value: '', className: 'flt',
            readonly: false, type: 'text', name: 'name', require: true,
          },
          {
            label   : '昵称', placeholder: '系统键盘', value: '', className: '',
            readonly: false, type: 'text', name: 'nick', require: true,
          },
          {
            label   : '密码', placeholder: '全键盘', value: '',
            readonly: true, type: 'password', name: 'password', require: true,
            click   : that => this.keyboard('complex', true, null, that, closeFn)
          },
          {
            label   : '手机号', placeholder: '数字键盘9', value: '',
            readonly: true, type: 'text', name: 'count', require: true,
            click   : that => this.keyboard('number', true, null, that, closeFn)
          }
        ]
      }
    },
    mounted() {
      this.inputs.push({
        label   : '年龄', placeholder: '数字键盘', value: '',
        readonly: true, type: 'text', name: 'age',
        click   : that => this.keyboard('number', false, null, that, closeFn)
      })
    },
    methods   : {
      submit(store) {
        console.log(store);
      }
    }
  }
</script>
