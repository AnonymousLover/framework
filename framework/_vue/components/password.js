import vPassword from '../_components/password/password.vue'
import vPasswordSuite from '../_components/password/password.suite.vue'

[
  vPassword,
  vPasswordSuite
].forEach(component => {
  component.install = Vue => Vue.component(component.name, component);
})

export {
  vPassword,
  vPasswordSuite,
}
