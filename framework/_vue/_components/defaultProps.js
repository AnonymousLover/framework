export default {
  array   : { type: Array, default: () => [] },
  object  : { type: Object, default: () => new Object() },
  func    : { type: Function, default: () => () => {} },
  string  : { type: String, default: '' },
  bool    : { type: Boolean, default: false },
  boolTrue: { type: Boolean, default: true },
  number  : { type: Number, default: 0 },
  setValue(val) { return { default: val }},
  oneOf(arr) {
    return {
      validator(val) {
        return arr ? arr.indexOf(val) !== -1 : true
      }
    }
  }
};
// vue 独有的基本方法
export const $vue = {
  getParent(vNode, tag) {
    let $vnode, componentOption;
    do {
      $vnode          = vNode.$vnode || {};
      componentOption = $vnode.componentOptions || {};
      if (componentOption.tag === tag)
        return vNode;
      vNode = vNode.$parent;
    } while (vNode)
  }
}


