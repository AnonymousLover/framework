/**
 * author: mimi
 * 首页
 */
//公共模块
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Page, $dialog } from '../../framework/_inferno'

import { log } from '../../framework/util'

/*
 * 组件定义, 通过继承Component实现
 * */
export default class DialogPage extends Component {

  alert(noTitle) {
    $dialog.alert({
      title  : noTitle ? '' : 'alert',
      content: '删除消息成功',
      tap    : log.debug
    });
  }

  confirm(noTitle) {
    $dialog.confirm({
      title  : noTitle ? '' : 'confirm',
      content: '确认要删除当前消息?',
      tap    : log.debug
    })
  }

  actionSheet(btnList) {
    $dialog.actionSheet(btnList, val => log.debug(val));
  }

  loading(text) {
    $dialog.spinner(text);
  }

  toast(text) {
    $dialog.toast(text, log.debug.bind(log, 'toast'))
  }

  render() {
    let btnList = [
      { text: 'alert', tap: this.alert.bind(this, false) },
      { text: 'alert不带标题', tap: this.alert.bind(this, true) },
      { text: 'confirm', tap: this.confirm.bind(this, false) },
      { text: 'confirm不带标题', tap: this.confirm.bind(this, true) },
      { text: 'loading 加载中', tap: this.loading.bind(this, '加载中') },
      { text: 'loading', tap: this.loading.bind(this, '') },
      { text: 'toast提示', tap: this.toast.bind(this, 'toast提示') },
      { text: 'actionSheet1', tap: this.actionSheet.bind(this, ['拍照或录像', '选取现有的']) },
      { text: 'actionSheet2', tap: this.actionSheet.bind(this, ['回复', '转发', '打印']) },
    ];
    return (
      <Page native>
        {
          btnList.map(item => <button
            className="btn-block" onTap={ item.tap }>{ item.text }</button>)
        }
      </Page>
    )
  }
}
