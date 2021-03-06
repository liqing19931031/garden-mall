import http from './public'
let qs = require('qs')

let commonParams = {
  m: 'api',
  typ: 'json',
  c: 'user'
}
// 获取team列表
export const getTeamList = (params) => {
  return http.fetchGet('', {...commonParams, a: 'tdList', ...params})
}

export const getTeamDetail = (params) => {
  return http.fetchGet('', {...commonParams, a: 'tdInfo', ...params})
}

export const getCqz = (params) => {
  return http.fetchGet('', {...commonParams, a: 'myCqz', ...params})
}

export const getTeamHead = (params) => {
  return http.fetchGet('', {...commonParams, a: 'tdHeaderInfo', ...params})
}

export const getCzjl = (params) => {
  return http.fetchGet('', {...commonParams, a: 'czInfo', ...params})
}

export const getJymx = (params) => {
  return http.fetchGet('', {...commonParams, a: 'jyInfo', ...params})
}

export const zuanzhang = (params) => {
  return http.fetchPost(
    `?${qs.stringify({
      ...commonParams,
      a: 'transfer'
    })}`, params
  )
}
