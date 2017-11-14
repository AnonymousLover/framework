import Vue from 'vue'
import vMsgBox from '../_components/dialog/msgBox.vue'
import vLoading from '../_components/dialog/loading.vue'
import vActionSheet from '../_components/dialog/actionSheet.vue'
import { $pop, $load, $modal } from './container'
import { valueFn } from '../../util/util'

[
  vMsgBox,
  vLoading,
  vActionSheet
].forEach(component => {
  component.install = Vue => Vue.component(component.name, component);
});

export {
  vMsgBox,
  vLoading,
  vActionSheet,
}

const MsgBox      = Vue.extend(vMsgBox),
      Loading     = Vue.extend(vLoading),
      ActionSheet = Vue.extend(vActionSheet);

let _msgBox, _loading, _actionSheet;

export default {
  //操作面板
  actionSheet(btnList, callback) {
    if (!_actionSheet || _actionSheet._isDestroyed) {
      _actionSheet = new ActionSheet();
    }
    $modal.show(_actionSheet, { btnList: btnList, click: callback });
  },
  //msgbox的私有方法
  _pop(_opts) {
    if (!_msgBox || _msgBox._isDestroyed) {
      _msgBox = new MsgBox();
    }
    $pop.show(_msgBox, _opts);
  },
  alert(opts = {}) {
    this._pop({
      title    : opts.title,
      content  : opts.content,
      btnList  : [{
        text: opts.okText || '确定',
        type: opts.okType || 'btn-positive'
      }], click: opts.click || valueFn(true)
    })
  },
  confirm(opts = {}) {
    this._pop({
      title  : opts.title,
      content: opts.content,
      btnList: [{
        text: opts.cancelText || '关闭',
        type: opts.cancelType || 'btn-default'
      }, {
        text: opts.okText || '确定',
        type: opts.okType || 'btn-positive'
      }],
      click  : opts.click || valueFn(true)
    })
  },
  //load的私有方法
  _load(_opts) {
    if (!_loading || _loading._isDestroyed) {
      _loading = new Loading();
    }
    $load.show(_loading, _opts)
  },
  spinner(text, delay) {
    this._load({
      text    : text,
      toast   : false,
      delay   : delay,
      callback: null
    })
  },
  closeSpinner: $load.hide.bind($load),
  toast(text, delay, callback) {
    if (typeof delay === 'function') {
      callback = delay;
      delay    = 3500;
    }
    this._load({
      text    : text,
      toast   : true,
      delay   : delay || 3500,
      callback: callback
    })
  }
}

