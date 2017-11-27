/**
 * author: mimi
 * 首页
 */
//公共模块
import Inferno from 'inferno';
import Component from 'inferno-component';

/*
 * 组件定义, 通过继承Component实现
 * */
export default class indexPage extends Component {

  render() {
    let docList = [
      { url: 'icon', text: 'icon图标' },
      { url: 'dialog', text: 'dialog' },
      { url: 'keyboard', text: '虚拟键盘' },
      { url: 'form', text: 'form表单' },
      { url: 'password', text: '密码组件' },
      { url: 'carousel', text: '轮播组件' },
    ];
    return (
      <ul className="item-view">
        {
          docList.map(item => <li className="item-list">{item.text}</li>)
        }
      </ul>
    )
  }
}
