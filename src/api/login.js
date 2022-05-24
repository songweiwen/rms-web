import http from '@/utils/http'

// 获取验证码+uuid
export const getCaptcha = function (params) {
  return http.get('/admin/captcha', params)
}

// 登录
export const setLogin = function (params) {
  return http.postQs('/rms/login', params)
}

// // 注册手机号和密码
// export const reg = function (params) {
//   return http.postQs('/site/reg', params)
// }

// // 发送短信验证码
// export const sendCode = function (params) {
//   return http.postQs('/site/sendphonecode', params)
// }

// // 登录
// export const setLogin = function (params) {
//   return http.postQs('/site/login', params)
// }

// // 退出登录
// export const logOut = function (params) {
//   return http.postQs('/site/logout', params)
// }
// // ?user_id={userId}

// // 手机号和短信验证码登录
// export const phoneLogin = function (params) {
//   return http.postQs('/site//site/phone-login', params)
// }

// // 修改密码
// export const editPassword = function (data, params) {
//   return http.put('/user/update-password', data, params)
// }
// ?access-token={accessToken}&id={userId}

// 忘记密码
export const forget = function (data, params) {
  return http.post('/site/forget', data, params)
}
