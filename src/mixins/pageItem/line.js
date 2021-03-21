
// 添加修改文章
import { createPageItem, editPageItem } from '@/api/home'
export const settingLine = {
  data () {
    return {
      visibleLine: false,
      stepLine: 0,
      formLine: {
        type: 'line',
        page_id: '',
        permission_ids: [],
        jump_type: 0,
        content: ''
      },
      fileListLine: [],
      editorHtmlLine: ''
    }
  },
  created () {
  },
  methods: {
    getEditorLine (val) {
      console.log(123, val, this.formArticle.content)
      this.editorHtmlLine = val
    },
    openLine (id, index) {
      console.log(id, index)
      this.visibleLine = true
      this.formLine.page_id = this.tabsActive
    },
    updateTypeLine (val) {
      this.formLine.jump_type = val
    },
    updateFormLine (val) {
      console.log(val)
      Object.assign(this.formLine, val)
    },
    uploadLine (file) {
      this.customRequest(file)
        .then((res) => {
          // console.log(res)
          const data = res.data
          this.formLine.cover = data.src
        })
    },
    uploadChangeLine (info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })

      this.fileListLine = fileList
    },
    onNextLine () {
      this.$refs.rulesFormLine.validate(valid => {
        console.log(valid)
        if (valid) {
          // alert('submit!')
          this.stepLine = 1
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onResetLine () {
      this.$refs.rulesFormLine.resetFields()
      this.formLine = {
        type: 'line',
        page_id: '',
        permission_ids: [],
        jump_type: 0,
        content: ''
      }
      this.stepLine = 0
      this.fileListLine = []
      this.permission_idsLine = []
    },
    onCloseLine () {
      this.onResetLine()
      this.visibleLine = false
    },
    onSubmitLine () {
      this.formLine.content = this.editorHtmlLine

      this.$refs.rulesFormLine.validate(valid => {
        if (valid) {
          this.confirmLoading = true

          const params = this.formLine
          if (this.formLine) {
            params.permission_ids = this.formLine.permission_ids.join(',')
          }
          this.submitAfterLine(params).then((res) => {
            // const data =res.data
            this.confirmLoading = false
            this.getPageItemList()
            if (this.formLine.jump_type === 3) {
              this.stepLine = 2
            } else {
              this.$Message.success(res.msg)
              this.onResetLine()
              this.visibleLine = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitAfterLine (params) {
      if (this.formLine.id) {
        return editPageItem(params)
      } else {
        return createPageItem(params)
      }
    },
    changeSelectLine (value) {
      this.formLine.permission_ids = value
    }
  },
  watch: {
    'formLine.jump_type': {
      deep: true,
      handler: function (newV, oldV) {
        console.log('watch中：', newV)
      }
    }
  }
}
