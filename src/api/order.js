import http from './public'
let qs = require('qs')

let commonParams = {
  m: 'api',
  typ: 'json',
  c: 'user'
}
// 获取订单列表
export const getOrderList = (params) => {
  return http.fetchGet('', {...commonParams, a: 'orders', ...params})
}

export const createOrder = (params) => {
  return http.fetchPost(`?${qs.stringify({
    ...commonParams,
    a: 'createOrder'
  })}`, params)
}

export const getOrder = (params) => {
  return http.fetchGet('', {...commonParams, a: 'orderDetail', ...params})
}

export const payOrder = (params) => {
  return http.fetchGet('', {...commonParams, a: 'payOrder', ...params})
}

export const cancelOrder = (params) => {
  return http.fetchGet('', {...commonParams, a: 'cancelOrder', ...params})
}

export const delOrder = (params) => {
  return http.fetchGet('', {...commonParams, a: 'delOrder', ...params})
}

export const qrshOrder = (params) => {
  return http.fetchGet('', {...commonParams, a: 'qrsh', ...params})
}
