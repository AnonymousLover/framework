import Inferno from 'inferno'
import Component from 'inferno-component'
import PropTypes from 'prop-types'

import '../../less/carousel.less'

import { el, base } from '../../util'

const { bool, number, func, array } = PropTypes

const { NO_OP, extend, timeout, isFunc, isNull } = base

class Base extends Component {

  // 属性集合
  attr = {
    maxX     : 0, // 最大的滚动距离
    scrollX  : 0, // 当前位置
    itemWidth: 0, // 单位宽度
    status   : 0  // 当前状态
  }

  time = null

  state = {
    itemList: []
  }

  componentDidMount() {
    const { children }        = this._vNode.dom
    const [_body, _indicator] = [...children]

    this.$els = { _body, _indicator }
    this.initialize();
    el.$raf(() => this._tick())
  }

  initialize = NO_OP

  status = (val) => {
    const that                      = this;
    const { props: { auto }, attr } = that;
    isFunc(that.time) && that.time();
    that.time = val === 2 && auto ? timeout(() => {
      attr.status = 0
      that.scrollTo(attr.scrollX - attr.itemWidth, 350)
    }) : null;
    return isNull(val) ? attr.status : (attr.status = val, val);
  }

  _tick = () => {
    const that                  = this
    const { attr, props, $els } = that
    const { children = [] }     = $els._body

    // 计算基本属性
    const itemWidth = children[0].offsetWidth
    const maxX      = (1 - children.length) * itemWidth
    const scrollX   = attr.scrollX || (props.isLoop ? -itemWidth : 0)
    const status    = that.status(2)
    // 属性合并
    extend(this.attr, { itemWidth, maxX, scrollX, status });
    // 初始化到指定位置
    that.scrollTo(scrollX, 0)
  }

  drag = (event) => {
    const that     = this;
    const { attr } = that;

    // 获取当前状态
    let { status: vStatus, scrollX } = attr;
    if (vStatus === 0) return

    const { direction, deltaX = 0 } = event.detail || {};

    const index = ['left', 'right'].indexOf(direction); // -1 0 1

    if (index !== -1) {
      scrollX += deltaX;
      if (scrollX <= 0 && scrollX >= attr.maxX
        && scrollX !== attr.scrollX) {
        that.setTranslate(scrollX, 0);
      }
      vStatus = this.status(1);
    }
    vStatus === 1 && event.stopPropagation();
  }

  dragEnd = (event) => {
    const that     = this;
    const { attr } = that;

    // 获取当前状态
    let { status: vStatus, itemWidth } = attr;
    if (vStatus !== 1) return;
    let detail    = event.detail || {},
        direction = detail.direction,
        deltaX    = detail.deltaX,
        $deltaX   = Math.abs(deltaX),
        speed     = $deltaX / detail.deltaTime;
    const index   = ['left', 'right'].indexOf(direction); // -1 0 1
    deltaX        = index !== -1 ? (speed > .8 && $deltaX * 5 > itemWidth) || $deltaX * 2 > itemWidth ?
      index ? deltaX > 0 ? itemWidth : 0 : deltaX < 0 ? -itemWidth : 0 : 0 : 0
    this.status(0)
    that.scrollTo(attr.scrollX + deltaX, 300);
  }

  scrollTo = (scrollX, time) => {
    const that                = this;
    const { attr, props }     = that
    const { itemWidth, maxX } = attr;
    const { isLoop }          = props;

    this.setTranslate(
      scrollX = scrollX > 0 ? 0
        : scrollX < maxX ? maxX
          : scrollX,
      time
    );
    time ? timeout(() => {
      isLoop && this.setTranslate(
        scrollX = scrollX >= 0 ? maxX + itemWidth
          : scrollX <= maxX ? -itemWidth
            : scrollX,
        0
      );
      const status = that.status(2)
      extend(attr, { scrollX, status })
      that.indicatorClass();
    }, time + 16.6666) : that.indicatorClass();
  }

  setTranslate = (x, time) => {
    const { style }                = this.$els._body;
    style.webkitTransitionDuration = (time || 0) + 'ms';
    style.webkitTransform          = 'translate3d(' + x + 'px,0,0) translateZ(0)';
  }

  indicatorClass = () => {
    const { attr, props: { isLoop, slider } } = this;

    let index    = Math.abs(attr.scrollX / attr.itemWidth),
        children = this.$els._indicator.children || [];
    const active = isLoop ? index - 1 : index;
    for (let i = 0, ii = children.length; i < ii; i++) {
      children[i].classList[active === i ? 'add' : 'remove']('active');
    }
    isFunc(slider) && slider(active)
  }

  renderBefore = NO_OP

  render() {
    const object = this.renderBefore()

    const { content, indicator } = object || {};
    return (
      <div className="carousel-wrapper"
           onDrag={ this.drag } onDragEnd={ this.dragEnd }>
        <div className="carousel-body">{ content }</div>
        <ol className="indicator">{ indicator.map(item => <li/>) }</ol>
      </div>
    )
  }

}

export class Carousel extends Base {

  static propTypes = { slider: func }

  static defaultProps = { slider: NO_OP }

  renderBefore = () => {
    const { children = [] } = this.props;
    return { content: children, indicator: children }
  }
}

// class Banner extends Base {
//   static propTypes = {
//     items : array,
//     isLoop: bool,
//     auto  : number,
//     slider: func,
//   }
//
//   static defaultProps = {
//     items : [],
//     auto  : 0,
//     slider: NO_OP
//   }
//
//   initialize = () => {
//     const { items: items1, isLoop } = this.props
//
//     const items    = extend([], items1)
//     const itemList = isLoop ? items.slice(-1)
//       .concat(items).concat(items.slice(0, 1)) : items;
//     this.setState({ vStatus: 0, itemList })
//   }
//
//   componentWillUpdate() {
//
//   }
//
//   renderBefore = () => {
//     const { itemList } = this.state
//     return { content: children, indicator: children }
//   }
// }
