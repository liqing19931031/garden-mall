import http from './public'
let commonParams = {
  m: 'api',
  typ: 'json',
  c: 'goods'
}
// 商品列表
export const getAllGoods = (params) => {
  return http.fetchGet('/goods/allGoods', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('/member/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchPost('/member/cartDel', params)
}
// 通过id获取地址
export const getAddress = (params) => {
  return http.fetchPost('/member/address', params)
}
// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost('/member/addOrder', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/member/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet('/member/orderList', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet('/member/orderDetail', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('/member/cancelOrder', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet('/goods/productDet', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchGet('/member/delOrder', params)
}
// 商品列表
export const getSearch = (params) => {
  return http.fetchGet('', {...commonParams, ...params, a: 'lists'})
}
// 快速搜索
export const getQuickSearch = (key) => {
  return http.fetchQuickSearch(`http://127.0.0.1:9200/item/itemList/_search?q=productName: ${key}`)
}
// 商品详情
export const getGoodDetail = (params) => {
  return http.fetchGet('', {...commonParams, ...params, a: 'detail'})
}
