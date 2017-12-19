import Inferno from 'inferno';
import PropTypes from 'prop-types'

import '../../less/step.less'

const { string } = PropTypes

export const Steps = (props) => {
  const { children, className } = props;
  return (
    <ul className={ `step-wrap ${className}` }>
      { children }
    </ul>
  )
}

Steps.propTypes = { className: string }

const Item = (props) => {
  const { title, icon, children, status } = props;

  const iconClass = ['icon-font'].concat(icon);
  return (
    <li className="step-item" ar-status={ status }>
      <i className={ iconClass.join(' ') }/>
      <h4 dangerouslySetInnerHTML={ { __html: title } }/>
      { children && <p>{ children }</p> }
    </li>
  )
}

Item.propTypes = { title: string, icon: string, status: string }

Steps.Item = Item
