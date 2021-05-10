import http from '@/utils/http'

// 获取验证码+uuid
export const setTimeoutLog = function (params) {
  return http.postQs('/rms/timeout', params)
}

// 接口是 /rms/timeout    post请求  带token
// 参数是mode  = 你执行的整个结构。
