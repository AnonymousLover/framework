import vScroll from '../_components/scroll/scroll.vue'

[
  vScroll
].forEach(component => {
  component.install = Vue => Vue.component(component.name, component);
})

export {
  vScroll
}
