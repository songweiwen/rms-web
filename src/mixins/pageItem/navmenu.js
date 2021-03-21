
// 添加修改视频
import { createPageItem, editPageItem } from '@/api/home'
export const settingnNavmenu = {
  data () {
    return {
      visibleNavmenu: false,
      editorHtmlNavmenu: '',
      formNavmenu: {
        type: 'menu',
        page_id: '',
        permission_ids: []
      },
      // 导航菜单
      columnsNavmenu: [
        {
          title: '排序',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'indexNav' }
        },
        {
          title: '菜单标题',
          dataIndex: 'titleNav',
          key: 'title',
          align: 'center',
          width: 300,
          scopedSlots: { customRender: 'titleNav' }
        },
        {
          title: '导航菜单背景图',
          dataIndex: 'icon',
          key: 'icon',
          align: 'center',
          width: 200,
          scopedSlots: { customRender: 'icon' }
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
          key: 'indexNavEdit',
          align: 'center',
          width: 300,
          scopedSlots: { customRender: 'indexNavEdit' }
        }
      ],
      dataNavmenu: [],
      uploadIndexNavmenu: 0,
      fileListNavmenu: {
        file0: [],
        file1: [],
        file2: [],
        file3: []
        // file4: []
      }
    }
  },
  created () {
    this.onResetNavmenu()
  },
  methods: {
    navmenuDrag () {
      // 首先获取需要拖拽的dom节点
      const el1 = document.querySelectorAll('#tableNavmenu .ant-table-tbody')[0]
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
          const arr = this.dataNavmenu // 获取表数据
          arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]) // 数据处理
          this.$nextTick(function () {
            this.dataNavmenu = arr
            // this.dataNavmenu.forEach((e, i) => {
            //   e.index = i
            // })
          })
        }
      })
    },
    getEditorNavmenu (val) {
      this.editorHtmlNavmenu = val
    },
    openNavmenu () {
      // this.dataNavmenu.forEach(e => {
      //   e.page_id = this.tabsActive
      // })
      this.visibleNavmenu = true
      setTimeout(() => {
        this.navmenuDrag()
      }, 1000)
    },
    updateTypeNavmenu (val) {
      console.log(val)
      this.dataNavmenu.forEach((e, i) => {
        if (e.index === this.uploadIndexNavmenu) {
          e.jump_type = val
          // this.$set(this.dataNavmenu[i], 'jump_type', val)
        }
      })
      const arr = this.dataNavmenu.reverse().reverse()
      this.dataNavmenu = arr
      // this.dataNavmenu[this.uploadIndexNavmenu].jump_type = val
    },
    updateFormNavmenu (val) {
      console.log(val)
      this.dataNavmenu.forEach(e => {
        if (e.index === val.index) {
          e = Object.assign(e, val)
        }
      })
    },
    beforeUploadNavmenu (item) {
      this.uploadIndexNavmenu = item.index
    },
    uploadNavmenu (file) {
      this.customRequest(file)
        .then((res) => {
          console.log(res)
          const data = res.data
          this.dataNavmenu.forEach((e, i) => {
            if (e.index === this.uploadIndexNavmenu) {
              e.icon = data.src
              // e.validateUpload = {
              //   validateStatus: 'success',
              //   errorMsg: ''
              // }
            }
          })
          // this.changeValidate()
          // this.dataNavmenu[this.uploadIndexNavmenu].icon = data.src
        })
    },
    uploadChangeNavmenu (info) {
      console.log(info)
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      this.fileListNavmenu['file' + this.uploadIndexNavmenu] = fileList
    },
    changeValidateNavmenu (index) {
      this.dataNavmenu.forEach(e => {
        if (e.index === index) {
          if (!e.title) {
            e.validate = {
              validateStatus: 'error',
              errorMsg: '请输入菜单标题'
            }
          } else {
            e.validate = {
              validateStatus: 'success',
              errorMsg: ''
            }
          }
        }
      })
    },
    onValidateNavmenu () {
      let bool = false
      this.dataNavmenu.forEach((e, i) => {
        console.log(e)
        if (!e.title) {
          e.validate = {
            validateStatus: 'error',
            errorMsg: '请输入菜单标题'
          }
          bool = true
        } else {
          e.validate = {
            validateStatus: 'success',
            errorMsg: ''
          }
        }
      })

      this.dataNavmenu.forEach((e, i) => {
        console.log(e)
        if (!e.icon) {
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
    onSubmitNavmenu () {
      // this.formNavmenu.content = this.editorHtmlNavmenu
      // this.$refs.rulesFormNavmenu.validate(valid => {
      // console.log(valid)
      // if (valid) {
      if (this.onValidateNavmenu()) {
        return false
      } else {
        this.dataNavmenu.forEach((e, i) => {
          delete e.validate
          delete e.validateUpload
        })
        this.confirmLoading = true
        this.formNavmenu.page_id = this.tabsActive
        this.formNavmenu.list = this.dataNavmenu

        const params = this.formNavmenu
        if (params.permission_ids) {
          params.permission_ids = this.formNavmenu.permission_ids.join(',')
        }
        this.submitAfterNavmenu(params)
          .then((res) => {
            this.confirmLoading = false
            this.getPageItemList()

            this.$Message.success(res.msg)
            this.onResetNavmenu()
            this.visibleNavmenu = false
          })
        console.log('error submit!!')
        return false
      }
    },
    submitAfterNavmenu (params) {
      if (this.formNavmenu.id) {
        return editPageItem(params)
      } else {
        return createPageItem(params)
      }
    },
    onResetNavmenu () {
      this.dataNavmenu = []
      for (let i = 0; i < 5; i++) {
        this.dataNavmenu.push({
          index: i,
          title: '',
          icon: '',
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
          validate: {
            validateStatus: 'success',
            errorMsg: ''
          },
          validateUpload: {
            validateStatus: 'success',
            errorMsg: ''
          }
        })
      }
      this.fileListNavmenu = {
        file0: [],
        file1: [],
        file2: [],
        file3: []
      }
      this.formNavmenu = {
        type: 'menu',
        permission_ids: []
      }
    },
    onCloseNavmenu () {
      this.onResetNavmenu()
      this.visibleNavmenu = false
    },
    changeSelectNavmenu (value) {
      this.formNavmenu.permission_ids = value
    },
    missingNumber (nums) {
      let n = 0; const len = nums.length
      for (let i = 0; i < len; i++) {
        n += nums[i]
      }
      return (1 + len) * (len / 2) - n
    },
    addNavmenu () {
      const arrNum = []
      this.dataNavmenu.forEach(e => {
        arrNum.push(e.index)
      })

      console.log(this.missingNumber(arrNum))
      this.dataNavmenu.push({
        index: this.missingNumber(arrNum),
        title: '',
        icon: '',
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
        validate: {
          validateStatus: 'success',
          errorMsg: ''
        },
        validateUpload: {
          validateStatus: 'success',
          errorMsg: ''
        }
      })

      this.fileListNavmenu['file' + this.missingNumber(arrNum)] = []
    },
    delNavmenu (index) {
      const that = this
      this.$confirm({
        title: '提示',
        content: '是否要删除此导航菜单？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          that.dataNavmenu.forEach((e, i) => {
            if (e.index === index) {
              that.dataNavmenu.splice(i, 1)
            }
          })
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    }
  },
  watch: {
    dataNavmenu: {
      deep: true,
      handler: function (newV, oldV) {
        console.log('watch中：', newV)
      }
    }
  }
}
