import base from './base'

export const regExpMap = {
  phone  : /^1[3-9][0-9]\d{8}$/,
  otp    : /^\d{6}$/,
  captcha: /^.{4}$/,
  url    : /^https?:\/\//,
  idCard : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  chCode : /[^\u4e00-\u9fa5\s+]/ig,
  enCode : /^[a-zA-Z\s]+$/
}

export default {
  empty(label, value) {
    let flag = !!base.trim(value || '').length;
    return { flag, message: flag ? '' : `${label}不能为空` }
  },
  phone(value) {
    const flag = regExpMap.phone.test(value);
    return { flag, message: flag ? '' : '手机号格式不正确' }
  }
}
