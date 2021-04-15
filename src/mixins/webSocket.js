
import { formatDate } from '@/utils/utils'
export const ws = {
  data () {
    return {
      notifyList: [],
      audioDom: null,
      audioTimer: null,
      audioForTime: 15
    }
  },
  created () {
    this.notifyList = []
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.$webSocket.getWebSocket().onmessage = this.websocketonMessage
    //   }, 1000)
    // })
    this.audioForTime = this.$store.getters.audioSecond
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
    audioSrc (name) {
      this.audioForTime = this.$store.getters.audioSecond
      this.audioDom.children[0].setAttribute('src', 'audio/' + name + '.wav')
      this.audioDom.children[1].setAttribute('src', 'audio/' + name + '.mp3')
      this.audioDom.load()
      // this.audioDom.play()
    },
    queryPlay () {
      this.audioDom.removeAttribute('loop')
      this.audioSrc('参数读取成功')
    },
    settingPlay () {
      this.audioDom.removeAttribute('loop')
      this.audioSrc('参数设置成功')
    },
    nearErroePlay () {
      this.audioDom.setAttribute('loop', 'loop')
      this.audioSrc('近端机故障报警')
      this.audioStop()
    },
    nearSuccessPlay () {
      this.audioDom.setAttribute('loop', 'loop')
      this.audioSrc('近端机故障恢复')
      this.audioStop()
    },
    farErroePlay () {
      this.audioDom.setAttribute('loop', 'loop')
      this.audioSrc('远端机故障报警')
      this.audioStop()
    },
    farSuccessPlay () {
      this.audioDom.setAttribute('loop', 'loop')
      this.audioSrc('远端机故障恢复')
      this.audioStop()
      this.audioDom.setAttribute('loop', 'loop')
    },
    audioStop () {
      setTimeout(() => {
        this.audioDom.pause()
        // alert(1)
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
      // 近端机报警  全局提示
      if (redata.commandString === 'WN') {
        if (String(redata.nearDevice.deviceTime).length === 13) {
          redata.nearDevice.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(redata.nearDevice.deviceTime))
        }
        // this.notifyList.push(
        this.$notify.error({
          title: `${redata.nearDevice.deviceName}报警！`,
          message: `报警时间：${redata.nearDevice.deviceTime}`,
          duration: 0
        })
        this.nearErroePlay()
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
          duration: 0
        })
        this.farErroePlay()
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
          duration: 0,
          type: 'success'
        })
        this.nearSuccessPlay()
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
          duration: 0,
          type: 'success'
        })
        this.farSuccessPlay()
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
