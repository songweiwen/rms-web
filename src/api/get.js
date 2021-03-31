import http from '@/utils/http'

// 近远端机 树形
export const getTree = function (params) {
  return http.post('/rms/tree', '', params)
}
