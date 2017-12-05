import Inferno from 'inferno'
import Component from 'inferno-component'
import PropTypes from 'prop-types'
import { el, base } from '../../util'

import '../../less/dialog.less'

const { toArr, timeout, NO_OP, extend, isFunc, debounce } = base;

const { $el, $body, $backdrop } = el;

const ACTIVE = 'active';

const { bool, func, number } = PropTypes;

class container extends Component {

  static propTypes = {
    active: bool,
    cb    : func,
    delay : number
  }

  static defaultProps = {
    active: true,
    cb    : NO_OP,
    delay : 0
  }

  className = ''

  state = { active: false }

  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active })
  }

  display = debounce((val) => {
    this.setState({ active: !!val })
  }, 16.7)

  shouldComponentUpdate(props, nextState) {
    return nextState.active !== this.state.active;
  }

  componentDidMount() {
    const { active } = this.props;
    this.display(!!active)
  }

  componentDidUpdate() {
    const { cb }     = this.props
    const { active } = this.state;
    $backdrop[active ? 'retain' : 'release']()
  }

  render() {
    const { className } = this;
    const { active }    = this.state;
    return (
      <div className={
        [className].concat(active ? ACTIVE : '').join(' ')
      }>
        { this.props.children }
      </div>
    )
  }
}

class Modal extends container {

  className = 'modal-container'

  close = (event) => {
    const { cb }        = this.props
    const { classList } = event.target;
    classList.contains('modal-container') && cb();
    event.stopPropagation();
  }

  render() {
    const { className } = this;
    const { active }    = this.state;
    return (
      <div className={
        [className].concat(active ? ACTIVE : '').join(' ')
      } onTap={ this.close }>
        { this.props.children }
      </div>
    )
  }
}

class Pop extends container {className = 'popup-container'}

class Load extends container {
  className = 'loading-container'

  componentDidUpdate() {
    isFunc(this.vTime) && this.vTime();
    const { active }    = this.state;
    const { delay, cb } = this.props;
    $backdrop[active ? 'retain' : 'release']()
    this.vTime = active ? timeout(
      () => {
        this.display(false), cb();
      }, delay || 10000) : null
  }
}

export default { Modal, Pop, Load }

export const $modal = {
  _el       : null,       //容器
  _stack    : 0,          // 堆栈
  delay     : 500,        // 关闭延时
  _component: null,    // 组件句柄
  show(content, opt) {
    const that = this;
    // 创建容器 ..
    that._el || $body.append(that._el = $el.create('div'));
    that._stack++ ? that.hide(() => {
      that._append(content, opt)
    }) : that._append(content, opt);
  },
  /*
   * 私有方法 -- 不允许外部使用
   */
  _append(content, opt = {}) {
    const { _el }   = this;
    this._component = Inferno.render(
      this.getComponent(content, {
        active: true,
        cb    : () => this.hide(opt.cb),
        delay : opt.delay
      }), _el)
  },
  getComponent(content, opts) {
    return <Modal { ...opts }>{ content }</Modal>
  },
  hide(cb, arg2) {
    const noClose = arg2 === true;
    // 关闭
    noClose || this._hide()
    timeout(() => {
      cb && cb.apply(null, toArr(arguments, noClose ? 2 : 1))
    }, noClose ? 0 : this.delay);
  },
  _hide() {
    this._stack--;
    const { _component } = this;
    _component && _component.display(false);
  }
}

export const $pop = extend(
  {}, $modal, {
    delay: 300,
    getComponent(content, opts) {
      return <Pop { ...opts }>{ content }</Pop>
    },
  })

export const $load = extend(
  {}, $pop, {
    getComponent(content, opts) {
      return <Load { ...opts }>{ content }</Load>
    }
  })
