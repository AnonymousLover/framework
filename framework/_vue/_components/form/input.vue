<template>
  <div class="form-input" :class="[ typeClass ]" @tap="inputTap">
    <label v-if="label" v-html="label"/>
    <input autocomplete="off"
           spellcheck="false"
           :type="type"
           :maxlength="maxLength"
           :placeholder="placeholder"
           @focus="focusBlur"
           @blur="focusBlur"
           v-model="inputValue">
    <i v-if="!readonly" class="icon-font clear" @tap="clear"/>
    <small class="err-tip" v-html="errorMsg"/>
    <slot/>
  </div>
</template>
<script type="text/babel">
  import '../../../less/form.less'
  import defaultProps from '../defaultProps'

  export default {
    props   : {
      label      : defaultProps.string,
      type       : defaultProps.setValue('text'),
      name       : defaultProps.string,
      value      : defaultProps.string,
      maxLength  : defaultProps.string,
      require    : defaultProps.bool,
      readonly   : defaultProps.bool,
      placeholder: defaultProps.string,
      validate   : defaultProps.func,
      click      : defaultProps.func
    },
    data() {
      return {
        errorMsg  : '',
        showClear : false,
        showFocus : false,
        inputValue: this.value
      }
    },
    methods : {
      focusBlur(event) {
        let value      = this.inputValue,
            isFocus    = event.type === 'focus';
        this.showClear = isFocus || !!value;
        this.showFocus = isFocus;
      },
      clear() { this.inputValue = ''},
      inputTap() { this.readonly && this.click() }
    },
    computed: {
      typeClass() {
        const { errorMsg, showClear, showFocus, $slots, readonly } = this;
        return [
          errorMsg ? 'error' : '',
          showClear ? 'on' : '',
          showFocus ? 'focus' : '',
          ($slots.default || []).length ? 'small' : '',
          readonly ? 'readonly' : ''
        ];
      }
    },
    watch   : {
      inputValue(val) {
        let validate   = this.validate,
            error      = validate ? validate(val) : {};
        this.showClear = !!val;
        this.errorMsg  = error.message;
        this.$emit('input', val);
      },
      value(val) { this.inputValue = val }
    }
  }
</script>
