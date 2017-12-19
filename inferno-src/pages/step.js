/**
 * author: mimi
 * 首页
 */
//公共模块
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Page, Steps } from '../../framework/_inferno'

/*
 * 组件定义, 通过继承Component实现
 * */

const { Item } = Steps

const steps = [
  { title: '08月29日', icon: 'icon-check', status: 'success' },
  { title: '08月30日', icon: 'icon-appreciate', status: '' },
  { title: '08月31日', icon: 'icon-time', status: 'success' },
  { title: '09月01日', icon: 'icon-ask' },
], steps1   = [
  { title: '08月29日', icon: '', status: 'success' },
  { title: '08月30日', icon: '', status: 'success' },
  { title: '08月31日', icon: '' },
], steps2   = [
  { title: '08月29日', icon: '', status: 'success' },
  { title: '08月30日', icon: '', status: 'success' },
  { title: '08月31日', icon: '', status: 'success' },
  { title: '09月01日', icon: '', status: 'success' },
]


export default class StepPage extends Component {

  render() {

    return (
      <Page>
        <Steps className="in-block">
          { steps.map(step => <Item { ...step }>描述信息</Item>) }
        </Steps>
        <Steps className="in-block">
          { steps1.map(step => <Item { ...step }>描述信息</Item>) }
        </Steps>
        <Steps className="in-block">
          { steps2.map(step => <Item { ...step }>描述信息</Item>) }
        </Steps>
      </Page>
    )
  }
}

