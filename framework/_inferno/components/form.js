import Inferno from 'inferno'
import Component from 'inferno-component'
import PropTypes from 'prop-types'

import '../../less/form.less'

import { base } from '../../util'

const { string, func, number, bool } = PropTypes;

const { NO_OP } = base

export default class Form extends Component {

  static propTypes = {
    className: string,
    btnText  : string,
    submit   : func
  }

  static defaultProps = { btnText: '确定' }

  render() {
    const { children, className, btnText } = this.props;

    const classList = ['input-group'].concat(className);
    return (
      <div className={ classList.join(' ') }>
        { children }
        <button dangerouslySetInnerHTML={ { __html: btnText } }/>
      </div>
    )
  }
}

class Input extends Component {

  static propTypes = {
    className  : string,
    label      : string,
    type       : string,
    name       : string,
    value      : string,
    maxLength  : number,
    placeholder: number,
    require    : bool,
    readonly   : bool,
    validate   : func,
    tap        : func
  }

  static defaultProps = {
    type: 'text',
    tap : NO_OP
  }

  state = {
    error: '',
    empty: true,
    focus: false,
  }

  output = (event) => {
    const { type, target } = event;

    const focus      = type !== 'blur';
    const inputValue = target.value
    const empty      = !inputValue;

    this.setState({ focus, empty, inputValue })
  }

  clear = () => this.setState({ inputValue: '' })

  tap = (event) => {
    const { readonly, tap } = this.props;
    readonly && tap()
  }

  render() {
    const { className, label, type, value, maxLength, placeholder, readonly, children } = this.props;

    const { error, empty, focus, inputValue = value } = this.state;

    const classList = ['form-input']
      .concat(className)
      .concat([
        error ? 'error' : '',
        empty ? '' : 'on',
        focus ? 'focus' : '',
        (children || []).length ? 'small' : '',
        readonly ? 'readonly' : ''
      ]).filter(item => item)
    return (
      <div className={ classList.join(' ') } onTap={ this.tap }>
        { label ? <label dangerouslySetInnerHTML={ { __html: label } }/> : '' }
        <input autoComplete="off"
               spellCheck="false"
               type={ type }
               maxLength={ maxLength }
               placeholder={ placeholder }
               value={ inputValue }
               onFocus={ this.output }
               onBlur={ this.output }
               onInput={ this.output }/>
        { !readonly ? <i className="icon-font clear" onTap={ this.clear }/> : '' }
        <small className="err-tip" dangerouslySetInnerHTML={ { __html: error } }/>
        { children }
      </div>
    )
  }
}

Form.Input = Input;
