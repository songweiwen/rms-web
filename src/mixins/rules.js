
// 获取浏览权限列表（下拉框） permissionSelect

// 获取页面分类列表（下拉框） pageSelect

// 获取机构列表（下拉框） orgSelect

// 获取赛事列表（下拉框） stageSelect

export const rulesArticle = {
  data () {
    return {
      rulesArticle: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        // stage_id: [
        //   { required: true, message: '请选择关联赛事', trigger: 'blur' }
        // ],
        category_id: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        org_id: [
          { required: true, message: '请选择机构', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请上传缩略图', trigger: 'change' }
        ],
        // permission_ids: [
        //   { required: true, message: '请选择浏览权限', trigger: 'blur' }
        // ],
        jump_type: [
          { required: true, message: '请选择跳转方式', trigger: 'blur' }
        ]
      }
    }
  }
}

export const rulesAd = {
  data () {
    return {
      rulesAd: {
        cover: [
          { required: true, message: '请上传广告图', trigger: 'blur' }
        ],
        heightAd: [
          { required: true, message: '请选择高度', trigger: 'blur' }
        ],
        jump_type: [
          { required: true, message: '请选择跳转方式', trigger: 'blur' }
        ]
      }
    }
  }
}

export const rulesVideo = {
  data () {
    return {
      rulesVideo: {
        cover: [
          { required: true, message: '请输入视频封面图', trigger: 'blur' }
        ],
        bg_image: [
          { required: true, message: '请输入背景图片', trigger: 'blur' }
        ],
        video_url: [
          { required: true, message: '请输入视频地址', trigger: 'blur' }
        ],
        jump_type: [
          { required: true, message: '请选择跳转方式', trigger: 'blur' }
        ]
      }
    }
  }
}
