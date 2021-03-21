import http from '@/utils/http'

export const getToken = function (params) {
  return http.post('http://songweiwenceshi.oicp.io:20010/auth/login_by_sms', params)
}
