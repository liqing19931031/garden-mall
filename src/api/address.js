import http from './public'
let qs = require('qs')
let commonParams = {
  m: 'api',
  typ: 'json',
  c: 'user'
}
let areaData = {
  m: 'default',
  c: 'public',
  typ: 'json'
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost(`?${qs.stringify({...commonParams, a: 'addAddress'})}`, params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost('/member/delAddress', params)
}
// 获取用户地址
export const addressList = () => {
  return http.fetchGet('', {...commonParams, a: 'getAddress'})
}
// 省市区
export const getArea = (params) => {
  return http.fetchGet('', {...areaData, a: 'place', ...params})
}
