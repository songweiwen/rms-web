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

// 用户修改手机号
export const userPhone = function (params) {
  return http.post('/rms/user/phone', params)
}

// 删除用户
export const userDelete = function (params) {
  return http.post('/rms/user/delete', params)
}

// 修改用户
export const userAuthor = function (params) {
  return http.post('/rms/user/author', params)
}
// username    - 要修改的用户名
//  userAdmin  (Stringl类型的 1 2 3)
// 1 全部 2 普通 3 查看
