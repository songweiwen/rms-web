import http from '@/utils/http'

// 查询远端机    /rms/far/detail    参数id
export const getDetailFar = function (params) {
  return http.post('/rms/far/detail', params)
}

// 查询近端机    /rms/near/detail    参数id
export const getDetailNear = function (params) {
  return http.post('/rms/near/detail', params)
}

// 移动近端机    /rms/near/detail    参数id     x   y
export const updateMoveNear = function (params) {
  return http.postQs('/rms/move/near', params)
}

// 移动远端机    /rms/near/detail    参数id     x   y
export const updateMoveFar = function (params) {
  return http.postQs('/rms/move/far', params)
}

// 核销近端机
export const workoutNear = function (params) {
  return http.postQs('/rms/workout/near', params)
}

// 核销远端机
export const workoutFar = function (params) {
  return http.postQs('/rms/workout/far', params)
}
