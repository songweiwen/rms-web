import http from '@/utils/http'

// 查询远端机    /rms/far/detail    参数id
export const getDetailFar = function (params) {
  return http.post('/rms/far/detail', params)
}

// 查询近端机    /rms/near/detail    参数id
export const getDetailNear = function (params) {
  return http.post('/rms/near/detail', params)
}
