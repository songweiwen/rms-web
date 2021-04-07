
export const overTimeInit = {
  data () {
    return {
      overTime: null
    }
  },
  created () {
  },
  methods: {
    overTimeRun () {
      window.overTime = window.setTimeout(() => {
        this.$messageBox.alert('请求超时了！', '连接警告', {
          confirmButtonText: '确定',
          type: 'error',
          callback: action => {
            this.WSloading = false
          }
        })
      }, 1000 * 10)
    },
    overTimeClear () {
      window.clearTimeout(window.overTime)
      window.overTime = null
    }
  }
}
