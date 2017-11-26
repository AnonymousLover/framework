<template>
  <div :class="[ clz ]" @drag="_drag" @dragend="_dragEnd">
    <div class="scroll-body" ref="_body">
      <slot/>
    </div>
  </div>
</template>

<script type="text/babel">
  import '../../../less/scroll.less'
  import defaultProps from '../defaultProps'

  import { throttle } from '../../../util/util'

  export default {
    props   : {
      scrollEnd : defaultProps.func,
      scroll    : defaultProps.func,
      native    : defaultProps.bool,
      horizontal: defaultProps.bool
    },
    computed: {
      clz() { return `${this.native ? 'static' : 'scroll'}-wrapper` }
    },
    created() { this._tick() },
    methods : {
      _tick() {
        this._scroll = { sx: 0, sy: 0 }
      },
      _reLayout() {
        const _body = this.$refs._body;
        //计算滚动区域的宽高
        const {
                offsetWidth,
                offsetHeight,
                parentNode
              }     = _body;
        // 计算父节点的宽高
        const {
                offsetWidth : offsetWidth1,
                offsetHeight: offsetHeight1
              }     = parentNode;
        return {
          maxX: Math.min(offsetWidth1 - offsetWidth, 0),
          maxY: Math.min(offsetHeight1 - offsetHeight, 0)
        }
      },
      _reckon(event) {
        const that       = this;
        const _scroll    = that._scroll;
        const { detail } = event;
        let horizontal   = that.horizontal;
        let { sx, sy }   = _scroll;
        let direction    = detail.direction,
              deltaX     = detail.deltaX,
              deltaY     = detail.deltaY;
        const index      = horizontal ? ['left', 'right'].indexOf(direction)
          : ['up', 'down'].indexOf(direction);
        if (index === -1) return null;
        horizontal ? sx += deltaX : sy += deltaY;
        return { sx, sy }
      },
      _drag(event) {
        const reckon = this._reckon(event);
        if (reckon === null) return;
        const { sx, sy } = reckon;
        this.setTranslate(sx, sy, 0)
      },
      _dragEnd(event) {
        const reckon     = this._reckon(event);
        const { sx, sy } = reckon || this._scroll;
        this.scrollTo(sx, sy, 300);
      },
      scrollTo(x, y, time) {
        const { _scroll }    = this;
        const { maxX, maxY } = this._reLayout();
        this.setTranslate(
          _scroll.sx = x < maxX ? maxX : x > 0 ? 0 : x,
          _scroll.sy = y < maxY ? maxY : y > 0 ? 0 : y,
          time
        )
      },
      setTranslate(x, y, time) {
        const { style }                      = this.$refs._body;
        style.webkitTransitionDuration       = (time || 0) + 'ms';
        style.webkitTransitionTimingFunction = 'cubic-bezier(0.22, 0.61, 0.35, 1)';
        style.webkitTransform                = 'translate3d(' + x + 'px,' + y + 'px,0) translateZ(0)';
      },
    }
  }
</script>
