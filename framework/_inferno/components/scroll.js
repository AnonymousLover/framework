import Inferno from 'inferno';
import Component from 'inferno-component'
import PropTypes from 'prop-types'

import '../../less/scroll.less'

const { bool } = PropTypes;

export class Scroll extends Component {

  static propTypes = {
    horizontal: bool,
    vertical  : bool,
  }

  static defaultProps = {
    horizontal: false,
    vertical  : true
  }

  componentDidMount() {
    const { horizontal, vertical } = this.props;

    const _scroll = new IScroll(
      this._vNode.dom, {
        scrollX: horizontal,
        scrollY: vertical
      });
    _scroll.toggleEvent('scroll', this.scroll)
  }

  render() {
    const { children } = this.props;
    return (
      <div className="scroll-wrapper">
        <div className="scroll-body">
          { children }
        </div>
      </div>
    )
  }
}


