/* eslint-disable */
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'
// var url = process.env.VUE_APP_WS_API
import Cookies from 'js-cookie'
var url = Cookies.get('ws')
var tt
var ws
var lockReconnect = false// 避免重复连接
var clientId = localStorage.getItem('userInfo')// 缓存中取出客户端id
// var userInfo = localStorage.getItem('vuex')?JSON.parse(localStorage.getItem('vuex')).userInfo.userInfo.userInfo : null
var userInfo = store.getters.userInfo.userInfo
// console.log(store.getters.userInfo,1111);/
// console.log(store.getters.userInfo.userInfo,2222);
var websocket = {
  Init: function (clientId) {
    var userInfo = store.getters.userInfo.userInfo.userInfo
    // console.log(store.getters.userInfo,1111);
    // console.log(store.getters.userInfo.userInfo,2222);
    if ('WebSocket' in window) {
      if (clientId) {
        ws = new WebSocket(url + clientId)
      }else{
        ws = new WebSocket(url)
      }
    } else if ('MozWebSocket' in window) {
      if (clientId) {
        ws = new MozWebSocket(url + clientId)
      }else{
        ws = new MozWebSocket(url)
      }
    } else {
      console.log('您的浏览器不支持 WebSocket!')
      return
    }

    ws.onmessage = function (e) {
      const redata = JSON.parse(e.data);
      console.log('接收消息:' + e.data)
      heartCheck.start()
      // if (redata.code == 200) { // 心跳消息不做处理
      // // messageHandle(redata)
      // } else if (redata.code == 200){

      // }
    }

    ws.onclose = function () {
      console.log('连接已关闭')
      Message({
        message: '连接已关闭',
        type: 'error'
      })
      // reconnect(clientId)
    }

    ws.onopen = function () {
      console.log('连接成功')
      // Message({
      //   message: '连接成功',
      //   type: 'success'
      // })
      ws.send( JSON.stringify({ commandString: 'LG', userName: userInfo.userName, type: 'prod' }))
      heartCheck.start()
      // let vm = new Vue();
      // console.log(vm);
    }

    ws.onerror = function (e) {
      console.log('数据传输发生错误')
      Message({
        message: '数据传输发生错误',
        type: 'error'
      })
      // reconnect(clientId)
    }
  },
  Send: function (data) {
    var userInfo = store.getters.userInfo.userInfo.userInfo
    const params = {
      userName: userInfo.userName
    }
    if (process.env.NODE_ENV === "development") {
      // alert("开发环境");
      params.type= 'test1' 
    }else {
      // alert("生产环境");
      params.type= 'prod' 
    }
    const msg = JSON.stringify(Object.assign(params, data))
    console.log('发送消息：' + msg)
    // window.overTime = window.setTimeout(() => {
    //   MessageBox.alert('请求超时了！', '连接警告', {
    //     confirmButtonText: '确定',
    //     type: 'error',
    //     callback: action => {
    //       location.reload();
    //     }
    //   })
    // }, 1000 * 10)
    // overTime = setTimeout(() => {
    //   MessageBox.alert('请求超时了！', '连接警告', {
    //     confirmButtonText: '确定',
    //     type: 'error',
    //     callback: action => {
    //       overTime = null
    //       clearTimeout(overTime)
    //       location.reload();
    //     }
    //   });
    //   overTime = null
    //   clearTimeout(overTime)
    // }, 1000*10);
    localStorage.setItem('wsParams', msg)
    ws.send(msg)
  },
  getWebSocket () {
    return ws
  },
  getStatus () {
    // window.clearTimeout(window.overTime)
    // window.overTime = null
    if (ws.readyState === 0) {
      return '未连接'
    } else if (ws.readyState === 1) {
      return '已连接'
    } else if (ws.readyState === 2) {
      return '连接正在关闭'
    } else if (ws.readyState === 3) {
      return '连接已关闭'
    }
  }
}

export default websocket

// 根据消息标识做不同的处理
function messageHandle (data) {
  // const msg = JSON.parse(message)
  // const data =data
  return data
  // switch (msg.flag) {
  //   case 'command':
  //     console.log('指令消息类型')
  //     break
  //   case 'inform':
  //     console.log('通知')
  //     break
  //   default:
  //     console.log('未知消息类型')
  // }
}

function reconnect (sname) {
  if (lockReconnect) {
    return
  };
  lockReconnect = true
  // 没连接上会一直重连，设置延迟避免请求过多
  tt && clearTimeout(tt)
  tt = setTimeout(function () {
    console.log('执行断线重连...')
    websocket.Init(sname)
    lockReconnect = false
  }, 4000)
}

// 心跳检测
var heartCheck = {
  timeout: 1000 * 20 * 1,
  timeoutObj: null,
  serverTimeoutObj: null,
  start: function () {
    console.log('开始心跳检测')
    var self = this
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    this.timeoutObj = setTimeout(function () {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      console.log('心跳检测...')
      // "HeartBeat": 0,
      ws.send(JSON.stringify({"username": userInfo.userName, "commandString": 'HB' }))
      self.serverTimeoutObj = setTimeout(function () {
        if (ws.readyState !== 1) {
          ws.close()
        }
        // createWebSocket();
      }, self.timeout)
    }, this.timeout)
  }
}
