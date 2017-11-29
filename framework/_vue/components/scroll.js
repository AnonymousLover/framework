import vScroll from '../_components/scroll/scroll.vue'
import vSticky from '../_components/scroll/sticky.vue'

[
  vScroll,
  vSticky
].forEach(component => {
  component.install = Vue => Vue.component(component.name, component);
})

export {
  vScroll,
  vSticky
}
