
import { formatDate } from '@/utils/utils'
import { setTimeoutLog } from '@/api/other'
export const ws = {
  data () {
    return {
      notifyList: [],
      audioDom: null,
      audioTimer: null,
      audioForTime: 15,
      audioEnable: false
    }
  },
  created () {
    this.notifyList = []
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.$webSocket.getWebSocket().onmessage = this.websocketonMessage
    //   }, 1000)
    // })
    console.log(this.$store.getters)
    this.audioForTime = this.$store.getters.audioSetting.second
    this.audioEnable = this.$store.getters.audioSetting.enable === 1
    this.$nextTick(() => {
      console.log(document.getElementById('audio'))
      this.audioDom = document.getElementById('audio')
      console.log(this.audioDom.children)
      // this.audioDom.children[0].setAttribute('src', 'audio/参数读取成功.wav')
      // this.audioDom.children[1].setAttribute('src', 'audio/参数读取成功.mp3')
    })
    // if (!document.getElementById('audio')) {
    //   this.audioDom = document.createElement('AUDIO')
    //   this.audioDom.id = 'audio'
    // this.audioDom.setAttribute('src', '/i/horse.mp3')
    // y.setAttribute('src', '/i/horse.ogg')
    // y.setAttribute('type', 'audio/ogg')
    // document.getElementById('myAudio').appendChild(y)
    //   this.audioDom.setAttribute('controls', 'controls')
    //   document.body.appendChild(this.audioDom)
    //   this.audioDom.play()
    // }
  },
  methods: {
    setTimeoutLog (params) {
      console.log(params)
      JSON.parse(params)
      setTimeoutLog({ model: params }).then(res => {
        localStorage.removeItem('wsParams')
      })
    },
    audioSrc (name) {
      if (this.audioEnable) {
        const that = this
        this.audioForTime = this.$store.getters.audioSecond
        this.audioDom.children[0].setAttribute('src', 'audio/' + name + '.wav')
        this.audioDom.children[1].setAttribute('src', 'audio/' + name + '.mp3')
        this.audioDom.load()
        this.audioDom.addEventListener('canplay', function () { // 监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
          that.audioDom.play()
        })
      }
    },
    queryPlay () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('参数读取成功')
      }
    },
    settingPlay () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('参数设置成功')
      }
    },
    nearErroePlay () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('近端机故障报警')
      }
    },
    nearSuccessPlay () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('近端机故障恢复')
      }
    },
    farErroePlay () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('远端机故障报警')
      }
    },
    farSuccessPlay () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('远端机故障恢复')
      }
    },
    workOutNear () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('核销近端机成功')
      }
    },
    workOutFar () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('核销远端机成功')
      }
    },
    checkNear () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('检测近端机')
      }
    },
    checkFar () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('检测远端机')
      }
    },
    checkNearSuccess () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('检测近端机成功')
      }
    },
    checkFarSuccess () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('检测远端机成功')
      }
    },
    xunjianStart () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('巡检开始')
      }
    },
    xunjianEnd () {
      if (this.audioEnable) {
        this.audioDom.removeAttribute('loop')
        this.audioSrc('巡检结束')
      }
    },
    audioStop () {
      setTimeout(() => {
        this.audioDom.pause()
      }, this.audioForTime * 1000)
    },
    closeNotify () {
      if (this.notifyList.length !== 0) {
        // this.notifyList[0].close()
        this.notifyList.forEach(e => {
          e.close()
        })
        this.notifyList = []
      }
    },
    // websocketonmessage (e) {
    //   const redata = JSON.parse(e.data)
    //   this.websocketonMessageAll(redata)
    // },
    websocketonMessageAll (redata) {
      console.log('jiesdsfsdfsdf')
      if (redata.code === 500) {
        this.$message.error(redata.msg)
      }

      if (redata.code === 407) {
        this.$message.error('权限不足！')
      }
      // 近端机报警  全局提示
      if (redata.commandString === 'WN') {
        if (String(redata.nearDevice.deviceTime).length === 13) {
          redata.nearDevice.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(redata.nearDevice.deviceTime))
        }
        // this.notifyList.push(
        this.$notify.error({
          title: `${redata.nearDevice.deviceName}报警！`,
          message: `报警时间：${redata.nearDevice.deviceTime}`,
          duration: 3000
        })
        this.nearErroePlay()
        if (this.getTree() && this.isHome) {
          this.getTree()
        }
        // )
      } else if (redata.commandString === 'WF') {
      // 远端机报警  全局提示
        if (String(redata.farDevice.deviceTime).length === 13) {
          redata.farDevice.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(redata.farDevice.deviceTime))
        }
        // this.notifyList.push(
        this.$notify.error({
          title: `${redata.farDevice.deviceName}报警！`,
          message: `报警时间：${redata.farDevice.deviceTime}`,
          duration: 3000
        })
        this.farErroePlay()
        if (this.getTree() && this.isHome) {
          this.getTree()
        }
        // )
      } else if (redata.commandString === 'TRN') {
      // 近端机修复故障  全局提示
        if (String(redata.nearDevice.deviceTime).length === 13) {
          redata.nearDevice.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(redata.nearDevice.deviceTime))
        }
        // this.notifyList.push(
        this.$notify({
          title: `${redata.nearDevice.deviceName}修复故障！`,
          message: `修复时间：${redata.nearDevice.deviceTime}`,
          duration: 3000,
          type: 'success'
        })
        this.nearSuccessPlay()
        if (this.getTree() && this.isHome) {
          this.getTree()
        }
        // )
      } else if (redata.commandString === 'TRF') {
      // 远端机修复故障  全局提示
        if (String(redata.farDevice.deviceTime).length === 13) {
          redata.farDevice.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(redata.farDevice.deviceTime))
        }
        // this.notifyList.push(
        this.$notify({
          title: `${redata.farDevice.deviceName}修复故障！`,
          message: `修复时间：${redata.farDevice.deviceTime}`,
          duration: 3000,
          type: 'success'
        })
        this.farSuccessPlay()
        if (this.getTree() && this.isHome) {
          this.getTree()
        }
        // )
      }
      console.log(redata.commandString, 88888)
    }
  },
  beforeRouteLeave (to, form, next) {
    if (this.notifyList.length !== 0) {
      // this.notifyList[0].close()
      // this.notifyList.forEach(e => {
      //   e.close()
      // })
      this.notifyList = []
      next()
    } else {
      next()
    }
  }
}
