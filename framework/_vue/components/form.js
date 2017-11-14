import vInput from '../_components/form/input.vue'
import vForm from '../_components/form/form.vue'

[
  vInput,
  vForm
].forEach(component => {
  component.install = Vue => Vue.component(component.name, component);
})

export {
  vInput,
  vForm
}
