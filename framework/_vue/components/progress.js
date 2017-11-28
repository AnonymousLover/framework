import vProgressCircle from '../_components/progress/progress.circle.vue'
import vProgressLine from '../_components/progress/progress.line.vue'
import vProgressNumber from '../_components/progress/progress.number.vue'

[
  vProgressCircle,
  vProgressLine,
  vProgressNumber
].forEach(component => {
  component.install = Vue => Vue.component(component.name, component);
})

export {
  vProgressCircle,
  vProgressLine,
  vProgressNumber
}
