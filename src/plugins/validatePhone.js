
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)

Vue.prototype.$validatePhone = (phone) => {
  console.log(phone)
  // 判断输入的手机号是否合法
  if (!phone) {
    Toast({
      message: '手机号码不能为空',
      position: 'bottom'
    })
    console.log('手机号码不能为空')
    return false
  } else if (phone.length !== 11) {
    Toast({
      message: '手机号是11位',
      position: 'bottom'
    })
    console.log('手机号是11位')
    return false
  } else if (!/^1[345678]\d{9}$/.test(phone)) {
    Toast({
      message: '请输入正确是手机号',
      position: 'bottom'
    })
    console.log('请输入正确是手机号')
    return false
  } else {
    // this.tipsPhone = ''
    return true
  }
}
