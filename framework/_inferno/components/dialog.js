import Inferno from 'inferno';
import PropTypes from 'prop-types'

import { base } from '../../util'
import { $modal, $load, $pop } from './container'

const { array, string, func, bool } = PropTypes;

const { NO_OP, valueFn } = base;

const Popup = (props) => {
  const { title, btnList = [], children, tap } = props;
  return (
    <div className="popup">
      {
        title ? (
          <div className="popup-head">
            <h3 className="popup-title">{ title }</h3>
          </div>
        ) : ''
      }
      <div className="popup-body">{ children }</div>
      <div className="flex-box popup-btn-wrapper">
        {
          btnList.map((item, idx) => {
            let clazz = 'flex btn ' + (item.type || 'btn-default');
            return (
              <span className={ clazz }
                    onTap={ tap.bind(this, idx) }>
                { item.text }
              </span>
            )
          })
        }
      </div>
    </div>
  )
}

Popup.propTypes    = { title: string, btnList: array, tap: func }
Popup.defaultProps = { tap: NO_OP }

const MadePop = (props) => {
  const { title, children, className } = props;
  return (
    <div className={ ['made-body'].concat(className).join(' ') }>
      <h3 className="made-title">
        { title }
        <em className="icon-font">&#xe646;</em>
      </h3>
      { children }
    </div>
  )
}

MadePop.propTypes = { className: string, title: string }

const ActionSheet = (props) => {
  const { btnList = [], tap = base.NO_OP } = props;
  return (
    <div className="action-sheet">
      <ul className="item-view">
        {
          btnList.map((item, index) => {
            let text = item.text == null ? item : item.text;
            return (
              <li className="item-list"
                  onTap={ tap.bind(this, index) }>
                { text }
              </li>
            )
          })
        }
      </ul>
      <ul className="item-view">
        <li className="item-list cancel"
            onTap={ tap.bind(this, false) }>
          取消
        </li>
      </ul>
    </div>
  )
}

ActionSheet.propTypes    = { btnList: array, tap: func }
ActionSheet.defaultProps = { tap: NO_OP }

const Loading = (props) => {
  const { toast, children } = props;
  return (
    <div className="spinner">
      {
        !toast ? (
          <svg className="spinner-circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none"/>
          </svg>
        ) : ''
      }
      <p>{ children }</p>
    </div>
  )
}

Loading.propTypes    = { toast: bool }
Loading.defaultProps = { toast: false }

export default { ActionSheet, Popup, MadePop, Loading }

export const $dialog = {
  actionSheet(btnList, cb) {
    $modal.show(
      <ActionSheet
        btnList={ btnList }
        tap={ $modal.hide.bind($modal, cb) }/>
      , { cb: NO_OP })
  },
  _pop(_opts) {
    const { title, content, btnList, tap } = _opts;
    $pop.show(
      <Popup
        title={ title || '' }
        btnList={ btnList }
        tap={ $pop.hide.bind($pop, tap) }>
        { content }
      </Popup>
    )
  },
  alert(opts) {
    this._pop({
      title  : opts.title,
      content: opts.content,
      btnList: [{
        text: opts.okText || '确定',
        type: opts.okType || 'btn-positive'
      }],
      tap    : opts.tap || valueFn(true)
    })
  },
  confirm(opts) {
    this._pop({
      title  : opts.title,
      content: opts.content,
      btnList: [{
        text: opts.cancelText || '关闭',
        type: opts.cancelType || 'btn-default'
      }, {
        text: opts.okText || '确定',
        type: opts.okType || 'btn-positive'
      }],
      tap    : opts.tap || valueFn(true)
    })
  },
  _load(_opts) {
    const { text, toast, delay, cb } = _opts;
    $load.show(
      <Loading toast={ toast }>{ text }</Loading>,
      { delay, cb }
    )
  },
  spinner(text, delay) {
    this._load({
      text : text,
      toast: false,
      delay: delay,
      cb   : null
    })
  },
  closeSpinner: $load.hide.bind($load),
  toast(text, delay, callback) {
    if (typeof delay === 'function') {
      callback = delay;
      delay    = 3500;
    }
    this._load({
      text : text,
      toast: true,
      delay: delay || 3500,
      cb   : callback
    })
  }
}

