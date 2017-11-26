<template>
  <div>
    <button @tap="rePay">重新支付</button>
    <v-password-suite/>
    <v-password-suite type="complex"/>
    <v-password-suite has-change/>
    <v-password-suite has-change type="complex"/>
  </div>
</template>
<script type="text/babel">
  import { vPasswordSuite } from '../../framework/_vue/components/password'

  export default {
    components: { vPasswordSuite },
    data() {
      return { pwdModal: true }
    },
    methods   : {
      submit(password) {
        console.log(password);
      },
      rePay() {
        this.pwdModal = true;
      }
    }
  }
</script>
