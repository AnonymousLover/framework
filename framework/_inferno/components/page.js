import Inferno from 'inferno';
import Component from 'inferno-component'
import PropTypes from 'prop-types'

import { Scroll } from './scroll'

const { bool, node } = PropTypes;

export class Page extends Component {

  static propTypes = { native: bool, content: node }

  render() {
    const { children, content, native } = this.props;
    return (
      <div className="page-wrapper">
        { !native ? <Scroll>{ children }</Scroll> : children }
        { content }
      </div>
    )
  }
}


