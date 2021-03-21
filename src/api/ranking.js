import http from '@/utils/http'

// 排行榜
export const ranking = function (params) {
  return http.get('/ranking', params)
}
