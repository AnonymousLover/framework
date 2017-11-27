import base from './base'

export default {
  empty(label, value) {
    let flag = !!base.trim(value || '').length;
    return { flag, message: flag ? '' : label + '不能为空' }
  }
}
