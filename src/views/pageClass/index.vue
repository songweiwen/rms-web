<template>
  <div class="page">
    <div class="page-container" ref="pageHeight">
      <div class="table">
        <div class="table-hd text-right">
          <a-space>
            <a-button type="primary" icon="plus" @click="openVisible">
              添加分类
            </a-button>
          </a-space>
        </div>
        <div class="table-bd">
            <!-- @change="changeCurrentList" -->
            <!-- :pagination="paginationList" -->
          <a-table
            id="table"
            :columns="columnsList"
            :data-source="list"
            :pagination="false"
            :scroll="{ y: tableHeight, scrollToFirstRowOnChange: false }"
            align="center"
            rowKey="id">
            <span slot="id" slot-scope="id, record">
              <a-button
                type="primary"
                size="small"
                @click="tableRowEdit(record)">
                <a-icon type="edit" />
                编辑
              </a-button>
              <a-divider v-if="id!==1" type="vertical" />
              <a-button v-if="id!==1" type="danger" size="small" @click="tableRowDel(id)">
                <a-icon type="delete" />
                删除
              </a-button>
            </span>
          </a-table>
        </div>
      </div>
    </div>
    <a-modal
      :width="600"
      title="编辑分类"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      ok-text="保存"
      @ok="onSubmit"
      @cancel="onCloseVisible"
    >
      <div class="modal">
        <div class="modal-bd">
          <a-form-model
            ref="ruleform"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item :required="true" label="名称(中文)" prop="title" placeholder="请输入名称">
              <a-input v-model="form.title" />
            </a-form-model-item>
            <a-form-model-item :required="true" label="关键字(英文字母)" prop="name" placeholder="请输入关键字">
              <a-input v-model="form.name" />
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { pageSelect } from '@/api/get'
import { pageCreate, pageUpdate, delPage } from '@/api/pageClass'
import { tableHeight } from '@/mixins/tableHeight'
// import vuedraggable from 'vuedraggable'
export default {
  name: 'pageClass',
  mixins: [
    tableHeight
  ],
  data () {
    const regZH = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入名称'))
      } else if (value) {
        const myReg = /[^\u4e00-\u9fa5]/
        if (myReg.test(value)) { //
          callback(new Error('提示: 请输入中文'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const regEN = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入关键字'))
      } else if (value) {
        const myReg = new RegExp('^[a-zA-Z]+$')// 纯英文
        if (!(myReg.test(value))) { //
          callback(new Error('提示: 请输入纯英文'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    return {
      paginationList: {
        disabled: true,
        current: 1,
        total: 0,
        pageSize: 20,
        // showSizeChanger: true,
        // showQuickJumper: true,
        // pageSizeOptions: ['10', '20', '50', '100'], // 每页中显示的数据
        showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
      },
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      visible: false,
      rules: {
        title: [
          { validator: regZH, trigger: 'change' }
        ],
        name: [
          { validator: regEN, trigger: 'change' }
        ]
      },
      form: {
        name: '',
        title: ''
      },
      confirmLoading: false,
      columnsList: [
        // {
        //   width: 80,
        //   // fixed: 'left',
        //   title: '排序',
        //   dataIndex: 'sort',
        //   key: 'sort',
        //   align: 'center',
        //   scopedSlots: { customRender: 'sort' }
        // },
        {
          title: '分类名称',
          dataIndex: 'title',
          key: 'title',
          scopedSlots: { customRender: 'title' },
          align: 'center'
        },
        {
          title: '关键字',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' },
          align: 'center'
        },
        {
          width: 200,
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          scopedSlots: { customRender: 'id' },
          align: 'center'
        }
      ],
      list: []
    }
  },
  mounted () {
    this.getPageClassList()
    this.$nextTick(() => {
      this.setTableHeight(100, 'pageHeight')
    })
  },
  methods: {
    getPageClassList () {
      // {
      // page_id: this.tabsActive,
      // limit: this.paginationList.pageSize,
      // page: this.paginationList.current
    // }
      pageSelect().then(res => {
        const data = res.data
        this.list = data
        // this.paginationList.total = res.count
        // this.tableRowDrag()
      })
    },
    changeCurrentList (pagination, filters, sorter, { currentDataSource }) {
      // console.log(pagination, filters, sorter, { currentDataSource })
      this.paginationList = pagination
      this.getPageClassList()
    },
    tableRowDrag () {
      // 首先获取需要拖拽的dom节点
      const el1 = document.querySelectorAll('#table .ant-table-tbody')[0]
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
          const arr = this.list // 获取表数据
          arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]) // 数据处理
          this.$nextTick(function () {
            this.list = arr
          })
        }
      })
    },
    tableRowDel (id) {
      const that = this
      this.$confirm({
        title: '提示',
        content: '是否要删除此分类？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          // // console.log('OK')
          // that.data.forEach((e, i) => {
          //   if (e.id === id) {
          //     that.data.splice(i, 1)
          //   }
          // })
          delPage({
            id: id
          }).then(res => {
            that.$Message.success(res.msg)
            that.getPageClassList()
          })
          console.log(id)
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    openVisible (id, index) {
      console.log(id, index)
      this.visible = true
    },
    uploadArticle (file) {
      this.customRequest(file).then((res) => {
        console.log(res)
      })
    },
    tableRowEdit (item) {
      console.log(item)
      this.visible = true
      this.form = item
      // this
    },
    onSubmit () {
      this.$refs.ruleform.validate(valid => {
        console.log(valid)
        if (valid) {
          this.confirmLoading = true
          if (this.form.id) {
            pageUpdate(this.form)
              .then(res => {
                this.confirmLoading = false
                this.visible = false
                this.$Message.success(res.msg)
                this.getPageClassList()
                this.resetForm()
              })
          } else {
            pageCreate(this.form)
              .then(res => {
                this.confirmLoading = false
                this.visible = false
                this.$Message.success(res.msg)
                this.getPageClassList()
                this.resetForm()
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCloseVisible () {
      this.visible = false
      this.resetForm()
    },
    resetForm () {
      this.form = {
        name: '',
        title: ''
      }
    }
  },
  watch: {
  }
}
</script>
