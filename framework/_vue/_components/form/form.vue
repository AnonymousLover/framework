<template>
  <div class='input-group'>
    <slot/>
    <button ref="btnNode" v-html="btnText" @tap="tap"/>
  </div>
</template>
<script type="text/babel">
  import formMixins from '../mixins/form'
  import defaultProps from '../defaultProps'

  export default {
    mixins : [formMixins],
    props  : {
      btnText: defaultProps.setValue('确定'),
      submit : defaultProps.func
    },
    methods: {
      tap(event) {
        event.stopPropagation();
        this.submit(Object.assign({}, this.vStore));
      }
    }
  }
</script>
