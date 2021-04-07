
export const ws = {
  data () {
    return {
    }
  },
  created () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$webSocket.getWebSocket().onmessage = this.websocketonMessage
      }, 1000)
    })
  },
  methods: {
    websocketonMessageAll (redata) {
      if (redata.code === 500) {
        this.$message.error(redata.msg)
      }
      // 近端机报警  全局提示
      if (redata.commandString === 'WN') {
        this.$notify.error({
          title: `${redata.nearDevice.deviceName}报警！`,
          message: `报警时间：${redata.nearDevice.deviceTime}`,
          duration: 0
        })
      } else if (redata.commandString === 'WF') {
      // 远端机报警  全局提示
        this.$notify.error({
          title: `${redata.farDevice.deviceName}报警！`,
          message: `报警时间：${redata.farDevice.deviceTime}`,
          duration: 0
        })
      } else if (redata.commandString === 'TRN') {
      // 近端机修复故障  全局提示
        this.$notify({
          title: `${redata.nearDevice.deviceName}修复故障！`,
          message: `修复时间：${redata.nearDevice.deviceTime}`,
          duration: 0,
          type: 'success'
        })
      } else if (redata.commandString === 'TRF') {
      // 远端机修复故障  全局提示
        this.$notify({
          title: `${redata.farDevice.deviceName}修复故障！`,
          message: `修复时间：${redata.farDevice.deviceTime}`,
          duration: 0,
          type: 'success'
        })
      }
      console.log(redata.commandString, 88888)
    }
  }
}
