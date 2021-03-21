
// 添加修改视频
import { createPageItem, editPageItem } from '@/api/home'
export const settingAd = {
  data () {
    return {
      visibleAd: false,
      stepAd: 0,
      formAd: {
        type: 'banner',
        cover: '',
        page_id: '',
        permission_ids: [],
        jump_type: 0,
        is_full: 0, // <!-- 1铺满 0 不铺满 -->
        // height: 1,
        content: ''
      },
      // heightAd: 100,
      fileListAd: [],
      editorHtmlAd: ''
    }
  },
  created () {
  },
  methods: {
    getEditorAd (val) {
      this.editorHtmlAd = val
    },
    openAd () {
      this.formAd.page_id = this.tabsActive
      this.visibleAd = true
    },
    updateTypeAd (val) {
      this.formAd.jump_type = val
    },
    updateFormAd (val) {
      console.log(val)
      Object.assign(this.formAd, val)
    },
    uploadAd (file) {
      this.customRequest(file)
        .then((res) => {
          // console.log(res)
          const data = res.data
          this.formAd.cover = data.src
        })
    },
    uploadChangeAd (info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      this.fileListAd = fileList
    },
    onSubmitAd () {
      this.formAd.content = this.editorHtmlAd
      // this.formAd.height = this.heightAd / 100
      this.$refs.rulesFormAd.validate(valid => {
        console.log(valid)
        if (valid) {
          this.confirmLoading = true
          const params = this.formAd
          if (this.formAd.permission_ids) {
            params.permission_ids = this.formAd.permission_ids.join(',')
          }
          this.submitAfterAd(params).then((res) => {
            this.confirmLoading = false
            this.getPageItemList()

            if (this.formAd.jump_type === 3) {
              this.stepAd = 2
            } else {
              this.$Message.success(res.msg)
              this.onResetAd()
              this.visibleAd = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitAfterAd (params) {
      if (this.formAd.id) {
        return editPageItem(params)
      } else {
        return createPageItem(params)
      }
    },
    onNextAd () {
      this.$refs.rulesFormAd.validate(valid => {
        console.log(valid)
        if (valid) {
          // alert('submit!')
          this.stepAd = 1
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onResetAd () {
      this.$refs.rulesFormAd.resetFields()
      this.formAd = {
        type: 'banner',
        cover: '',
        permission_ids: [],
        jump_type: 0,
        is_full: 0,
        // height: 1,
        content: ''
      }
      this.stepAd = 0
      this.fileListAd = []
      // this.heightAd = 100
    },
    onCloseAd () {
      this.onResetAd()
      this.visibleAd = false
    },
    changeSelectAd (value) {
      this.formAd.permission_ids = value
    }
  }
}
