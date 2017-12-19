/**
 * author: mimi
 * 首页
 */
//公共模块
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Scroll } from '../../framework/_inferno'

/*
 * 组件定义, 通过继承Component实现
 * */
export default class IndexPage extends Component {

  render() {
    let docList = [
      { url: 'icon', text: 'icon图标' },
      { url: 'dialog', text: 'dialog' },
      { url: 'keyboard', text: '虚拟键盘' },
      { url: 'form', text: 'form表单' },
      { url: 'password', text: '密码组件' },
      { url: 'carousel', text: '轮播组件' },
      { url: 'progress', text: '进度条' },
      { url: 'step', text: '步骤条' },
    ];
    return (
      <Scroll>
        <ul className="item-view">
          {
            docList.map(item => <li
              onTap={ () => this.context.router.push(item.url) }
              className="item-list">{ item.text }</li>)
          }
        </ul>
      </Scroll>
    )
  }
}
