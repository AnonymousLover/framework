/**
 * author: mimi
 * 首页
 */
//公共模块
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Page, Progress } from '../../framework/_inferno'

/*
 * 组件定义, 通过继承Component实现
 * */

const { Number, Line, Circle } = Progress;

export default class ProgressPage extends Component {
  state = {
    number: 50,
    line  : 50,
    circle: 50
  }

  componentDidMount() {
    setTimeout(() => {
      const value = Math.random() * 100
      this.setState({
        number: ~~value,
        line  : ~~value,
        circle: ~~value
      })
    }, 5000)
  }

  render() {
    const { number, line, circle } = this.state;
    return (
      <Page>
        <Number value={circle}/>
        <Line value={line} reduce/>
        <Circle value={circle}>
          <Number value={circle}/>
        </Circle>
      </Page>
    )
  }
}
