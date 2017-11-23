<template>
  <div class="password-group" :class="[ _typeClass ]">
    <h4>请输入支付密码</h4>
    <slot/>
    <v-password v-model="password.value" :click="_click"/>
    <v-input label="支付密码" v-model="password.value" type="password" :readonly="true" :click="_click"/>
    <p class="corner">
      <a v-if="hasChange" @tap="change" v-html="changeText"/>
      <a v-if="_hasForget" @tap="forget">忘记密码</a>
    </p>
    <button disabled ref="$btn">下一步</button>
  </div>
</template>
<script type="text/babel">
  import passwordMixin from '../mixins/password';
  import passwordSuiteMixin from '../mixins/password.suite.js';
  import keyboardMixin from '../mixins/keyboard';

  export default {
    mixins  : [
      passwordMixin,
      passwordSuiteMixin,
      keyboardMixin
    ],
    data() {
      const show = this.type === 'simple' ? 'simple' : 'complex'
      return { show, password: { value: this.value } }
    },
    computed: {
      _type() { return this.checkType() },
      _typeClass() { return this.checkType() ? 'simple' : 'default' },
      changeText() { return this.checkType() ? '复杂密码' : '简单密码' }
    },
    watch   : {
      password: {
        deep: true,
        handler(pwd = {}) {
          this.$refs.$btn.disabled = pwd.value.length < 6;
          this.$emit('input', pwd.value);
        }
      },
      type(val) {
        this.show = this.checkType(val) ? 'simple' : 'complex'
      },
      value(val) { this.password.value = val }
    },
    methods : {
      _click() {
        this.checkType() ? this.keyboard('password', true, 6, this.password)
          : this.keyboard('complex', true, 16, this.password);
      },
    }
  }
</script>
