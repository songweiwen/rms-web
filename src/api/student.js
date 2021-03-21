import http from '@/utils/http'

// 我的学生列表
export const studentList = function (params) {
  return http.get('/student/list', params)
}

// 添加学生
export const studentCreate = function (params) {
  return http.post('/student/create', '', params)
}

// 修改学生
export const studentUpdate = function (params) {
  return http.post('/student/update', '', params)
}
