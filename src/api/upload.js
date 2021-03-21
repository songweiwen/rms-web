import http from '@/utils/http'

// 上传文件
export const setUpload = function (params) {
  // console.log(http.upload(), 111111)
  return http.post('/admin/upload', '', params, {
    headers: {
      'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
    }
  })
}
