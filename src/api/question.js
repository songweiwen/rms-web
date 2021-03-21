import http from '@/utils/http'

// 题目分类页
export const questionCategory = function (params) {
  return http.get('/question/category', params)
}

// 题列表
export const questionList = function (params) {
  return http.get('/question/list', params)
}

// 答题正确请求此接口
export const questionBingo = function (params) {
  return http.post('/question/bingo', '', params)
}

// 答题api返回201时的页面”获得星星“中的数据
export const questionStage = function (params) {
  return http.get('/question/stage', params)
}

// 答题api返回202时的页面”通关界面“中的数据
export const questionPass = function (params) {
  return http.get('/question/pass', params)
}
