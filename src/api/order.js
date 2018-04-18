import http from './public'
// let qs = require('qs')
let commonParams = {
  m: 'api',
  typ: 'json',
  c: 'user'
}
// 获取订单列表
export const getOrderList = (params) => {
  return http.fetchGet('', {...commonParams, a: 'orders', ...params})
}
