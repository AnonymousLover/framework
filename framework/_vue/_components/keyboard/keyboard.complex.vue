<template>
  <div class="key-body complex" :class="[ clz ]">
    <slot/><!-- 内嵌插槽--组合组件  -->
    <h5><i/>安全键盘</h5>
    <ul v-for="(b,i) in boardKey" :key="i" :class="'line_'+i" @tap="_tap">
      <li v-for="(k,j) in b" :key="j" :class="getClass(k)" v-html="k"/>
    </ul>
  </div>
</template>
<script type="text/babel">
  import '../../../less/keyboard.less'
  import defaultProps from '../defaultProps'

  export default {
    props   : {
      type : defaultProps.setValue('lower'),
      click: defaultProps.func
    },
    data() {
      let boardType = this.type;
      return { boardKey: this.buildKeys(boardType), boardType }
    },
    computed: {
      clz() {
        switch (this.boardType) {
          case 'upper':
            return 'upper-letter';      //大写
          case 'lower':
          case 'ABC':
            return 'letter';            //字母
          case '.?123':
          case '123':
          case '#+=':
            return 'symbol';            //符号
        }
      }
    },
    watch   : {
      boardType(type) {
        const boardKey = this.buildKeys(type);
        if (boardKey) this.boardKey = boardKey;
      }
    },
    methods : {
      buildKeys(type) {
        switch (type) {
          case 'upper':
            return [
              'QWERTYUIOP'.split(''),
              'ASDFGHJKL'.split(''),
              ['lower'].concat('ZXCVBNM'.split('')).concat('back'),
              ['.?123', 'space', '确定']
            ]
          case 'ABC':
          case 'lower':
            return [
              'qwertyuiop'.split(''),
              'asdfghjkl'.split(''),
              ['upper'].concat('zxcvbnm'.split('')).concat('back'),
              ['.?123', 'space', '确定']
            ]
          case '.?123':
          case '123':
            return [
              '1234567890'.split(''),
              '-/:;()$&@"'.split(''),
              ['#+='].concat('.,?!\''.split('')).concat('back'),
              ['ABC', 'space', '确定']
            ]
          case '#+=':
            return [
              '[]{}#%^*+='.split(''),
              '_\\|~<>€£¥•'.split(''),
              ['123'].concat('.,?!\''.split('')).concat('back'),
              ['ABC', 'space', '确定']
            ]
        }
      },
      getClass(key) {
        switch (key) {
          case 'upper':
          case 'lower':
          case 'ABC':
          case '.?123':
          case '123':
          case '#+=':
            return 'key-switch';
          case 'back':
            return 'key-back';
          case 'space':
            return 'space';
          case '确定':
            return 'key-ent';
        }
      },
      _tap(event) {
        let target = event.target, result;
        if (target.tagName === 'LI') {
          result = target.innerHTML;
          switch (result) {
            case 'upper':
            case 'lower':
            case 'ABC':
            case '.?123':
            case '123':
            case '#+=':
              return this.boardType = result;
            default:
              this.click && this.click(true, result);
          }
        }
      }
    }
  }
</script>
