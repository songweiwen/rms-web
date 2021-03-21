import http from '@/utils/http'

// 添加页面分类
export const pageCreate = function (params) {
  return http.post('/admin/page_create', '', params)
}

// 修改页面分类
export const pageUpdate = function (params) {
  return http.post('/admin/page_update', '', params)
}

// 删除整个页面
export const delPage = function (params) {
  return http.post('/admin/del_page', '', params)
}
