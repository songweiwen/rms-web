import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jsbridge from '@/utils/jsbridge.js'
// import { audiojs } from '@/plugins/audiojs/audio.min.js'
// import Cookies from 'js-cookie'
// 引入各插件
import './plugins/index'

// 引入各封装
import './utils/index'

// 指令
import './directive/index'

// 路由守卫
import './router/intercept.js'

// 引入style.less
import '@/assets/css/style.less'

// 手机号格式验证
import '@/utils/validatePhone.js'

import websocket from '@/utils/websocket'

// 是否手机
// import isMobile from '@/utils/isMobile.js'

// H5原生交互API

// vue中全局批量注册组件
import components from '@/components/index.js'
import Vconsole from 'vconsole'
// if ('wView' in window) {
//   window.wView.allowsInlineMediaPlayback = 'YES'
//   window.wView.mediaPlaybackRequiresUserAction = 'NO'
// }

Vue.use(components)
if (window.webkit) {
  Vue.prototype.$vconsole = new Vconsole()
}
if (window.android) {
}
// if (process.env.VUE_APP_ENV_CONFIG !== 'prod') {
// Vue.prototype.$vconsole = new Vconsole()
// }
// document.body.className = 'fringeNo'

Vue.config.productionTip = false
// Vue.prototype.$back = () => router.back(-1)
Vue.prototype.$nbsp = '\u3000'
Vue.prototype.$axios = axios
Vue.prototype.$jsbridge = jsbridge

Vue.prototype.$websocket = websocket
// Vue.prototype.$audiojs = audiojs
// console.log(Vue.$audiojs)
// Vue.prototype.$audiojsC = audiojs.createAll()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
