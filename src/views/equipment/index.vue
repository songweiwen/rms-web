<template>
  <div class="page">
    <!-- <el-button v-if="notifyList.length !== 0" type="primary" class="closeNotify" @click="closeNotify">
      一键关闭
    </el-button> -->
    <div class="page-container page-tabs" ref="pageHeight">
      <el-tabs type="border-card">
        <el-tab-pane label="近端机设备">
          <div class="table">
            <div class="table-hd">
              <el-button type="primary" icon="el-icon-plus" @click="addVisible=true">增加</el-button>
            </div>
            <div class="table-bd">
              <el-table
                :height="tableHeight"
                size="small"
                :data="tableData"
                >
                <el-table-column
                  prop="deviceId"
                  label="设备ID"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="deviceName"
                  label="设备名称"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="deviceAddress"
                  label="安装位置"
                  align="center">
                </el-table-column>
                <!-- <el-table-column
                  prop="deviceIp"
                  label="IP地址"
                  align="center">
                </el-table-column> -->
                <el-table-column
                  prop="devicePort"
                  label="IP及端口号"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="deviceTime"
                  label="更新时间"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="300"
                  align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      @click="handleEdit(scope.row)"
                      >修改</el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      @click="handleDelete(scope.row.id)"
                      >删除</el-button>
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

        </el-tab-pane>
        <el-tab-pane label="远端机设备">
          <div class="table">
            <div class="table-hd">
              <el-button type="primary" icon="el-icon-plus" @click="addVisibleFar=true">增加</el-button>
            </div>
            <div class="table-bd">
              <el-table
                :height="tableHeight"
                size="small"
                :data="tableDataFar"
                >
                <el-table-column
                  prop="deviceId"
                  label="设备ID"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="deviceName"
                  label="设备名称"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="deviceAddress"
                  label="安装位置"
                  align="center">
                </el-table-column>
                <!-- <el-table-column
                  prop="deviceIp"
                  label="IP地址"
                  align="center">
                </el-table-column> -->
                <!-- <el-table-column
                  prop="devicePort"
                  label="IP及端口号"
                  align="center">
                </el-table-column> -->
                <el-table-column
                  prop="deviceTime"
                  label="更新时间"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="300"
                  align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      @click="handleEditFar(scope.row)"
                      >修改</el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      @click="handleDeleteFar(scope.row.id)"
                      >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-pagination">
                <el-pagination
                  @size-change="handleSizeChangeFar"
                  @current-change="handleCurrentChangeFar"
                  :current-page="currentPageFar"
                  :page-size="pageSizeFar"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- id   名字   地址   描述   -->
    <el-dialog title="新增近端机" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addRuleForm">
        <el-form-item label="设备ID" prop="deviceId" label-width="120px">
          <el-input v-model.number="addForm.deviceId" placeholder="请输入设备ID"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName" label-width="120px">
          <el-input v-model="addForm.deviceName" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="deviceIp" label-width="120px">
          <el-input v-model="addForm.deviceIp" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port" label-width="120px">
          <el-input v-model.number="addForm.port" placeholder="请输入端口号"></el-input>
        </el-form-item>
        <el-form-item label="安装位置" prop="deviceAddress" label-width="120px">
          <el-input v-model="addForm.deviceAddress" placeholder="请输入安装位置"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="deviceDescribe" label-width="120px">
          <el-input v-model="addForm.deviceDescribe" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm('addRuleForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="addSubmitForm('addRuleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 名称（数据库）、地址（数据库）、收光功率（数据库+ws) -->
    <el-dialog title="修改近端机" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="editRules" ref="editRuleForm">
        <el-form-item label="设备ID" prop="deviceId" label-width="120px">
          <el-input v-model="editForm.deviceId" placeholder="请输入设备ID" disabled></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName" label-width="120px">
          <el-input v-model="editForm.deviceName" placeholder="请输入设备名字"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="deviceIp" label-width="120px">
          <el-input v-model="editForm.deviceIp" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port" label-width="120px">
          <el-input v-model.number="editForm.port" placeholder="请输入端口号"></el-input>
        </el-form-item>
        <el-form-item label="安装位置" prop="deviceAddress" label-width="120px">
          <el-input v-model="editForm.deviceAddress" placeholder="请输入安装位置"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="deviceDescribe" label-width="120px">
          <el-input v-model="editForm.deviceDescribe" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm('editRuleForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="editSubmitForm('editRuleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增远端机" :visible.sync="addVisibleFar">
      <el-form :model="addFormFar" :rules="addRules" ref="addRuleFormFar">
        <el-form-item label="设备ID" prop="deviceId" label-width="120px">
          <el-input v-model.number="addFormFar.deviceId" placeholder="请输入设备ID"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName" label-width="120px">
          <el-input v-model="addFormFar.deviceName" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="归属于近端机" prop="deviceNearId" label-width="120px">
          <el-select v-model="addFormFar.deviceNearId" placeholder="请选择近端机">
            <el-option
              v-for="item in treeData"
              :key="item.deviceId"
              :label="item.deviceName"
              :value="item.deviceId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装位置" prop="deviceAddress" label-width="120px">
          <el-input v-model="addFormFar.deviceAddress" placeholder="请输入安装位置"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="deviceDescribe" label-width="120px">
          <el-input v-model="addFormFar.deviceDescribe" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm('addRuleFormFar')">取 消</el-button>
        <el-button size="small" type="primary" @click="addSubmitFormFar('addRuleFormFar')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改远端机" :visible.sync="editVisibleFar">
      <el-form :model="editFormFar" :rules="editRules" ref="editRuleFormFar">
        <el-form-item label="设备ID" prop="deviceId" label-width="120px">
          <el-input v-model="editFormFar.deviceId" placeholder="请输入设备ID" disabled></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName" label-width="120px">
          <el-input v-model="editFormFar.deviceName" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="归属于近端机" prop="deviceNearId" label-width="120px">
          <el-select v-model="editFormFar.deviceNearId" placeholder="请选择近端机">
            <el-option
              v-for="item in treeData"
              :key="item.deviceId"
              :label="item.deviceName"
              :value="item.deviceId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装位置" prop="deviceAddress" label-width="120px">
          <el-input v-model="editFormFar.deviceAddress" placeholder="请输入安装位置"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="deviceDescribe" label-width="120px">
          <el-input v-model="editFormFar.deviceDescribe" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm('editRuleFormFar')">取 消</el-button>
        <el-button size="small" type="primary" @click="editSubmitFormFar('editRuleFormFar')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ws } from '@/mixins/webSocket'
import { tableHeight } from '@/mixins/tableHeight'
import { getTree } from '@/api/get'
import { listNear, listFar, addNear, editNear, delNear, addFar, editFar, delFar } from '@/api/equipment'
export default {
  name: 'equipment',
  mixins: [tableHeight, ws],
  data () {
    var validateIp = (rule, value, callback) => {
      var util = {
        isValidIp: function (e) {
          return /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(e)
        }
      }

      if (value === '') {
        callback(new Error('请输入IP地址'))
      } else if (!util.isValidIp(value)) {
        callback(new Error('请输入正确的IP地址!'))
      } else {
        callback()
      }
    }

    var deviceId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入设备ID'))
      } else if (value > 255 || value < 0) {
        callback(new Error('请输入设备ID最大255!'))
      } else {
        callback()
      }
    }
    return {
      pageHeight: 500,
      treeData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: [],
      pageSizeFar: 10,
      currentPageFar: 1,
      totalFar: 0,
      tableDataFar: [],
      addRules: {
        deviceId: [
          { required: true, validator: deviceId, trigger: 'blur' },
          { required: true, message: '请输入设备ID', trigger: 'blur' },
          { type: 'number', message: '设备ID必须为数字值', trigger: 'blur' }
        ],
        deviceName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        deviceIp: [
          { required: true, validator: validateIp, trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入端口号', trigger: 'blur' },
          { type: 'number', message: '端口号必须为数字值', trigger: 'blur' }
        ],
        deviceNearId: [
          { required: true, message: '请选择近端机', trigger: 'change' }
        ]
      },
      editRules: {
        deviceId: [
          { required: true, validator: deviceId, trigger: 'blur' },
          { required: true, message: '请输入设备ID', trigger: 'blur' },
          { type: 'number', message: '设备ID必须为数字值', trigger: 'blur' }
        ],
        deviceName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        deviceNearId: [
          { required: true, message: '请选择近端机', trigger: 'change' }
        ]
      },
      addVisible: false,
      addVisibleFar: false,
      addForm: {
        deviceId: '',
        deviceName: '',
        deviceIp: '',
        port: '',
        deviceAddress: '',
        deviceDescribe: ''
      },
      addFormFar: {
        deviceId: '',
        deviceName: '',
        deviceNearId: '',
        deviceAddress: '',
        deviceDescribe: ''
      },
      editVisible: false,
      editVisibleFar: false,
      editForm: {
        deviceId: '',
        deviceName: '',
        deviceIp: '',
        port: '',
        deviceAddress: '',
        deviceDescribe: ''
      },
      editFormFar: {
        deviceId: '',
        deviceName: '',
        deviceNearId: '',
        deviceAddress: '',
        deviceDescribe: ''
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.setTableHeight(163, 'pageHeight')
      setTimeout(() => {
        this.$webSocket.getWebSocket().onmessage = this.websocketonMessage
      }, 1000)
    })
    this.getTable()
    this.getTableFar()
    this.getTree()
  },
  methods: {
    websocketonMessage (e) {
      // this.overTimeClear()
      const redata = JSON.parse(e.data)
      this.websocketonMessageAll(redata)
    },
    getTree () {
      this.treeData = []
      getTree().then(res => {
        console.log(res)
        const treeData = res.data
        treeData.forEach(e => {
          this.treeData.push({
            deviceName: e.near.deviceName,
            deviceId: e.near.deviceId,
            id: e.near.id,
            deviceAddress: e.near.deviceAddress,
            level: 1,
            children: e.far
          })
        })
      })
    },
    // ========== 近
    getTable () {
      listNear({
        page: this.currentPage,
        size: this.pageSize
      }).then(res => {
        const data = res.data
        console.log(data)
        this.tableData = data.list
        this.total = data.total
        this.getTree()
      })
    },
    handleEdit (item) {
      this.editVisible = true
      this.editForm = item
    },
    handleDelete (id) {
      this.$confirm('是否要删除此近端机？', '提示', {
        type: 'error'
      }).then(() => {
        delNear({
          id: id
        }).then(res => {
          const data = res.data
          console.log(data)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getTable()
        })
      }).catch(() => {
        // 点击确定的操作(调用接口)
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
    addSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addNear(this.addForm)
            .then(res => {
              const data = res.data
              console.log(data)
              this.$message({
                message: '添加成功', // res.message
                type: 'success'
              })
              this.resetForm('addRuleForm')
              this.getTable()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editNear({
            // 添加近端机 参数 deviceId  i       nt
            // deviceName  string
            // deviceAddress  string  可以为空
            // deviceDescribe  string 可以为空
            id: this.editForm.id,
            deviceId: this.editForm.deviceId,
            deviceName: this.editForm.deviceName,
            deviceAddress: this.editForm.deviceAddress,
            deviceDescribe: this.editForm.deviceDescribe,
            deviceIp: this.editForm.deviceIp,
            port: this.editForm.port
          }).then(res => {
            const data = res.data
            console.log(data)
            this.$message({
              message: '修改成功', // res.message
              type: 'success'
            })
            this.resetForm('editRuleForm')
            this.getTable()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // ========== 远
    getTableFar () {
      listFar({
        page: this.currentPageFar,
        size: this.pageSizeFar
      }).then(res => {
        const data = res.data
        console.log(data)
        this.tableDataFar = data.list
        this.totalFar = data.total
      })
    },
    handleEditFar (item) {
      this.editVisibleFar = true
      this.editFormFar = item
    },
    handleDeleteFar (id) {
      this.$confirm('是否要删除此远端机？', '提示', {
        type: 'error'
      }).then(() => {
        delFar({
          id: id
        }).then(res => {
          const data = res.data
          console.log(data)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getTableFar()
        })
      }).catch(() => {
        // 点击确定的操作(调用接口)
      })
    },
    handleSizeChangeFar (val) {
      this.pageSizeFar = val
      this.getTableFar()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChangeFar (val) {
      this.currentPageFar = val
      this.getTableFar()
      console.log(`当前页: ${val}`)
    },
    addSubmitFormFar (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addFar(this.addFormFar)
            .then(res => {
              const data = res.data
              console.log(data)
              this.$message({
                message: '添加成功', // res.message
                type: 'success'
              })
              this.resetForm('addRuleFormFar')
              this.getTableFar()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editSubmitFormFar (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editFar({
            id: this.editFormFar.id,
            deviceId: this.editFormFar.deviceId,
            deviceName: this.editFormFar.deviceName,
            deviceNearId: this.editFormFar.deviceNearId,
            deviceAddress: this.editFormFar.deviceAddress,
            deviceDescribe: this.editFormFar.deviceDescribe
          }).then(res => {
            const data = res.data
            console.log(data)
            this.$message({
              message: '修改成功', // res.message
              type: 'success'
            })
            this.resetForm('editRuleFormFar')
            this.getTableFar()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // ==========
    resetForm (formName) {
      this.addVisible = false
      this.editVisible = false
      this.addVisibleFar = false
      this.editVisibleFar = false
      this.$refs[formName].resetFields()
    }
  }
  // beforeRouteLeave (to, form, next) {
  //   this.closeNotify()
  //   next()
  // }
}
</script>
