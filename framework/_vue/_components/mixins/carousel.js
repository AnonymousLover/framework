/**
 * Created by h5 on 2017/8/11.
 */
import '../../../less/carousel.less'
import defaultProps from '../defaultProps'

export default {
  props  : { slider: defaultProps.func },
  data() {
    this.maxX = this.scrollX = this.itemWidth = ~~(this._timeout = false);
    return {
      itemList: [],   //带自动轮播
      active  : 0,    // 当前活跃的active
      vStatus : 0    //当前状态。。0代表锁定状态。1代表滑动状态。2代表自由状态
    }
  },
  beforeDestroy() { clearTimeout(this._timeout) },
  watch  : {
    vStatus(val) {
      const that = this;
      clearTimeout(that._timeout);
      that._timeout = (val === 2 && that.auto) ?
        setTimeout(() => {
          that.vStatus = 0;
          that.scrollTo(that.scrollX - that.itemWidth, 350);
        }, ~~that.auto) : null;
    },
    active(val) { this.slider(val) }
  },
  methods: {
    _tick() {
      const that              = this;
      const { children = [] } = that.$refs._body;
      // 计算基本属性
      that.itemWidth          = children[0].offsetWidth;
      that.maxX               = (1 - children.length) * that.itemWidth;
      that.scrollX            = that.scrollX || (that.isLoop ? -that.itemWidth : 0);
      that.vStatus            = 2;
      that.scrollTo(that.scrollX, 0);
    },
    _drag(event) {
      const that = this;
      if (that.vStatus === 0) return;
      const {
              direction,
              deltaX = 0
            }         = event.detail || {};
      let { scrollX } = that;

      const index = ['left', 'right'].indexOf(direction); // -1 0 1

      if (index !== -1) {
        scrollX += deltaX
        if (scrollX <= 0 && scrollX >= that.maxX && scrollX !== that.scrollX) {
          that.setTranslate(scrollX, 0);
        }
        that.vStatus = 1;
      }
      that.vStatus === 1 && event.stopPropagation();
    },
    _dragEnd(event) {
      const that = this;
      if (that.vStatus !== 1) return;
      let detail    = event.detail || {},
          direction = detail.direction,
          deltaX    = detail.deltaX,
          $deltaX   = Math.abs(deltaX),
          speed     = $deltaX / detail.deltaTime,
          itemWidth = that.itemWidth;
      const index   = ['left', 'right'].indexOf(direction); // -1 0 1
      deltaX        = index !== -1 ? (speed > .8 && $deltaX * 4 > itemWidth) || $deltaX * 2 > itemWidth ?
        index ? deltaX > 0 ? itemWidth : 0 : deltaX < 0 ? -itemWidth : 0 : 0 : 0
      that.vStatus  = 0;
      that.scrollTo(that.scrollX + deltaX, 300);
    },
    scrollTo(scrollX, time) {
      const that                = this;
      const { itemWidth, maxX } = that;
      that.setTranslate(scrollX = scrollX > 0 ? 0 : scrollX < maxX ? maxX : scrollX, time);
      time ? setTimeout(() => {
        that.isLoop && this.setTranslate(scrollX = scrollX >= 0 ? maxX + itemWidth
          : scrollX <= maxX ? -itemWidth : scrollX, 0);
        that.vStatus = 2, that.scrollX = scrollX, that.indicatorClass();
      }, time + 16.6666) : that.indicatorClass();
    },
    setTranslate(x, time) {
      const { _body }                      = this.$refs;
      _body.style.webkitTransitionDuration = (time || 0) + 'ms';
      _body.style.webkitTransform          = 'translate3d(' + x + 'px,0,0) translateZ(0)';
    },
    indicatorClass() {
      let index    = Math.abs(this.scrollX / this.itemWidth),
          children = this.$refs._indicator.children || [];
      this.active  = this.isLoop ? index - 1 : index;
      for (let i = 0, ii = children.length; i < ii; i++) {
        children[i].classList[this.active === i ? 'add' : 'remove']('active');
      }
    }
  }
}
