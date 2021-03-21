import http from '@/utils/http'

// 获取赛事信息
export const matchInfo = function (params) {
  return http.get('/match/info', params)
}
