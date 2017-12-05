/**
 * 虚拟键盘组件
 */

import Inferno, { linkEvent } from 'inferno'
import Component from 'inferno-component'
import PropTypes from 'prop-types'

import '../../less/keyboard.less'

import { $modal } from './container'
import { base } from '../../util'

const { array, string, func } = PropTypes;

const { NO_OP } = base;

const getClass = (n, classList) => {

  const clz = /\*/.test(n) ? 'key-dis' : /确定/.test(n) ? 'key-ent' :
    /(upper|lower|ABC|\.\?123|\#\+\=)/.test(n) ? 'key-switch' :
      /(back)/.test(n) ? 'key-back' : /space/.test(n) ? 'space' : ''
  return classList.concat(clz).join(' ');
}

const Simple = (props) => {
  const { keys, others, children } = props;

  const classList = ['key-body', 'row']
    .concat(others.length ? '' : 'keyAll');
  return (
    <div className={ classList.join(' ') }>
      { children }
      <h5><i/>安全键盘</h5>
      <ul className="col number row" onClick={ tap.bind(null, props) }>
        { keys.map(item => <li className={ getClass(item, ['col-4']) }>{ item }</li>) }
      </ul>
      <ul className="col num-other" onClick={ tap.bind(null, props) }>
        { others.map(item => <li className={ getClass(item, []) }>{ item }</li>) }
      </ul>
    </div>
  )
}

Simple.propTypes    = { keys: array, others: array, tap: func }
Simple.defaultProps = { keys: [], others: [] }

const buildKeys = (type) => {
  switch (type) {
    case 'upper':
      return [
        'QWERTYUIOP'.split(''), 'ASDFGHJKL'.split(''),
        ['lower'].concat('ZXCVBNM'.split('')).concat('back'),
        ['.?123', 'space', '确定']
      ]
    case 'ABC':
    case 'lower':
      return [
        'qwertyuiop'.split(''), 'asdfghjkl'.split(''),
        ['upper'].concat('zxcvbnm'.split('')).concat('back'),
        ['.?123', 'space', '确定']
      ]
    case '.?123':
    case '123':
      return [
        '1234567890'.split(''), '-/:;()$&@"'.split(''),
        ['#+='].concat('.,?!\''.split('')).concat('back'),
        ['ABC', 'space', '确定']
      ]
    case '#+=':
      return [
        '[]{}#%^*+='.split(''), '_\\|~<>€£¥•'.split(''),
        ['123'].concat('.,?!\''.split('')).concat('back'),
        ['ABC', 'space', '确定']
      ]
  }
}

// 生成键盘样式
const clz = type => {
  switch (type) {
    case 'upper':
      return 'upper-letter';      //大写
    case 'lower':
    case 'ABC':
      return 'letter';            //字母
    case '.?123':
    case '123':
    case '#+=':
      return 'symbol';            //符号
    default:
      return ''
  }
}

const tap = function (props, event) {
  let target    = event.target, result;
  const { tap } = props
  if (target.tagName === 'LI') {
    result = target.innerHTML;
    switch (result) {
      case 'upper':
      case 'lower':
      case 'ABC':
      case '.?123':
      case '123':
      case '#+=':
        return this.setState({ type: result })
      default:
        tap && tap(result)
    }
  }
}

class Complex extends Component {
  static propTypes = { type: string, tap: func }

  static defaultProps = { type: 'lower' }

  constructor(props) {
    super(props);
    this.state = { type: props.type }
  }

  render() {
    const { children } = this.props;
    const { type }     = this.state;
    const classList    = ['key-body', 'complex'].concat(clz(type))
    const boardKey     = buildKeys(type)
    return (
      <div className={ classList.join(' ') }>
        { children }
        <h5><i/>安全键盘</h5>
        {
          boardKey.map((board, index) =>
            (
              <ul className={ `line_${index}` } onClick={ tap.bind(this, this.props) }>
                {
                  board.map(item => <li className={ getClass(item, []) }>{ item }</li>)
                }
              </ul>
            )
          )
        }
      </div>
    )
  }
}

export default { Simple, Complex }

let number   = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0],
    idCard   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0],
    password = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0];

export const $keyboard = {
  _show(type, _opts) {
    $modal.show(
      type === 'simple' ? <Simple { ..._opts }/>
        : <Complex { ..._opts }/>
      , { cb: _opts.tap })
  },
  hide: $modal.hide.bind($modal),
  number(nine, cb) {
    this._show('simple', {
      keys  : number.concat(nine ? 'back' : 'hide'),
      others: nine ? [] : ['back', '确定'],
      tap   : cb
    })
  },
  idCard(nine, cb) {
    this._show('simple', {
      keys  : idCard.concat(nine ? 'back' : 'hide'),
      others: nine ? [] : ['back', '确定'],
      tap   : cb
    })
  },
  password(nine, cb) {
    this._show('simple', {
      keys  : password.concat(nine ? 'back' : 'hide'),
      others: nine ? [] : ['back', '确定'],
      tap   : cb
    })
  },
  // 统一方法调用
  complex(nine, cb) {
    this._show('complex', { tap: cb });
  },
  /**
   *  包装
   * @param method          - 哪种键盘
   * @param isNine          - 是否9键
   * @param maxLen          - 允许的最大长度
   * @param that object     - 句柄对象 object
   * @param cb   func 入参   - val 如果为undefined则为收起键盘
   */
  keyboard(method, isNine, maxLen, that, cb) {
    $keyboard[method](isNine, char => {
      cb && cb(base.isDef(char) ? this.input(that, char, maxLen) : char)
    });
  },
  input(that, char, maxLen) {
    let value = (that.value || '').split('');
    switch (char) {
      case 'back':
        value.splice(-1);
        break;
      case '确定':
        $keyboard.hide();
        return;
      case 'space':
        value.push(' ');
        break;
      case '&amp;':
        value.push('&');
        break;
      case '&lt;':
        value.push('<');
        break;
      case '&gt;':
        value.push('>');
        break;
      default:
        value.push(char);
    }
    if (maxLen !== null && maxLen !== undefined) {
      value.length > maxLen && value.splice(maxLen);
    }
    return value.join('')
  }
}
