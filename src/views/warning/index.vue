<template>
  <div class="page">
    <div class="page-container" ref="pageHeight">
      <div class="table">
        <div class="table-hd">
          <el-form :inline="true" :model="form" >
            <el-form-item label="设备选择" label-width="70px">
              <el-select v-model="form.id" clearable placeholder="请选择" size="mini" @change="changeSelect">
                <el-option-group
                  v-for="group in selectOptions"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
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
          </el-form>
        </div>
        <div class="table-bd">
          <el-table
            :height="tableHeight"
            size="small"
            :data="tableData"
            >
            <el-table-column
              prop="deviceNearId"
              label="近端机ID"
              align="center">
            </el-table-column>
            <el-table-column
              prop="deviceId"
              label="远端机ID"
              align="center">
            </el-table-column>
            <!-- <el-table-column
              prop="deviceName"
              label="设备名称"
              align="center">
            </el-table-column> -->
            <el-table-column
              prop="deviceType"
              label="设备类型"
              align="center">
            </el-table-column>
            <el-table-column
              prop="warningType"
              label="报警类型"
              align="center">
              <template slot-scope="scope">
                <!-- 1 红色   2 绿色   3 黄色 -->
                 <el-tag
                  v-if="scope.row.warningColor===1"
                  size="mini"
                  type="danger"
                  >
                  {{scope.row.warningType}}
                </el-tag>
                 <el-tag
                  v-else-if="scope.row.warningColor===2"
                  size="mini"
                  type="success"
                  >
                  {{scope.row.warningType}}
                </el-tag>
                 <el-tag
                  v-else-if="scope.row.warningColor===3"
                  size="mini"
                  type="warning"
                  >
                  {{scope.row.warningType}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="报警时间"
              align="center">
            </el-table-column>
            <!-- <el-table-column
              prop="time"
              label="核销人"
              align="center">
            </el-table-column>
            <el-table-column
              prop="time"
              label="核销时间"
              align="center">
            </el-table-column> -->
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
import { getTree } from '@/api/get'
import { getWarning } from '@/api/warning'
export default {
  name: 'warning',
  mixins: [tableHeight, ws],
  data () {
    return {
      selectOptions: [{
        label: '近端机',
        options: []
      }, {
        label: '远端机',
        options: []
      }],
      pickerOptions: {
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
        id: '',
        deviceId: '',
        deviceNearId: '',
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
    this.getTree()
  },
  methods: {
    websocketonMessage (e) {
      // this.overTimeClear()
      const redata = JSON.parse(e.data)
      this.websocketonMessageAll(redata)
    },
    getTree () {
      getTree().then(res => {
        console.log(res)
        const treeData = res.data
        treeData.forEach(e => {
          this.selectOptions[0].options.push({
            label: e.near.deviceName,
            deviceId: e.near.deviceId,
            value: e.near.id,
            deviceAddress: e.near.deviceAddress,
            level: 1
          })

          e.far.forEach(o => {
            this.selectOptions[1].options.push({
              label: o.deviceName,
              deviceId: o.deviceId,
              deviceNearId: o.deviceNearId,
              value: o.deviceNearId + '-' + o.deviceId,
              deviceAddress: o.deviceAddress,
              level: 2
            })
          })
        })
      })
    },
    getTable () {
      getWarning({
        page: this.currentPage,
        size: this.pageSize,
        dateStart: this.form.dateStart,
        dateEnd: this.form.dateEnd,
        deviceId: this.form.deviceNearId,
        deviceNearId: this.form.deviceId
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
    changeSelect (o) {
      if (typeof o === 'number') {
        this.form.deviceNearId = 0
        this.form.deviceId = o
        // this.form.deviceId = o
      } else {
        const arr = o.split('-')
        console.log(arr)
        this.form.deviceNearId = arr[0]
        this.form.deviceId = arr[1]
      }
      this.pageSize = 10
      this.currentPage = 1
      this.getTable()
    }
    // clearSelect () {
    //   this.getTable()
    // }
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
