import http from '@/utils/http'

// 操作日志
export const getLog = function (params) {
  return http.post('/rms/log/list', params)
}

export const loadLog = function (params) {
  return http.post('/rms/log/download', params)
}
