<template>
  <nav class="sticky">
    <slot/>
  </nav>
</template>
<script type="text/babel">
  import defaultProps, { $vue } from '../defaultProps'

  import { log } from '../../../util'

  const { getParent } = $vue

  export default {
    props: {
      top: defaultProps.number
    },
    mounted() {
      const wrapper = getParent(this, 'v-scroll');
      if (wrapper == null) return log.error('sticky must in scroll')
      const { $el } = this
      this.$nextTick(() => {
        const { _scroll, $refs } = wrapper;
        _scroll.toggleEvent('scroll', () => {

        })
      })
    }
  }
</script>

