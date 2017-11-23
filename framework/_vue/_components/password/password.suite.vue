<template>
  <div class="password-group">
    <h4>请输入支付密码</h4>
    <slot/>
    <v-password v-if="simple" v-model="password.value" :click="_click"/>
    <v-input v-else label="支付密码" v-model="password.value" type="password" :readonly="true" :click="_click"/>
    <p class="corner">
      <a v-if="hasChange" @tap="change" v-html="changeText"/>
      <a v-if="_hasForget" @tap="forget">忘记密码</a>
    </p>
  </div>
</template>
<script type="text/babel">
  import passwordMixin from '../mixins/password';
  import passwordSuiteMixin from '../mixins/password.suite.js';
  import keyboardMixin from '../mixins/keyboard';

  export default {
    mixins  : [passwordMixin, passwordSuiteMixin, keyboardMixin],
    data() {
      const simple = this.type === 'simple'
      return { simple, password: { value: this.value } }
    },
    computed: {
      changeText() { return this.simple ? '复杂密码' : '简单密码' }
    },
    watch   : {
      password: {
        deep: true,
        handler(pwd = {}) {
          this.$emit('input', pwd.value)
        }
      },
      type(val) { this.simple = val === 'simple' },
      value(val) { this.password.value = val }
    },
    methods : {
      _click() {
        this.simple ? this.keyboard('password', true, 6, this.password)
          : this.keyboard('complex', true, 16, this.password);
      },
    }
  }
</script>
