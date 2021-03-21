import http from '@/utils/http'

// 用户列表
export const userList = function (params) {
  return http.post('/rms/user/list', params)
}

// 增加用户
export const userAdd = function (params) {
  return http.post('/rms/user/add', params)
}

// 用户修改密码
export const userUpdate = function (params) {
  return http.post('/rms/user/update', params)
}

// 删除用户
export const userDelete = function (params) {
  return http.post('/rms/user/delete', params)
}
