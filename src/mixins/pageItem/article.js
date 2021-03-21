
// 添加修改文章
import { createPageItem, editPageItem } from '@/api/home'
import { categorySelect } from '@/api/get'
export const settingArticle = {
  data () {
    return {
      optionCategory: [],
      visibleArticle: false,
      stepArticle: 0,
      formArticle: {
        type: 'article',
        title: '',
        page_id: '',
        category_id: '',
        org_id: '',
        cover: '',
        permission_ids: [],
        jump_type: 0,
        content: ''
      },
      fileListArticle: [],
      editorHtmlArticle: ''
    }
  },
  created () {
  },
  methods: {
    getCategorySelect () {
      categorySelect().then(res => {
        console.log(res, 111111)
        const data = res.data
        this.optionCategory = data
      })
    },
    getEditorArticle (val) {
      this.editorHtmlArticle = val
    },
    openArticle (id, index) {
      console.log(id, index)
      this.getCategorySelect()
      this.visibleArticle = true
      this.formArticle.page_id = this.tabsActive
    },
    updateTypeArticle (val) {
      this.formArticle.jump_type = val
    },
    updateFormArticle (val) {
      console.log(val)
      Object.assign(this.formArticle, val)
    },
    uploadArticle (file) {
      this.customRequest(file)
        .then((res) => {
          // console.log(res)
          const data = res.data
          this.formArticle.cover = data.src
        })
    },
    uploadChangeArticle (info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })

      this.fileListArticle = fileList
    },
    onNextArticle () {
      this.$refs.rulesFormArticle.validate(valid => {
        console.log(valid)
        if (valid) {
          // alert('submit!')
          this.stepArticle = 1
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onResetArticle () {
      this.$refs.rulesFormArticle.resetFields()
      this.formArticle = {
        type: 'article',
        title: '',
        page_id: '',
        category_id: '',
        org_id: '',
        cover: '',
        permission_ids: [],
        jump_type: 0,
        content: ''
      }
      this.stepArticle = 0
      this.fileListArticle = []
    },
    onCloseArticle () {
      this.onResetArticle()
      this.visibleArticle = false
    },
    onSubmitArticle () {
      this.formArticle.content = this.editorHtmlArticle
      this.$refs.rulesFormArticle.validate(valid => {
        if (valid) {
          this.confirmLoading = true

          const params = this.formArticle
          if (this.formArticle) {
            params.permission_ids = this.formArticle.permission_ids.join(',')
          }
          this.submitAfterArticle(params).then((res) => {
            this.confirmLoading = false
            this.getPageItemList()
            if (this.formArticle.jump_type === 3) {
              this.stepArticle = 2
            } else {
              this.$Message.success(res.msg)
              this.onResetArticle()
              this.visibleArticle = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitAfterArticle (params) {
      if (this.formArticle.id) {
        return editPageItem(params)
      } else {
        return createPageItem(params)
      }
    },
    changeSelectArticle (value) {
      this.formArticle.permission_ids = value
    }
  },
  watch: {
    'formArticle.jump_type': {
      deep: true,
      handler: function (newV, oldV) {
        console.log('watch中：', newV)
      }
    }
  }
}
