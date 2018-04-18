import http from './public'
let qs = require('qs')
let commonParams = {
  m: 'api',
  typ: 'json',
  c: 'user'
}
// 获取购物车列表
export const getCartList = () => {
  return http.fetchGet('', {
    ...commonParams,
    a: 'getCarts'
  })
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost(`?${qs.stringify({...commonParams, a: 'addCart'})}`, params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost(`?${qs.stringify({...commonParams, a: 'delCarts'})}`, params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost('/member/cartEdit', params)
}
