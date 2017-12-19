import Inferno from 'inferno';
import Component from 'inferno-component'
import PropTypes from 'prop-types'

import '../../less/layout.less'

const { bool, string, number, oneOf } = PropTypes;

export default class LazyLoad extends Component {

  static propTypes = {
    className: string,
    image    : string,
    type     : string,
    quality  : number,
    mode     : oneOf(['cover', 'contain']),
    round    : bool,
    mask     : bool,
    offset   : number,
  }

  static defaultProps = {
    image : '',
    offset: 20,
    mask  : true
  }

  render() {
    const { className, mask, round } = this.props;

    const classList = ['laz-load'].concat(className)
    return (
      <div className={ classList.join(' ') }
           data-mask={ mask } data-round={ round }>
        <div></div>
      </div>
    )
  }
}

LazyLoad.checkView = () => {

}
