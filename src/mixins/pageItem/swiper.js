
// 添加修改视频
import { createPageItem, editPageItem } from '@/api/home'
export const settingnSwiper = {
  data () {
    return {
      visibleSwiper: false,
      editorHtmlSwiper: '',
      formSwiper: {
        type: 'carousel',
        page_id: '',
        permission_ids: []
      },
      // 轮播
      columnsSwiper: [
        {
          title: '排序',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'indexNav' }
        },
        // {
        //   title: '菜单标题',
        //   dataIndex: 'titleNav',
        //   key: 'title',
        //   align: 'center',
        //   width: 300,
        //   scopedSlots: { customRender: 'titleNav' }
        // },
        {
          title: '图片',
          dataIndex: 'image',
          key: 'image',
          align: 'center',
          width: 200,
          scopedSlots: { customRender: 'image' }
        },
        {
          title: '跳转方式',
          dataIndex: 'jumpType',
          key: 'jumpType',
          align: 'center',
          className: 'td-select',
          width: 750,
          scopedSlots: { customRender: 'jumpType' }
        },
        {
          title: '操作',
          dataIndex: 'index',
          key: 'indexSwiperEdit',
          align: 'center',
          width: 300,
          scopedSlots: { customRender: 'indexSwiperEdit' }
        }
      ],
      dataSwiper: [],
      uploadIndexSwiper: 0,
      fileListSwiper: {
        file0: [],
        file1: [],
        file2: [],
        file3: [],
        file4: []
      }
    }
  },
  created () {
    this.onResetSwiper()
  },
  methods: {
    swiperDrag () {
      // 首先获取需要拖拽的dom节点
      const el1 = document.querySelectorAll('#tableSwiper .ant-table-tbody')[0]
      // .querySelectorAll('.anticon-menu')[0]
      console.log(el1)
      this.$Sortable.create(el1, {
        // draggable: '.anticon-menu',
        // disabled: false, // 是否开启拖拽
        filter: '.ignore-elements',
        ghostClass: 'sortable-ghost', // 拖拽样式
        animation: 150, // 拖拽延时，效果更好看
        group: { // 是否开启跨表拖拽
          pull: false,
          put: false
        },
        onEnd: (e) => { // 这里主要进行数据的处理，拖拽实际并不会改变绑定数据的顺序，这里需要自己做数据的顺序更改
          const arr = this.dataSwiper // 获取表数据
          arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]) // 数据处理
          this.$nextTick(function () {
            this.dataSwiper = arr
            // this.dataSwiper.forEach((e, i) => {
            //   e.index = i
            // })
          })
        }
      })
    },
    getEditorSwiper (val) {
      this.editorHtmlSwiper = val
    },
    openSwiper () {
      // this.dataSwiper.forEach(e => {
      //   e.page_id = this.tabsActive
      // })
      this.visibleSwiper = true
      setTimeout(() => {
        this.swiperDrag()
      }, 1000)
    },
    updateTypeSwiper (val) {
      console.log(val)
      this.dataSwiper.forEach((e, i) => {
        if (e.index === this.uploadIndexSwiper) {
          e.jump_type = val
        }
      })
      const arr = this.dataSwiper.reverse().reverse()
      this.dataSwiper = arr
      // this.dataSwiper[this.uploadIndexSwiper].jump_type = val
    },
    updateFormSwiper (val) {
      console.log(val)
      this.dataSwiper.forEach(e => {
        if (e.index === val.index) {
          e = Object.assign(e, val)
        }
      })
    },
    beforeUploadSwiper (item) {
      this.uploadIndexSwiper = item.index
    },
    uploadSwiper (file) {
      this.customRequest(file)
        .then((res) => {
          console.log(res)
          const data = res.data
          this.dataSwiper.forEach((e, i) => {
            if (e.index === this.uploadIndexSwiper) {
              e.image = data.src
            }
          })
          // this.dataSwiper[this.uploadIndexSwiper].icon = data.src
        })
    },
    uploadChangeSwiper (info) {
      console.log(info)
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      this.fileListSwiper['file' + this.uploadIndexSwiper] = fileList
    },
    onValidateSwiper () {
      let bool = false

      this.dataSwiper.forEach((e, i) => {
        console.log(e)
        if (!e.image) {
          e.validateUpload = {
            validateStatus: 'error',
            errorMsg: '请上传图片'
          }
          bool = true
        } else {
          e.validateUpload = {
            validateStatus: 'success',
            errorMsg: ''
          }
        }
      })
      return bool
    },
    onSubmitSwiper () {
      // this.formSwiper.content = this.editorHtmlSwiper
      // this.$refs.rulesFormSwiper.validate(valid => {
      // console.log(valid)
      // if (valid) {
      if (this.onValidateSwiper()) {
        return false
      } else {
        this.dataSwiper.forEach((e, i) => {
          delete e.validate
          delete e.validateUpload
        })
        this.confirmLoading = true
        // const params = this.dataSwiper
        this.formSwiper.page_id = this.tabsActive
        this.formSwiper.list = this.dataSwiper

        const params = this.formSwiper
        if (params.permission_ids) {
          params.permission_ids = this.formSwiper.permission_ids.join(',')
        }
        this.submitAfterSwiper(params).then((res) => {
          this.confirmLoading = false
          this.getPageItemList()

          this.$Message.success(res.msg)
          this.onResetSwiper()
          this.visibleSwiper = false
        })
        // } else {
        console.log('error submit!!')
        return false
      // }
      // })
      }
    },
    submitAfterSwiper (params) {
      if (this.formSwiper.id) {
        return editPageItem(params)
      } else {
        return createPageItem(params)
      }
    },
    onResetSwiper () {
      this.dataSwiper = []
      for (let i = 0; i < 5; i++) {
        this.dataSwiper.push({
          index: i,
          title: '',
          image: '',
          jump_type: 0,
          url: '',
          mpaas_id: '',
          content: '',
          match_id: 0,
          stage_id: 0,
          student_id: 0,
          user_name: '',
          path: '',
          course_id: 0,
          jump_page_id: 0,
          validateUpload: {
            validateStatus: 'success',
            errorMsg: ''
          }
        })
      }
      this.fileListSwiper = {
        file0: [],
        file1: [],
        file2: [],
        file3: [],
        file4: []
      }
      this.formSwiper = {
        type: 'carousel',
        permission_ids: []
      }
    },
    onCloseSwiper () {
      this.onResetSwiper()
      this.visibleSwiper = false
    },
    changeSelectSwiper (value) {
      this.formSwiper.permission_ids = value
    },
    addSwiper () {
      const arrNum = []
      this.dataSwiper.forEach(e => {
        arrNum.push(e.index)
      })

      console.log(this.missingNumber(arrNum))
      this.dataSwiper.push({
        index: this.missingNumber(arrNum),
        title: '',
        image: '',
        jump_type: 0,
        url: '',
        mpaas_id: '',
        content: '',
        match_id: 0,
        stage_id: 0,
        student_id: 0,
        user_name: '',
        path: '',
        course_id: 0,
        jump_page_id: 0,
        validateUpload: {
          validateStatus: 'success',
          errorMsg: ''
        }
      })

      this.fileListSwiper['file' + this.missingNumber(arrNum)] = []
    },
    delSwiper (index) {
      const that = this
      this.$confirm({
        title: '提示',
        content: '是否要删除此轮播图？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          that.dataSwiper.forEach((e, i) => {
            if (e.index === index) {
              that.dataSwiper.splice(i, 1)
            }
          })
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    }
  }
}
