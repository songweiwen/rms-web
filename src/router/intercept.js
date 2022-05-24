import router from './index'
import Cookies from 'js-cookie'
// import Vue from 'vue'
// import Vue from 'vue'
// import store from '@/store'
router.beforeEach(async (to, from, next) => {
  const accessToken = Cookies.get('access_token')

  // if (localStorage.getItem('userInfo')) {
  //   console.log(JSON.parse(localStorage.getItem('userInfo')))
  //   store.commit('SET_userInfo', localStorage.getItem('userInfo'))
  // }

  console.log(accessToken, to)
  if (to.path === '/') {
    if (accessToken) { // 判断本地是否存在access_token
      next({
        path: '/home'
      })
    } else {
      next({
        path: '/login'
      })
    }
  } else if (to.path === '/login') {
    next()
  } else {
    if (accessToken) { // 判断本地是否存在access_token
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
  // next()
})

router.afterEach(() => {
})
