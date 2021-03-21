export default {
  /**
   * 获取当前浏览器ua
   * @return {String} 浏览器ua
   */
  getUA () {
    return navigator.userAgent.toLowerCase()
  },

  /**
   * 获取当前系统
   * @param  {Number} isDetail 是否显示详细
   * @return {String}          系统类型
   */
  getOS (isDetail = 0) {
    let osType = 'Not found'

    if (this.getUA().indexOf('iphone') > -1) {
      osType = isDetail ? 'iphone' : 'ios'
    }
    if (this.getUA().indexOf('ipad') > -1) {
      osType = isDetail ? 'ipad' : 'ios'
    }
    if (this.getUA().indexOf('android') > -1) {
      osType = 'android'
    }

    return osType
  }
}
