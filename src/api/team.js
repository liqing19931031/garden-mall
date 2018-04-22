import http from './public'
// let qs = require('qs')

let commonParams = {
  m: 'api',
  typ: 'json',
  c: 'user'
}
// 获取订单列表
export const getTeamList = (params) => {
  return http.fetchGet('', {...commonParams, a: 'tdList', ...params})
}

export const getTeamDetail = (params) => {
  return http.fetchGet('', {...commonParams, a: 'tdInfo', ...params})
}
