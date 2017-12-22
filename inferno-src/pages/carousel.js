/**
 * author: mimi
 * 首页
 */
//公共模块
import Inferno from 'inferno';
import Component from 'inferno-component';

import { Page, Carousel } from '../../framework/_inferno'

/*
 * 组件定义, 通过继承Component实现
 * */
export default class CarouselPage extends Component {

  render() {

    return (
      <Page native>
        <Carousel>
          {
            orders.map(order => (
              <ul className="carousel-item row">
                {
                  order.map(o => (
                    <li className="col-3">
                      <img src={ o.src } className="icon"/>
                      <span>{ o.name }</span>
                    </li>
                  ))
                }
              </ul>
            ))
          }
        </Carousel>
      </Page>
    )
  }
}

const orders = [[
  {
    src : '//fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '美食'
  },
  {
    src : '//fuss10.elemecdn.com/8/a5/78332f1f7ff14afbb97b4f125911cjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '下午茶'
  },
  {
    src : '//fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '商超便利'
  },
  {
    src : '//fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '预定早餐'
  },
  {
    src : '//fuss10.elemecdn.com/c/db/d20d49e5029281b9b73db1c5ec6f9jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '果蔬生鲜'
  },
  {
    src : '//fuss10.elemecdn.com/a/fa/d41b04d520d445dc5de42dae9a384jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '新店特惠'
  },
  {
    src : '//fuss10.elemecdn.com/3/84/8e031bf7b3c036b4ec19edff16e46jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '准时达'
  },
  {
    src : '//fuss10.elemecdn.com/d/38/7bddb07503aea4b711236348e2632jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '午餐'
  }
], [
  {
    src : '//fuss10.elemecdn.com/b/72/97eb62f05c42217e130b6658bd0b2jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '帮买帮送'
  },
  {
    src : '//fuss10.elemecdn.com/3/01/c888acb2c8ba9e0c813f36ec9e90ajpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '浪漫鲜花'
  },
  {
    src : '//fuss10.elemecdn.com/b/e1/58aa34ef194d216c9f2328f603588jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '医疗健康'
  },
  {
    src : '//fuss10.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '汉堡薯条'
  },
  {
    src : '//fuss10.elemecdn.com/2/17/244241b514affc0f12f4168cf6628jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '包子粥店'
  },
  {
    src : '//fuss10.elemecdn.com/a/8a/ec21096d528b7cfd23cdd894f01c6jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '地方菜系'
  },
  {
    src : '//fuss10.elemecdn.com/7/b6/235761e50d391445f021922b71789jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '披萨意面'
  },
  {
    src : '//fuss10.elemecdn.com/3/c7/a9ef469a12e7a596b559145b87f09jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
    name: '麻辣烫'
  }
]]
