import request from '@/utils/request'

export function gosearch (query) { // 首页轮播图接口
  return request({
    url: '/search',
    method: 'get',
    data: query
  })
}

export function getbanner (query) {
  return request({
    url: '/getShopBaseInfo',
    method: 'get',
    data: query
  })
}
