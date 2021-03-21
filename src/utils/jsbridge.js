const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
/* eslint-disable */
// 这是必须要写的，用来创建一些设置
function setupWebViewJavascriptBridge (callback) {
  // Android使用
  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        () => {
          callback(window.WebViewJavascriptBridge)
        },
        false
      )
    }
    console.log('tag', '安卓')
    sessionStorage.phoneType = 'android'
  }

  // iOS使用
  if (isiOS) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge)
    } else {
      //register
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function() {
          callback(WebViewJavascriptBridge)
        },
        false
      )
      //register ios
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
      }
      window.WVJBCallbacks = [callback]
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'https://__bridge_loaded__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }
    sessionStorage.phoneType = 'ios'
  }
}
// 注册回调函数，第一次连接时调用 初始化函数(android需要初始化,ios不用)
setupWebViewJavascriptBridge((bridge) => {
  if (isAndroid) {
    // 初始化
    bridge.init((message, responseCallback) => {
      var data = {
        'Javascript Responds': 'Wee!'
      }
      responseCallback(data)
    })
  }
})

export default {
  // js调APP方法 （参数分别为:app提供的方法名  传给app的数据  回调）
  callHandler (name, data, callback) {
    console.log(name, 'name');
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler(name, data, callback)
    })
  },
  // APP调js方法 （参数分别为:js提供的方法名  回调）
  registerHandler (name, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.registerHandler(name, (data, responseCallback) => {
        callback(data, responseCallback)
      })
    })
  },

  getToken (callback) {
    this.callHandler('getToken', {}, (response) => {
      console.log(response);
      callback && callback(response)
    })
  },

  updateHeadState (data, callback) {
    console.log('updateHeadState')
    this.callHandler('updateHeadState', data, (response) => {
      callback && callback(response)
    })
  },

  makePhoneCall (data, callback) {
    console.log('makePhoneCall')
    this.callHandler('makePhoneCall', data, (response) => {
      callback && callback(response)
    })
  },

  navigationBarClearColor (data, callback) {
    console.log('navigationBarClearColor')
    this.callHandler('navigationBarClearColor', data, response => {
      // console.log(response, 222222)
      callback && callback(response)
    })
  },

  newNativePage (data, callback) {
    console.log('newNativePage')
    this.callHandler('newNativePage', data, (response) => {
      callback && callback(response)
    })
  },

  iosCloseElastic (data, callback) {
    console.log('iosCloseElastic')
    this.callHandler('iosCloseElastic', data, (response) => {
      callback && callback(response)
    })
  },

  iosCloseProgress (data, callback) {
    console.log('iosCloseProgress')
    this.callHandler('iosCloseProgress', data, (response) => {
      callback && callback(response)
    })
  },  
  showView (data, callback) {
    console.log('showView')
    this.callHandler('showView', data, (response) => {
      callback && callback(response)
    })
  }
}
