import http from '@/utils/http'

export const getWarning = function (params) {
  return http.post('/rms/warning/list', params)
}
