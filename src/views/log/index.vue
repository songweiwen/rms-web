<template>
  <div class="page">
    <div class="page-container" ref="pageHeight">
      <div class="table">
        <div class="table-hd">
          <el-form :inline="true" :model="form" >
            <el-form-item label="日期查询" label-width="70px">
              <el-date-picker
                class="m-l-md"
                size="mini"
                v-model="dateSelect"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="submitForm">增加</el-button>
            </el-form-item> -->
          <el-button icon="el-icon-download" type="success" class="pull-right m-t-sm" @click="exportExcel" size="mini">
            导出Excel
          </el-button>
          </el-form>
        </div>
        <div class="table-bd">
          <el-table
            :height="tableHeight"
            size="small"
            :data="tableData"
            >
            <el-table-column
              prop="username"
              label="操作用户"
              align="center">
            </el-table-column>
            <el-table-column
              prop="content"
              label="操作内容"
              align="center">
            </el-table-column>
            <!-- <el-table-column
              prop="deviceName"
              label="设备名称"
              align="center">
            </el-table-column> -->
            <el-table-column
              prop="configTime"
              label="操作时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="level"
              label="操作级别"
              align="center">
              <!-- level  1级红色吧   2级橙色  3级绿色 -->
              <template slot-scope="scope">
                 <el-tag
                  v-if="scope.row.level===1"
                  size="mini"
                  type="danger"
                  >
                  {{scope.row.level}}
                </el-tag>
                 <el-tag
                  v-else-if="scope.row.level===2"
                  size="mini"
                  type="warning"
                  >
                  {{scope.row.level}}
                </el-tag>
                 <el-tag
                  v-else-if="scope.row.level===3"
                  size="mini"
                  type="success"
                  >
                  {{scope.row.level}}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { formatDate } from '@/utils/utils'
import { ws } from '@/mixins/webSocket'
import { tableHeight } from '@/mixins/tableHeight'
import { getLog } from '@/api/log'
export default {
  name: 'log',
  mixins: [tableHeight, ws],
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() // 选当前时间之前的时间
        },
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一年',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dateSelect: '',
      // deviceId: '',
      form: {
        dateStart: '',
        dateEnd: ''
      },
      pageHeight: 500,
      treeData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.setTableHeight(130, 'pageHeight')
      setTimeout(() => {
        this.$webSocket.getWebSocket().onmessage = this.websocketonMessage
      }, 1000)
    })
    this.getTable()
  },
  methods: {
    websocketonMessage (e) {
      // this.overTimeClear()
      const redata = JSON.parse(e.data)
      this.websocketonMessageAll(redata)
    },
    getTable () {
      getLog({
        page: this.currentPage,
        size: this.pageSize,
        dateStart: this.form.dateStart,
        dateEnd: this.form.dateEnd
      }).then(res => {
        const data = res.data
        console.log(data)
        this.tableData = data.list
        this.total = data.total
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getTable()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTable()
      console.log(`当前页: ${val}`)
    },
    exportExcel () {
      getLog({
        page: this.currentPage,
        size: this.pageSize,
        dateStart: this.form.dateStart,
        dateEnd: this.form.dateEnd
      })
        .then((res) => {
          // console.log(res)
          if (res.code !== '200') {
            this.$message({
              message: '导出失败',
              type: 'warning'
            })
            return false
          } else {
            this.$message({
              message: res.msg,
              type: 'success'
            })
          }
          const a = document.createElement('a')
          a.href = res.path
          a.download = this.form.dateStart + '-' + this.form.dateEnd + ' 操作日志.xls'
          a.click()
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  watch: {
    dateSelect (val) {
      if (val) {
        this.form.dateStart = formatDate('yyyy-MM-dd', new Date(val[0]))
        this.form.dateEnd = formatDate('yyyy-MM-dd', new Date(val[1]))
      } else {
        this.form.dateStart = ''
        this.form.dateEnd = ''
      }
      // if (this.form.dateStart)
      this.pageSize = 10
      this.currentPage = 1
      // if (this.form.dateEnd)
      this.getTable()
    }
    // form: {
    //   handler (newVal, oldVal) {
    //   },
    //   deep: true
    // }
  }
}
</script>
