import http from './public'
let qs = require('qs')
let commonParams = {
  m: 'api',
  typ: 'json',
  c: 'user'
}

// 修改个人信息
export const updateMyInfo = (params) => {
  return http.fetchPost(
    `?${qs.stringify({
      ...commonParams,
      a: 'updateMyInfo'
    })}`, params
  )
}

// 获取个人信息
export const getUserCaptial = (parmas) => {
  return http.fetchGet('', {...commonParams, a: 'userCaptial', parmas})
}

// 获取用户资产信息
export const getUserInfo = (params) => {
  return http.fetchGet('', {...commonParams, a: 'userInfo', params})
}

// 获取个人财产信息
export const getCcInfo = (parmas) => {
  return http.fetchGet('', {...commonParams, a: 'ccInfo', parmas})
}

// 提交个人财产信息
export const updateCcInfo = (params) => {
  return http.fetchPost(
    `?${qs.stringify({
      ...commonParams,
      a: 'updateCcInfo'
    })}`, params
  )
}

// 修改密码
export const updatePw = (params) => {
  return http.fetchPost(
    `?${qs.stringify({
      ...commonParams,
      a: 'updatePw'
    })}`, params
  )
}

export const getTxInfo = (params) => {
  return http.fetchGet('', {...commonParams, a: 'txInfo', params})
}

export const getFfInfo = (params) => {
  return http.fetchGet('', {...commonParams, a: 'ffInfo', params})
}

export const canTixian = (params) => {
  return http.fetchGet('', {...commonParams, a: 'canTixian', params})
}

export const applyTixian = (params) => {
  return http.fetchPost(`?${qs.stringify({
    ...commonParams,
    a: 'applyTixian'
  })}`, params)
}
