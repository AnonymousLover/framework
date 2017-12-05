/**
 * author: mimi
 * 首页
 */
//公共模块
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Page, Form, $keyboard } from '../../framework/_inferno'

import { log, base } from '../../framework/util'

const { Input } = Form

const { NO_OP } = base
/*
 * 组件定义, 通过继承Component实现
 * */

const inputs = [
  {
    label   : '账号', placeholder: '系统键盘', value: '', className: 'flt',
    readonly: false, type: 'text', name: 'name', require: true,
    tap     : NO_OP
  },
  {
    label   : '昵称', placeholder: '系统键盘', value: '', className: '',
    readonly: false, type: 'text', name: 'nick', require: true,
    tap     : NO_OP
  },
  {
    label   : '密码', placeholder: '全键盘', value: '',
    readonly: true, type: 'password', name: 'password', require: true,
    tap     : function (that) {
      $keyboard.keyboard('complex', true, null,
        that, (val) => {
          that.value = val == null ? that.value : val
          this.setState({})
        })
    }
  },
  {
    label   : '手机号', placeholder: '数字键盘9', value: '',
    readonly: true, type: 'text', name: 'count', require: true,
    tap     : function (that) {
      $keyboard.keyboard('number', true, 11,
        that, (val) => {
          that.value = val == null ? that.value : val
          this.setState({})
        })
    }
  }
]

export default class KeyboardPage extends Component {

  render() {
    return (
      <Page>
        <Form>
          { inputs.map(item => <Input
            { ...item }
            tap={ item.tap.bind(this, item) }/>) }
        </Form>
      </Page>
    )
  }
}
