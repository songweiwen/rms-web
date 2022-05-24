import http from '@/utils/http'

// IP
export const getSms = function (params) {
  return http.post('/rms/sms', params)
}

// 更新IP
export const updateSms = function (params) {
  return http.post('/rms/sms/update', params)
}

// 音频设置
export const getVoice = function (params) {
  return http.post('/rms/voice', params)
}

// 更新音频设置
export const updaeVoice = function (params) {
  return http.post('/rms/voice/update', params)
}

// /rms/sms   post  带token
// /rms/sms/update   post  带token    参数 ip  string类型。 你判断下IP地址输入

// /rms/voice   post  带token
// /rms/voice/update   post  带token    参数 second     int类型。 循环播放的秒数。

// 巡检的是/rms/patrol      token   post  看信息。
//  /rms/patrol/update  minute    enable     这俩都是int  day （string）

// 查看巡检
export const getPatrol = function (params) {
  return http.post('/rms/patrol', params)
}

// 更新巡检
export const updatePatrol = function (params) {
  return http.post('/rms/patrol/update', params)
}
