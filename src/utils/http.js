import request from '@/utils/request'
import qs from 'qs'

const http = {
  /**
   *  Author BaoQi
   *  封装get请求方法
   *  @param {string} url     - 接口地址
   *  @param {object} params  - 参数名
   *  @returns {Promise}
   */
  get: function (url, params) {
    return request({
      url: url,
      method: 'get',
      params: params
    })
  },
  /**
   *  Author BaoQi
   *  封装post请求方法
   *  @param {string} url     - 接口地址
   *  @param {object} queryParam    - URL 参数
   *  @param {object} data    - 请求主体被发送的数据
   *  @param {object} option  - 其他属性
   *  @returns {Promise}
   */
  post: function (url, queryParam, data, option) {
    const d = {
      url: url,
      method: 'post',
      params: queryParam,
      data
    }
    const obj = Object.assign(d, option)
    return request(obj)
  },
  /**
   *  Author BaoQi
   *  封装post请求方法
   *  @param {string} url     - 接口地址
   *  @param {object} queryParam    - URL 参数
   *  @param {object} data    - 请求主体被发送的数据
   *  @param {object} option  - 其他属性
   *  @returns {Promise}
   */
  postQs: function (url, queryParam, data, option) {
    const d = {
      url: url,
      method: 'post',
      params: queryParam,
      data: qs.stringify(data)
    }
    const obj = Object.assign(d, option)
    return request(obj)
  },
  /**
   * Author BaoQi
   * 封装patch请求
   *  @param {string} url     - 接口地址
   *  @param {object} data    - 参数名
   * @returns {Promise}
   */
  patch: function (url, data) {
    return request({
      url: url,
      method: 'patch',
      data: data
    })
  },
  /**
   * Author BaoQi
   * 封装put请求
   * @param {string} url     - 接口地址
   * @param {object} data    - 参数名
   * @returns {Promise}
   */
  put (url, data) {
    request({
      url: url,
      method: 'put',
      data: data
    })
  }
  // upload (url, data) {
  //   request({
  //     url: url,
  //     method: 'post',
  //     data: data,
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  // }
}

export default http
