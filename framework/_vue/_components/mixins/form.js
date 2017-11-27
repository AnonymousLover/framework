import { base, validate, log as $log } from '../../../util'

const { empty: isEmpty } = validate

//用户form组件的混合...
export default {
  mounted() { this.structure(true) },
  beforeUpdate() { this.structure(true) },
  methods: {
    structure(isInit) {
      isInit && (this.vStore = {}, this.vMap = {});
      let self   = this,
          vStore = self.vStore;
      (self.$slots.default || []).forEach(slot => {
        const { tag, propsData: props = {} } = slot.componentOptions;
        if (tag !== 'v-input') return
        let { name, label, validate: vdFn } = props;
        if (!base.isFunc(vdFn)) {
          vdFn = props.require ? isEmpty.bind(null, label)
            : base.valueFn({ flag: true })
        }
        if (isInit) {
          if (!name) return $log.error('input must have [name] attribute');
          props.validate    = self.validate.bind(this, vdFn, name);
          self.vStore[name] = props.value || '';
          props.validate(props.value || '');
        } else props.value = vStore[name];
      });
      this.vMapEach();
    },
    validate(vdFn, key, val) {
      let error        = vdFn(val);
      this.vStore[key] = val;
      this.vMap[key]   = error.flag;
      return this.vMapEach(), error;
    },
    vMapEach() {
      let invalid = null, vMap = this.vMap;
      for (let name in vMap) {
        if (invalid === false) break;
        invalid = vMap[name]
      }
      if (this.vInvalid !== invalid) {
        this.$refs.btnNode.disabled = !(this.vInvalid = invalid);
      }
    }
  }
}
