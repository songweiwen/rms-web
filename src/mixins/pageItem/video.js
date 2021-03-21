
// 添加修改视频
import { createPageItem, editPageItem } from '@/api/home'
export const settingVideo = {
  data () {
    return {
      visibleVideo: false,
      stepVideo: 0,
      formVideo: {
        type: 'video',
        cover: '',
        bg_image: '',
        // video_url: '',
        video_url: '',
        permission_ids: [],
        jump_type: 0,
        content: ''
      },
      fileListVideoCover: [],
      fileListVideoBg: [],
      editorHtmlVideo: ''
    }
  },
  created () {
  },
  methods: {
    getEditorVideo (val) {
      this.editorHtmlVideo = val
    },
    openVideo () {
      this.formVideo.page_id = this.tabsActive
      this.visibleVideo = true
    },
    updateTypeVideo (val) {
      this.formVideo.jump_type = val
    },
    updateFormVideo (val) {
      console.log(val)
      Object.assign(this.formVideo, val)
    },
    uploadVideoCover (file) {
      this.customRequest(file)
        .then((res) => {
          // console.log(res)
          const data = res.data
          this.formVideo.cover = data.src
        })
    },
    uploadChangeVideoCover (info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      this.fileListVideoCover = fileList
    },
    uploadVideoBg (file) {
      this.customRequest(file)
        .then((res) => {
          // console.log(res)
          const data = res.data
          this.formVideo.bg_image = data.src
        })
    },
    uploadChangeVideoBg (info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      this.fileListVideoBg = fileList
    },
    onSubmitVideo () {
      this.formVideo.content = this.editorHtmlVideo
      this.$refs.rulesFormVideo.validate(valid => {
        console.log(valid)
        if (valid) {
          this.confirmLoading = true
          const params = this.formVideo
          if (this.formVideo.permission_ids) {
            params.permission_ids = this.formVideo.permission_ids.join(',')
          }

          this.submitAfterVideo(params).then((res) => {
            this.confirmLoading = false

            this.confirmLoading = false
            this.getPageItemList()
            if (this.formVideo.jump_type === 3) {
              this.stepVideo = 2
            } else {
              this.$Message.success(res.msg)
              this.onResetVideo()
              this.visibleVideo = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitAfterVideo (params) {
      if (this.formVideo.id) {
        return editPageItem(params)
      } else {
        return createPageItem(params)
      }
    },
    onNextVideo () {
      this.$refs.rulesFormVideo.validate(valid => {
        console.log(valid)
        if (valid) {
          // alert('submit!')
          this.stepVideo = 1
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onResetVideo () {
      this.$refs.rulesFormVideo.resetFields()
      this.formVideo = {
        type: 'video',
        cover: '',
        bg_image: '',
        video_url: '',
        permission_ids: [],
        jump_type: 0
      }
      this.fileListVideoCover = []
      this.fileListVideoBg = []
      this.stepVideo = 0
    },
    onCloseVideo () {
      this.onResetVideo()
      this.visibleVideo = false
    },
    changeSelectVideo (value) {
      this.formVideo.permission_ids = value
    }
  }
}
