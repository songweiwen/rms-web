import http from '@/utils/http'

// 页面内容列表
export const pageItemList = function (params) {
  return http.get('/admin/page_item_list', params)
}
