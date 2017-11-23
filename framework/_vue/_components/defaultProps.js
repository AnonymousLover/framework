export default {
  array : { type: Array, default: () => [] },
  object: { type: Object, default: () => new Object() },
  func  : { type: Function, default: () => () => {} },
  string: { type: String, default: '' },
  bool  : { type: Boolean, default: false },
  number: { type: Number, default: 0 },
  setValue(val) { return { default: val }}
};


