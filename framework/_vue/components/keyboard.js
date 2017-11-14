import Vue from 'vue'
import vKeyboardModal from '../_components/keyboard/keyboard.modal.vue'
import vKeyboardSimple from '../_components/keyboard/keyboard.simple.vue'
import vKeyboardComplex from '../_components/keyboard/keyboard.complex.vue'
import { $modal } from './container'
import { extend, noop } from '../services/common'

[
  vKeyboardSimple,
  vKeyboardComplex,
  vKeyboardModal
].forEach(component => {
  component.install = Vue => Vue.component(component.name, component);
});

export {
  vKeyboardSimple,
  vKeyboardComplex,
  vKeyboardModal
}

const ModalKeyboard = Vue.extend(vKeyboardModal);

let number   = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0],
    idCard   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0],
    password = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0];

let _keyboard;

export default {
  show(_opts) {
    //组件不存在或者组件被销毁
    if (!_keyboard || _keyboard._isDestroyed) {
      _keyboard = new ModalKeyboard();
    }
    let click = _opts.click || noop;
    $modal.show(_keyboard, extend(_opts, {
      click: char => {
        char == 'hide' ? this.hide() : click(char);
      }
    }), () => click(false));
  },
  hide    : $modal.hide.bind($modal),
  number  : function (isNine, callback) {
    this.show({
      type  : 'simple',
      keys  : number.concat(isNine ? 'back' : 'hide'),
      others: isNine ? [] : ['back', '确定'],
      click : callback
    });
  },
  idCard  : function (isNine, callback) {
    this.show({
      type  : 'simple',
      keys  : idCard.concat(isNine ? 'back' : 'hide'),
      others: isNine ? [] : ['back', '确定'],
      click : callback
    });
  },
  password: function (isNine, callback) {
    this.show({
      type  : 'simple',
      keys  : password.concat(isNine ? 'back' : 'hide'),
      others: isNine ? [] : ['back', '确定'],
      click : callback
    });
  },
  complex : function (isNine, callback) {
    this.show({
      type : 'complex',
      click: callback
    });
  }
}
