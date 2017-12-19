import Inferno from 'inferno';
import Component from 'inferno-component'
import PropTypes from 'prop-types'

import '../../less/progress.less'

import { base, el } from '../../util'

const { number, bool, string, func } = PropTypes

const { NO_OP, isFunc } = base;

class baseComponent extends Component {
  static propTypes    = {
    value : number,
    reduce: bool,
    color : string,
    total : number,
    cb    : func
  }
  static defaultProps = {
    value: 0,
    color: '#20A0FF',
    total: 100,
    cb   : NO_OP
  }

  constructor(props) {
    super(props);
    this.state = {
      oldValue: props.reduce ? props.total : 0,
      distance: 0,
    }
  }

  progress = () => {
    const { value, total } = this.props;
    const { oldValue }     = this.state;

    let _value   = Math.min(total, value);
    let distance = _value - oldValue
    if (_value !== oldValue) {  // 新旧值不等
      this.setState({ oldValue: _value, distance })
    } else this.step();
  }

  step = NO_OP

  time = (distance) => {
    distance   = Math.abs(distance)
    const time = Math.round(Math.sqrt(distance) * 150)
    return time > 2000 ? 2000 : time
  }

  componentDidMount() { this.progress() }

  componentDidUpdate() { this.progress() }

}

class Number extends baseComponent {

  step = () => {
    const { raf, _vNode, state } = this;
    const { oldValue, distance } = state;

    isFunc(raf) && raf();

    let time   = this.time(distance)
    let t      = 1;
    const d    = Math.ceil(time / 1000 * 60);
    const step = () => {
      const toVal   = t >= d ? oldValue
        : base.easeOut(t++, oldValue - distance, distance, d);
      const canStop = distance > 0 ? toVal >= oldValue : toVal <= oldValue
      this.raf      = canStop ? null : el.$raf(step)

      _vNode.dom.innerHTML = canStop ? oldValue : toVal
    }
    step();
  }

  shouldComponentUpdate(props) {
    return props.value !== this.state.oldValue
  }

  render() { return <span/> }
}

class Line extends baseComponent {
  render() {
    const { props, state } = this;
    const { total, color } = props;
    const { oldValue }     = state;

    let time    = this.time(state.distance)
    let percent = Math.min(total, oldValue)
    const style = {
      'width'              : (percent * 100 / total).toFixed(2) + '%',
      'transition-duration': +time + 'ms',
      'background'         : color
    }
    return (
      <div className="progress-line">
        <div className="line-inner" style={ style }/>
      </div>
    )
  }
}

class Circle extends baseComponent {

  relativeStrokeWidth = 5.8

  radius = () => parseInt(50 - this.relativeStrokeWidth / 2, 10)

  trackPath = () => {
    const radius = this.radius();
    return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
  }

  render() {
    const { relativeStrokeWidth }    = this
    const { children, total, color } = this.props
    const { oldValue, distance }     = this.state

    const trackPath = this.trackPath();
    const perimeter = 2 * Math.PI * this.radius()
    const time      = this.time(distance)
    const percent   = Math.min(total, oldValue)

    const circlePathStyle = {
      'stroke-dasharray' : `${perimeter}px,${perimeter}px`,
      'stroke-dashoffset': `${(1 - percent / total) * perimeter}px`,
      'transition'       : `stroke-dashoffset ${time}ms,stroke ${time}ms`
    }
    return (
      <div className="progress-circle">
        <svg viewBox="0 0 100 100">
          <path d={ trackPath }
                stroke="#e5e9f2"
                strokeWidth={ relativeStrokeWidth }
                fill="none"/>
          <path d={ trackPath }
                strokeLinecap="round"
                stroke={ color }
                strokeWidth={ relativeStrokeWidth }
                fill="none"
                style={ circlePathStyle }/>
        </svg>
        <span className="circle-text">
          { children }
        </span>
      </div>
    )
  }
}

export default { Number, Line, Circle }
