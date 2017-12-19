import Inferno from 'inferno';
import Component from 'inferno-component'
import PropTypes from 'prop-types'

import '../../less/scroll.less'

import { base, el } from '../../util'

const { bool } = PropTypes;

const { timeout } = base

export class Scroll extends Component {

  static propTypes = {
    horizontal: bool,
    vertical  : bool,
  }

  static defaultProps = { vertical: true }

  scroll = null

  componentDidMount() {
    const { horizontal, vertical } = this.props;

    this.scroll = new IScroll(
      this._vNode.dom, {
        scrollX: horizontal,
        scrollY: vertical,
        isVNode: true
      });
  }

  vEvent = e => { this.scroll && this.scroll._execEvent('vNodeEvent', e) }

  render() {
    const { children } = this.props;
    return (
      <div className="scroll-wrapper"
           onDragEnd={ this.vEvent }
           onDrag={ this.vEvent }
           onTouchEnd={ this.vEvent }
           onTouchCancel={ this.vEvent }
           onTouchStart={ this.vEvent }
           onTouchMove={ this.vEvent }>
        <div className="scroll-body">
          { children }
        </div>
      </div>
    )
  }
}


