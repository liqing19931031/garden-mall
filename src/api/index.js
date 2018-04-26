import http from './public'
let qs = require('qs')
// 登陆
let commonParams = {
  m: 'default',
  typ: 'json'
}
export const userLogin = (params) => {
  return http.fetchPost(`?${qs.stringify({
    ...commonParams,
    a: 'login',
    c: 'passport'
  })}`, params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet('/loginOut', params)
}
// 获取用户信息
export const userInfo = () => {
  return http.fetchGet('', {
    ...commonParams,
    c: 'passport',
    a: 'getUserInfo'
  })
}
// 注册账号
export const register = (params) => {
  return http.fetchPost(`?${qs.stringify({
    ...commonParams,
    a: 'register',
    c: 'passport'
  })}`, params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost('/imgaeUpload', params)
}
// 发送短信验证
export const getImgCode = (params) => {
  return http.fetchPost('?a=send&c=sms&m=default&typ=json&flag=register', params)
}
// 获取图片验证
export const getCode = (params) => {
  return http.fetchGet('', {
    ...commonParams,
    a: 'captcha',
    c: 'public'
  })
}
// 首页接口
export const productHome = (params) => {
  return http.fetchGet('', {
    ...commonParams,
    ...params,
    a: 'getHomepageData',
    c: 'homepage'
  })
}
