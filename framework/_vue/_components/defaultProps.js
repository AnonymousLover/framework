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


