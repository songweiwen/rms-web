
import { formatDate } from '@/utils/utils'
export const ws = {
  data () {
    return {
      notifyList: []
    }
  },
  created () {
    this.notifyList = []
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.$webSocket.getWebSocket().onmessage = this.websocketonMessage
    //   }, 1000)
    // })
  },
  methods: {
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
