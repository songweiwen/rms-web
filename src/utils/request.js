import axios from 'axios'
// import store from '@/store'
// import { Toast } from 'vant'
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth'
import router from '@/router'
// import NProgress from 'nprogress'
import Cookies from 'js-cookie'
/**
 * 一、功能
 * 1. 统一拦截http错误请求码；
 * 2. 统一拦截业务错误代码；
 * 3. 统一设置请求前缀,每个 http 加前缀 baseURL
 * # 4. 配置异步请求过渡状态：显示蓝色加载条表示正在请求中，避免给用户页面假死的不好体验。使用 NProgress 工具库。
 *
 * 二、引包：
 * |-- axios：http 请求工具库
 * |-- element-ui： Message 消息提示
 */

// 创建自定义axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 10000 * 6, // request timeout 请求超时时间
  withCredentials: false // 是否允许带cookie这些
  // headers: {
  // 'Content-Type': "application/json;charset=utf-8"
  //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  // }
})

// request拦截器 请求拦截器

const toastLodingList = [
  // '/student/list', // 获取学生
  // '/student/create', // 创建学生
  // '/student/update', // 修改学生
  // // '/get/region',
  // '/get/school', // 获取学校
  // '/question/category', // 获取题目分类
  // // '/my/sign/record'
  // '/sign/record', // 获取当月签到
  // '/question/list', // 获取题目目录
  // '/question/bingo', // 答题提交
  // '/question/pass' // 通关
]

// const eidtList = [
//   '/student/update',
//   '/question/bingo'
// ]

// const createList = [
//   '/student/create'
// ]

// let timer
// const loadingText = '加载中'

service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // NProgress.start()
    // if (store.getters.token) {
    // config.headers['X-Token'] = getToken()
    // config.headers.Authorization = 'Bearer ' + getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['Authorization'] = 'Bearer a6afd3ae-c555-4508-bf7c-bde1cbf6033f' // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // }
    // console.log(Cookies.get('access_token'))
    config.headers.Authorization = Cookies.get('access_token')
    // console.log('Authorization', config.headers.Authorization)
    // config.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wveHpzLmFwcC4yNDE4LmNuXC9hdXRoXC9sb2dpbl9ieV9zbXMiLCJpYXQiOjE2MDA4MjU2MTMsImV4cCI6MTYwMDkxMjAxMywibmJmIjoxNjAwODI1NjEzLCJqdGkiOiI2NXRCSDZNWFNFRmhuaHFRIiwic3ViIjo3LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.8bSt-1zwQPNNo646_7u7o_0MSmtxQTwtqQzIyw9g8Ss'
    // config.headers.userid = 2
    if (toastLodingList.indexOf(config.url) > -1) {
      // const url = config.url
      // console.log(toastLodingList.forEach(item => console.log(item, eidtList.indexOf(item) > -1)))
      // if (eidtList.indexOf(url) > -1) {
      //   loadingText = '提交中'
      // } else if (createList.indexOf(url) > 1) {
      //   loadingText = '创建中'
      // }

      config.timer = setTimeout(() => {
        // Toast.allowMultiple()
        // Toast.loading({
        //   message: `${loadingText}...`,
        //   forbidClick: true,
        //   duration: 0
        // })
      }, 1000)
      // console.log('加载开始', config.timer)
    }
    // console.log(config, '1111111111')
    // timer()
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    Message.error(error.message)
    // Toast({
    //   message: error.message,
    //   position: 'bottom'
    // })
    return Promise.reject(error)
  }
)

// respone拦截器 响应拦截器
service.interceptors.response.use(
  response => {
    // console.log('清除成功', response.config.timer)
    if (toastLodingList.indexOf(response.config.url) > -1) {
      // Toast.clear()
      clearTimeout(response.config.timer)
      response.config.timer = null
    }

    // 对响应数据做点什么
    // NProgress.done()
    // console.log(response)
    const res = response.data
    // 由后端抛出的错误, 就是业务请求状态（和后端约定）
    // 0 请求成功
    // 500 请求错误
    // 401 刷新token
    // 402彻底退出登录

    // if (res.code === 401) {
    //   // 刷新token
    //   const accessToken = res.data.access_token
    //   Cookies.set('access_token', accessToken)
    //   response.config.headers.Authorization = accessToken
    //   return service(response.config).then(res => {
    //   //   // 使响应结果省略data字段
    //     return Promise.resolve(res.data)
    //   })
    //   // service.interceptors.response.eject(service())
    //   // router.push('/login')
    //   // return res
    //   // return Promise.reject(res.message)
    // } else
    if (res.code === 401 || res.code === 1001) {
      Cookies.remove('access_token')
      router.push('/login')
    } else if (res.code !== 200) {
      // console.log(response)
      // 处理全局报错
      Message.error(res.message || `错误：${res}`)
      // Toast({
      //   message: res.message || `错误：${res}`,
      //   position: 'bottom'
      // })
      return Promise.reject(res.message)
    }
    return res
  },
  error => {
    // 对响应错误做点什么
    // NProgress.done()
    console.log(error) // for debug
    console.log(error.response) // for debug
    // 由网络或者服务器抛出的错误
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登陆'
          // 退出用户，清除用户信息
          // store.dispatch('user/resetToken').then(res => {
          //   router.push(`/login?redirect=${router.currentRoute.fullPath}`)
          //   // router.push(`/login?redirect=${this.route.fullPath}`) // 跳转登陆
          // })
          break
        case 402:
          error.message = '过期了，请重新登陆!'
          // 退出用户，清除用户信息
          // store.dispatch('user/resetToken').then(res => {
          //   router.push(`/login?redirect=${router.currentRoute.fullPath}`)
          // })
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = process.env.NODE_ENV !== 'production' ? `请求地址出错：${error.response.config.url}` : '请求失败'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '请求错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      console.log('Error', error.message)
      error.message = '连接服务器失败!'
    }
    // 调用element-ui的Message
    Message.error(error.message)
    // Toast({
    //   message: error.message,
    //   position: 'bottom'
    // })
    return Promise.reject(error)
  }
)

export default service

/*
   服务器状态码错误信息解释
   200: '服务器成功返回请求的数据。',
   201: '新建或修改数据成功。',
   202: '一个请求已经进入后台排队（异步任务）。',
   204: '删除数据成功。',
   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
   401: '用户没有权限（令牌、用户名、密码错误）。',
   403: '用户得到授权，但是访问是被禁止的。',
   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
   406: '请求的格式不可得。',
   410: '请求的资源被永久删除，且不会再得到的。',
   422: '当创建一个对象时，发生一个验证错误。',
   500: '服务器发生错误，请检查服务器。',
   502: '网关错误。',
   503: '服务不可用，服务器暂时过载或维护。',
   504: '网关超时。'
*/
