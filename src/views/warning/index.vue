<template>
  <div class="page">
    <div class="page-container" ref="pageHeight">
      <div class="table">
        <div class="table-hd">
          <el-form :inline="true" :model="form" >
            <el-form-item label="近端机" label-width="70px">
              <el-select v-model="form.deviceNearId" placeholder="请选择" size="mini" @change="changeSelect" style="width: 120px;">
                <el-option
                  v-for="group in selectOptions"
                  :key="group.value"
                  :value="group.deviceId"
                  :label="group.label"
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="远端机" label-width="70px">
              <el-select v-model="form.deviceId" placeholder="请选择" size="mini" @change="changeSelectFar" style="width: 120px;">
                <el-option
                  v-for="(item, key) in selectOptionsFar"
                  :key="key"
                  :label="item.label"
                  :value="item.deviceId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="报警类型" label-width="70px">
              <el-select v-model="form.warningType" placeholder="请选择" size="mini" @change="changeTable" style="width: 100px;">
                <el-option
                  v-for="(item, key) in warningOptions"
                  :key="key"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期查询" label-width="70px">
              <el-date-picker
                class="demonstration"
                size="mini"
                v-model="dateSelect"
                type="datetimerange"
                align="right"
                unlink-panels
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']">
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="submitForm">增加</el-button>
            </el-form-item> -->
            <el-button icon="el-icon-download" type="success" class="pull-right m-t-sm" @click="exportExcel">
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
      deviceOptions: [{
        label: '近端机'
      },
      {
        label: '远端机'
      }],
      warningOptions: [{
        label: '全部'
      }, {
        label: '故障恢复'
      }, {
        label: '故障告警'
      }
      ],
      selectOptions: [
        {
          label: '全部',
          deviceId: '',
          level: 1
        }
      ],
      selectOptionsFar: [
        {
          label: '全部',
          deviceId: '',
          level: 2
        }
      ],
      // , {
      //   label: '远端机',
      //   options: []
      // }
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
      dateSelect: [new Date(new Date(new Date().toLocaleDateString()).getTime()), new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)],
      // deviceId: '',
      form: {
        id: '',
        deviceId: '',
        deviceNearId: '',
        dateStart: '',
        dateEnd: '',
        deviceType: '',
        warningType: '全部'
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
    this.form.dateStart = formatDate('yyyy-MM-dd hh:mm:ss', new Date(new Date(new Date().toLocaleDateString()).getTime()))
    this.form.dateEnd = formatDate('yyyy-MM-dd hh:mm:ss', new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1))
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
        this.treeData = treeData
        treeData.forEach(e => {
          this.selectOptions.push({
            label: e.near.deviceName,
            deviceId: e.near.deviceId,
            value: e.near.id,
            deviceAddress: e.near.deviceAddress,
            level: 1
          })

          // e.far.forEach(o => {
          //   this.selectOptions[1].options.push({
          //     label: o.deviceName,
          //     deviceId: o.deviceId,
          //     deviceNearId: o.deviceNearId,
          //     value: o.deviceNearId + '-' + o.deviceId,
          //     deviceAddress: o.deviceAddress,
          //     level: 2
          //   })
          // })
        })
      })
    },
    getTable () {
      getWarning({
        page: this.currentPage,
        size: this.pageSize,
        dateStart: this.form.dateStart,
        dateEnd: this.form.dateEnd,
        deviceId: this.form.deviceId,
        deviceNearId: this.form.deviceNearId,
        // deviceType: this.form.deviceType,
        warningType: this.form.warningType
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
    changeSelect (id) {
      console.log(id)
      this.form.deviceNearId = id
      // if (typeof o === 'number') {
      //   this.form.deviceNearId = 0
      //   this.form.deviceId = o
      //   // this.form.deviceId = o
      // } else {
      //   const arr = o.split('-')
      //   console.log(arr)
      //   this.form.deviceNearId = arr[0]
      //   this.form.deviceId = arr[1]
      // }
      this.selectOptionsFar = [{
        label: '全部',
        deviceId: '',
        level: 2
      }]
      this.treeData.forEach(e => {
        console.log(e.near.deviceNearId, id)
        if (e.near.deviceId === id) {
          e.far.forEach(o => {
            this.selectOptionsFar.push({
              label: o.deviceName,
              deviceId: o.deviceId,
              deviceNearId: o.deviceNearId,
              // value: o.deviceNearId + '-' + o.deviceId,
              deviceAddress: o.deviceAddress,
              level: 2
            })
          })
        }
      })

      this.pageSize = 10
      this.currentPage = 1
      this.getTable()
    },
    changeSelectFar (id) {
      console.log(id)
      this.form.deviceId = id
      this.pageSize = 10
      this.currentPage = 1
      this.getTable()
    },
    changeTable () {
      this.pageSize = 10
      this.currentPage = 1
      this.getTable()
    },
    exportExcel () {
      // getWarning({
      //   page: this.currentPage,
      //   size: this.pageSize,
      //   dateStart: this.form.dateStart,
      //   dateEnd: this.form.dateEnd,
      //   deviceId: this.form.deviceNearId,
      //   deviceNearId: this.form.deviceId,
      //   deviceType: this.form.deviceType,
      //   warningType: this.form.warningType
      // })
      this.$axios
        .get(
          process.env.VUE_APP_BASE_API + '/rms/warning/download',
          {
            params: {
              // page: this.currentPage,
              // size: this.pageSize
              dateStart: this.form.dateStart,
              dateEnd: this.form.dateEnd,
              deviceId: this.form.deviceId,
              deviceNearId: this.form.deviceNearId,
              // deviceType: this.form.deviceType,
              warningType: this.form.warningType
            },
            responseType: 'blob',
            headers: {
              'content-type': 'application/json',
              Authorization: this.$Cookies.get('access_token') // token换成从缓存获取
            }
          }
        )
        .then((res) => {
          function getCaption (obj) {
            var index = obj.lastIndexOf('=')
            obj = obj.substring(index + 1, obj.length)
            // console.log(obj);
            return obj
          }
          const name = getCaption(res.headers['content-disposition'])
          console.log(name)
          const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' }) // 构造一个blob对象来处理数据
          const fileName = name // 导出文件名
          const elink = document.createElement('a') // 创建a标签
          elink.download = '故障管理 ' + fileName // a标签添加属性
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click() // 执行下载
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink) // 释放标签
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  watch: {
    dateSelect (val) {
      if (val) {
        this.form.dateStart = formatDate('yyyy-MM-dd hh:mm:ss', new Date(val[0]))
        this.form.dateEnd = formatDate('yyyy-MM-dd hh:mm:ss', new Date(val[1]))
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
