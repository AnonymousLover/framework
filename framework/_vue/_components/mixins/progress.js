import '../../../less/progress.less'
import defaultProps from '../defaultProps'

export default {
  props   : {
    value : defaultProps.number,
    reduce: defaultProps.bool,
    color : defaultProps.setValue('#20A0FF'),
    total : defaultProps.setValue(100)
  },
  data() {
    return {
      oldValue: this.reduce ? this.total : 0,
      distance: 0,
    }
  },
  mounted() { this.progress() },
  updated() { this.progress() },
  computed: {
    time() {
      const time = Math.round(this.distance / 0.05);
      return time > 2000 ? 2000 : time
    },
    percent() {
      const { oldValue, total } = this;
      return Math.min(total, oldValue);
    }
  },
  methods : {
    progress() {
      let { value, oldValue, total } = this;

      this.oldValue = value = Math.min(total, value);
      const distance = Math.abs(value - oldValue)
      if (distance > 0) this.distance = distance;
    }
  }
}
