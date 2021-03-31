import http from '@/utils/http'

// 近端机列表
export const listNear = function (params) {
  return http.post('/rms/near/list', '', params)
}
// 单一近端机详情
export const detailNear = function (params) {
  return http.post('/rms/near/detail', '', params)
}
// 远端机列表
export const listFar = function (params) {
  return http.post('/rms/far/list', '', params)
}
// 单一远端机详情
export const detailFar = function (params) {
  return http.post('/rms/far/detail', '', params)
}
// 添加近端机 参数 deviceId  i       nt
// deviceName  string
// deviceAddress  string  可以为空
// deviceDescribe  string 可以为空
export const addNear = function (params) {
  return http.post('/rms/near/add', '', params)
}
// 删除近端机 参数 id （不是device_id
export const delNear = function (params) {
  return http.post('/rms/near/delete', '', params)
}
// 添加远端机 参数 deviceId  int
// deviceName  string
// deviceAddress  string  可以为空
// deviceDescribe  string 可以为空
export const addFar = function (params) {
  return http.post('/rms/far/add', '', params)
}
// 删除远端机 参数 id （不是device_id
export const delFar = function (params) {
  return http.post('/rms/far/delete', '', params)
}
