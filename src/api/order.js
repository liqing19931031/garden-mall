import http from './public'
// let qs = require('qs')
let commonParams = {
  m: 'api',
  typ: 'json',
  c: 'user'
}
// 获取订单列表
export const getOrderList = () => {
  return http.fetchGet('', {
    ...commonParams,
    a: 'orders'
  })
}
