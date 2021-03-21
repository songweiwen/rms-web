import http from '@/utils/http'

// 获取浏览权限列表（下拉框）
export const permissionSelect = function (params) {
  return http.get('/admin/v2/permission_select', params)
}

// 获取页面分类列表（下拉框）
export const pageSelect = function (params) {
  return http.get('/admin/v2/page_select', params)
}

// 获取机构列表（下拉框）
export const orgSelect = function (params) {
  return http.get('/admin/v2/org_select', params)
}

// 获取赛事列表（下拉框）
export const stageSelect = function (params) {
  return http.get('/admin/v2/stage_select', params)
}

// 获取文章分类
export const categorySelect = function (params) {
  return http.get('/admin/course/category/list', params)
}
