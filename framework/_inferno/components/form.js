import Inferno from 'inferno'
import Component from 'inferno-component'
import PropTypes from 'prop-types'

import '../../less/form.less'

import { base, validate, log, el } from '../../util'

const { string, func, number, bool } = PropTypes;

const { NO_OP, isFunc, valueFn, throttle } = base

const { $el: { patch } } = el;

const { empty } = validate

export default class Form extends Component {

  static propTypes = {
    className: string,
    btnText  : string,
    submit   : func
  }

  static defaultProps = { btnText: '确定' }

  // 表单数据存储区
  vStore   = {}
  // 表单校验存储区
  vMap     = {}
  // 当前校验结果
  vInvalid = null
  // 按钮
  btnNode  = null

  structure = (init, props) => {
    const that             = this;
    let { children }       = (props || that.props),
          { vStore, vMap } = that;
    // 对from表单内子组件input进行重组
    (children || []).forEach(child => {
      if (child.type !== Input) return;
      const { props } = child;

      let { name, label, validate } = props;
      if (!isFunc(validate)) {
        validate = props.require ?
          empty.bind(null, label) : valueFn({ flag: true })
      }
      if (init) {
        if (!name) return log.error('input must have [name] attribute')
        // 校验方法的包装
        props.validate = that.validate.bind(that, validate, name);
        vStore[name]   = props.value;
        vMap[name]     = !!validate(props.value).flag
      } else props.value = vStore[name]
    })
  }
  // 校验
  validate  = (vdCall, key, value) => {
    const that       = this;
    that.vStore[key] = value;
    const res        = vdCall(value)
    return Promise.resolve(res)
      .then(res => {
        that.vMap[key] = res.flag;
        that.vMapEach();
        return res;
      })
  }
  // 循环节流
  vMapEach  = throttle(function (init) {
    const that     = this;
    let invalid    = null,
          { vMap } = that;

    for (let name in vMap) {
      if (invalid === false) break;
      invalid = vMap[name]
    }
    if (that.vInvalid === invalid) return;
    // init || that.structure();
    that.btnNode.disabled = !invalid;
  }, 16.7)

  constructor(props) {
    super(props);
    this.structure(true, props)
  }

  componentDidMount() { this.vMapEach(true) }

  componentWillReceiveProps(nextProps) { this.structure(true, nextProps) }

  render() {
    const { children, className, btnText } = this.props;

    const classList = ['input-group'].concat(className);
    return (
      <div className={ classList.join(' ') }>
        { children }
        <button disabled ref={ (node) => this.btnNode = node }
                dangerouslySetInnerHTML={ { __html: btnText } }/>
      </div>
    )
  }
}

/*****************/
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
    emit       : func,
    tap        : func
  }

  static defaultProps = { type: 'text', tap: NO_OP }

  state  = { error: null, empty: true, focus: false }
  $input = {}

  output = (event) => {
    const { type, target: { value } } = event;
    this.setState({ focus: type !== 'blur', empty: !value, value })
  }

  setValue = (value) => { this.$input.value = value }

  validate(value) {
    const { validate } = this.props;
    const res          = validate(value);
    Promise.resolve(res).then(res => {
      this.setState({ value, error: res.message })
    })
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value })
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ value: nextProps.value })
  // }

  componentDidUpdate() {
    const { value } = this.state
    this.setValue(value)
  }

  render() {
    const { label, type, maxLength, placeholder, readonly, children, tap, className } = this.props;

    const { error, empty, focus } = this.state;

    const classList = ['form-input']
      .concat(className)
      .concat([
        error ? 'error' : '',
        empty ? '' : 'on',
        focus ? 'focus' : '',
        (children || []).length ? 'small' : '',
        readonly ? 'readonly' : ''
      ]).filter(item => item);

    return (
      <div className={ classList.join(' ') } onTap={ () => readonly && tap() }>
        { label ? <label dangerouslySetInnerHTML={ { __html: label } }/> : '' }
        <input autoComplete="off"
               spellCheck="false"
               ref={ (node) => this.$input = node }
               type={ type }
               maxLength={ maxLength }
               placeholder={ placeholder }
               onFocus={ this.output }
               onBlur={ this.output }
               onInput={ this.output }/>
        { readonly || <i className="icon-font clear" onTap={ () => this.validate('') }/> }
        <small className="err-tip" dangerouslySetInnerHTML={ { __html: error } }/>
        { children }
      </div>
    )
  }
}

Form.Input = Input;
