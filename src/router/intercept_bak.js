// import Vue from 'vue'
import { isMobile } from '@/utils/isMobile.js'
import jsbridge from '@/utils/jsbridge.js'
import router from './index'
import store from '@/store'
// 引入nprogress
// import 'nprogress/nprogress.css'
// import { Toast } from 'vant'
// import { getToken } from '@/utils/auth'

import Cookies from 'js-cookie'
import { matchInfo } from '@/api/match'
import { answerStatus } from '@/api/get'
import { studentList } from '@/api/student'
// import { getToken } from '@/api/getToken'
// Vue.prototype.$jsbridge = jsbridge
// console.log(Vue.$jsbridge)

router.beforeEach(async (to, from, next) => {
  // const userInfo = {
  //   user_id: 7,
  //   access_token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wveHpzLmFwcC4yNDE4LmNuXC9hdXRoXC9sb2dpbl9ieV9zbXMiLCJpYXQiOjE2MDI1NTIyMDgsImV4cCI6MTYwMjYzODYwOCwibmJmIjoxNjAyNTUyMjA4LCJqdGkiOiIwSFdaVnIxUEhiY1ZxWW1WIiwic3ViIjo3LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.MzyLdTeSRP1RyHiI9cPk_XWsrf2Hw7dXyrypetK8og8',
  //   rong_cloud_token: 'f6cr/Ue9JFh8YZb5DIriHZlK0qD5xJ5r@x11b.cn.rongnav.com;x11b.cn.rongcfg.com'
  // }
  // setTimeout(() => {
  // let accessToken = ''
  // console.log(isMobile(), '移动')

  jsbridge.iosCloseProgress({
    closeProgress: true
  })

  jsbridge.iosCloseElastic({
    closeElastic: true
  })
  const webBool = process.env.NODE_ENV === 'development'
  const webToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wveHpzLmFwcC4yNDE4LmNuXC9hdXRoXC9sb2dpbl9ieV9zbXMiLCJpYXQiOjE2MDM5Mzg5NDMsImV4cCI6MTYwNDAyNTM0MywibmJmIjoxNjAzOTM4OTQzLCJqdGkiOiIwZFZicUFqUkh1empWMHRtIiwic3ViIjo3LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.TEeAXi-HnSRF7aDjC1jiPUZ0i0m8Q_O8qycDljt-c0o'
  function initCreated () {
    jsbridge.getToken((data) => {
      console.log(data)
      // accessToken = data
      Cookies.set('access_token', data)
      // console.log(accessToken, '最终获取token')
      init()
    })
  }
  if (webBool) {
    console.log('web')
    Cookies.set('access_token', webToken)
    store.commit('SET_fringe', {
      statusBarHeight: 24,
      headTitleHeight: 36
    })
    init()
  } else {
    if (isMobile()) {
      initCreated()
    }
  }

  jsbridge.navigationBarClearColor({
    clearColor: true
  }, (data) => {
    // console.log(data, typeof (data) === 'string', '获取刘海')
    if (typeof (data) === 'string') {
      // console.log(JSON.stringify(data))
      const str = data.replace('{', '')
      const str1 = str.replace('}', '')
      console.log(str1)
      const arr = str1.split(',')
      // let arr1 = []
      console.log(arr)
      const arr1 = []
      arr.forEach((e, i) => {
        console.log(e)
        arr1.push(e.split(':'))
      })
      console.log(arr1)
      const obj = {
        statusBarHeight: Number(arr1[0][1]),
        headTitleHeight: Number(arr1[1][1])
        // statusBarHeight: 44,
        // headTitleHeight: 44
      }
      console.log(obj)
      store.commit('SET_fringe', obj)
    } else {
      store.commit('SET_fringe', data)
    }
    // store.commit('SET_fringe', data)
  })
  // if (!Cookies.get('access_token')) {
  //   jsbridge.getToken((data) => {
  //     console.log(data)
  //     accessToken = data
  //     Cookies.set('access_token', accessToken || webToken)
  //     console.log(accessToken, '最终获取token')
  //     init()
  //   })
  // } else {
  //   jsbridge.navigationBarClearColor({
  //     clearColor: true
  //   }, (data) => {
  //     console.log(JSON.parse(data))
  //     if (Object.prototype.toString.call(data) === '[object String]') {
  //       store.commit('SET_fringe', JSON.parse(data))
  //       console.log(JSON.parse(data), '获取刘海')
  //     } else {
  //       store.commit('SET_fringe', data)
  //       console.log(data, '获取刘海')
  //     }
  //   })
  //   init()
  // }
  // }

  const navList = ['student', 'studentEdit', 'home', 'ranking']
  console.log(navList.indexOf(to.name), '是否显示顶部栏', to.name)
  if (navList.indexOf(to.name) !== -1) {
    jsbridge.updateHeadState({
      statusStyle: 'light',
      showCloseButton: true,
      closeButtonColor: 'light',
      titleColor: '#ffffff'
    })
  } else if (to.name === 'signUp') {
    jsbridge.updateHeadState({
      showCloseButton: false,
      statusStyle: 'light',
      closeButtonColor: 'light'
    })
  } else if (to.name === 'settl') {
    jsbridge.updateHeadState({
      showCloseButton: true,
      statusStyle: 'light',
      closeButtonColor: 'light',
      titleColor: '#ffffff',
      titleText: '牛津英语通关'
    })
  }

  // }
  // Vue.nextTick(() => {
  //   console.log(document.querySelectorAll('.main'))
  // })

  // if (!Cookies.get('access_token')) {
  // if (process.env.NODE_ENV === 'development') {
  // 开发环境
  // console.log(getToken)
  // getToken({
  //   phone: 13166668426,
  //   code: 1234
  // }).then(res => {
  //   const data = res.data
  //   console.log(data)
  //   Cookies.set('access_token', data.access_token)
  // }).catch(err => {
  //   console.log(err)
  // })
  // init()
  function goPage () {
    if (store.getters.answerStatus === 0) {
      // jsbridge.showView()
      router.replace({ name: 'signUp' })
      // initApi()
      next()
    } else if (store.getters.answerStatus === 1) {
      studentList().then(res => {
        const data = res.data
        store.commit('SET_studentlists', data)
        store.commit('SET_studentCurrent', data[0])
        store.commit('SET_studentGrade', {
          id: data[0].grade,
          index: data[0].grade - 1
        })
        // this.$store.getters.studentGrade
        // jsbridge.showView()
        router.replace({ name: 'home' })
        // initApi()
        next()
      })
    }
  }

  function init () {
    const enMatchId = 1
    Cookies.set('en_match_id', enMatchId)

    function getStudentList (status, bool) {
      if (JSON.stringify(store.getters.matchInfo) === '{}') {
        matchInfo({
          en_match_id: enMatchId
        }).then(res => {
          const data = res.data
          store.commit('SET_matchInfo', data)
          goPage()
        })
      } else {
        goPage()
      }
    }

    console.log(to.name, store.getters.answerStatus)
    // || to.name === 'home'
    if (to.name === null) {
      if (!store.getters.answerStatus) {
        // goPage(Cookies.get('answer_status'))
        answerStatus().then(res => {
          const status = res.data.res
          // const status = 0
          store.commit('SET_answerStatus', status)
          getStudentList()
        })
      } else {
        // getStudentList()
        // initApi()
        next()
      }
    } else {
      // initApi()
      next()
    }
    // }
    // } else {
    //   // 生产环境
    //   //  一会写交互调用
    // next()
    // }
    // } else {
    //   next()
    // }
  }
})

router.afterEach((to, from, next) => {
})
