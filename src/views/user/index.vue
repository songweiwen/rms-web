<template>
  <div class="page">
    <!-- <el-button v-if="notifyList.length !== 0" type="primary" class="closeNotify" @click="closeNotify">
      一键关闭
    </el-button> -->
    <div class="page-container page-tabs page-tabs--h" ref="pageHeight">
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">
          <div class="table">
            <div class="table-hd">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="addVisible=true">增加</el-button>
              <!-- <el-button type="danger" size="mini">删除</el-button> -->
              <!-- <el-button type="warning" size="mini">角色详情</el-button> -->
              <!-- <el-button type="danger" icon="el-icon-setting" size="mini">线路权限</el-button> -->
              <!-- <el-button type="danger" size="mini">快速续期（30天）</el-button> -->
            </div>
            <div class="table-bd">
              <el-table
                :height="tableHeight"
                size="small"
                :data="tableData"
                >
                <!-- <el-table-column
                  type="selection"
                  width="55">
                </el-table-column> -->
                <el-table-column
                  prop="userName"
                  label="用户名"
                  align="center">
                </el-table-column>
                <!-- <el-table-column
                  prop="userTime"
                  label="有效期"
                  align="center">
                </el-table-column> -->
                <el-table-column
                  prop="userAdmin"
                  label="管理权限"
                  align="center">
                  <template slot-scope="scope">
                    <!-- 1 全部 2 普通 3 查看 -->
                    <!-- {{scope.row}} -->
                    <el-dropdown>
                      <el-button type="primary" size="mini" v-if="scope.row.userAdmin==='1'">
                          全部
                      </el-button>
                      <el-button type="warning" size="mini" v-else-if="scope.row.userAdmin==='2'">
                          普通
                      </el-button>
                      <el-button type="success" size="mini" v-else-if="scope.row.userAdmin==='3'">
                          查看
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="updateAuth(scope.row, 1)">全部</el-dropdown-item>
                        <el-dropdown-item @click.native="updateAuth(scope.row, 2)">普通</el-dropdown-item>
                        <el-dropdown-item @click.native="updateAuth(scope.row, 3)">查看</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="userRole"
                  label="角色"
                  align="center">
                </el-table-column> -->
                <el-table-column
                  prop="userTime"
                  label="更新时间"
                  align="center">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="300"
                  align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      icon="el-icon--phone"
                      @click="handlePhone(scope.row)"
                      >配置手机号</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-edit"
                      @click="handleEdit(scope.row)"
                      >修改</el-button>
                    <el-button
                      size="mini"
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
        <el-tab-pane label="设置">

              <div class="">
                <el-form  :inline="true" :model="IPForm" :rules="IPRules" ref="IPRuleForm">
                  <el-form-item label="短信猫IP地址" prop="ip" label-width="140px">
                    <el-input v-model="IPForm.ip" placeholder="请输入IP地址"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="ipSubmitForm('IPRuleForm')">设置</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="hr"></div>
              <div class="">
                <el-form :model="audioForm" :rules="audioRules" ref="audioRuleForm">
                  <el-form-item label="语音循环播报时间" prop="second" label-width="140px">
                    <el-input style="width: 200px;" type="number" v-model.number="audioForm.second" placeholder="请输入秒数" min="1">
                      <template slot="append">秒</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="启用语音播报" label-width="140px">
                    <el-switch
                      v-model="audioForm.enable"
                      :active-value="1"
                      :inactive-value="0">
                    </el-switch>
                  </el-form-item>
                  <div style="padding-left: 140px;">
                    <el-button type="primary" @click="audioSubmitForm('audioRuleForm')">设置</el-button>
                  </div>
                </el-form>
              </div>
              <div class="hr"></div>
              <div class="">
                <el-form  :inline="true"  :model="inspectForm" :rules="inspectRules" ref="inspectRuleForm">
                  <el-form-item label="巡检起始时间" prop="patrolDays" label-width="140px">
                    <el-time-select
                      v-model="inspectForm.patrolDays"
                      :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '24:45'
                      }"
                      placeholder="请选择起始时间">
                    </el-time-select>
                  </el-form-item>
                  <div>
                    <el-form-item label="巡检时间间隔" prop="patrolTime" label-width="140px" >
                      <el-input style="width: 200px;" type="number" v-model.number="inspectForm.patrolTime" placeholder="请输入时间间隔" :max="24" :min="1">
                        <template slot="append">小时</template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="复检时间间隔" prop="guzhangTime" label-width="140px" >
                      <el-input style="width: 200px;" type="number" v-model.number="inspectForm.guzhangTime" placeholder="请输入时间间隔" :max="60" :min="1">
                        <template slot="append">分钟</template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <!-- 开1关0 -->
                  <el-form-item label="是否开启巡检" label-width="140px">
                    <el-switch
                      v-model="inspectForm.enable"
                      :active-value="1"
                      :inactive-value="0">
                    </el-switch>
                  </el-form-item>
                  <div style="padding-left: 140px;">
                    <el-button type="primary" @click="inspectSubmitForm('inspectRuleForm')">设置</el-button>
                  </div>
                </el-form>
              </div>
              <div class="hr"></div>
              <el-form :inline="true" :model="uploadForm">
                <el-form-item label="巡检起始时间" prop="patrolDays" label-width="140px">
                  <el-upload
                    :show-file-list="false"
                    :http-request="uploadImg"
                    :file-list="uploadForm">
                  </el-upload>
                </el-form-item>
              </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="音频设置">
        </el-tab-pane>
        <el-tab-pane label="巡检设置">
        </el-tab-pane> -->
      </el-tabs>
    </div>

    <el-dialog title="新增用户名" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addRuleForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="120px">
          <el-input v-model="addForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone" label-width="120px">
          <el-input v-model="addForm.userPhone" placeholder="请输入手机号"></el-input>
        </el-form-item>
         <!-- 开1关0 -->
        <el-form-item label="短信息接收" label-width="120px">
          <el-switch
            v-model="addForm.issms"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm('addRuleForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="addSubmitForm('addRuleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="editRules" ref="editRuleForm">
        <el-form-item label="用户名" prop="userName" label-width="120px">
          <el-input v-model="editForm.userName" placeholder="请输入用户名" disabled></el-input>
        </el-form-item>
        <el-form-item label="当前密码" prop="userPassword" label-width="120px">
          <el-input v-model="editForm.userPassword" placeholder="请输入当前密码" disabled></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword" label-width="120px">
          <el-input v-model="editForm.newpassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm('editRuleForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="editSubmitForm('editRuleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="配置手机号" :visible.sync="phoneVisible">
      <el-form :model="phoneForm" :rules="phoneRules" ref="phoneRuleForm">
        <el-form-item label="用户名" prop="userName" label-width="120px">
          <el-input v-model="phoneForm.userName" placeholder="请输入用户名" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone" label-width="120px">
          <el-input v-model="phoneForm.userPhone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 开1关0 -->
        <el-form-item label="短信息接收" label-width="120px">
          <el-switch
            v-model="phoneForm.issms"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm('phoneRuleForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="phoneSubmitForm('phoneRuleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ws } from '@/mixins/webSocket'
import { tableHeight } from '@/mixins/tableHeight'
import { userList, userAdd, userUpdate, userPhone, userDelete, userAuthor } from '@/api/user'
import { getSms, updateSms, getVoice, updaeVoice, getPatrol, updatePatrol } from '@/api/data'
import { setUpload } from '@/api/upload'
export default {
  name: 'user',
  mixins: [tableHeight, ws],
  data () {
    var validateNewpassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value === this.editForm.userPassword) {
        callback(new Error('输入新密码不能相同!'))
      } else {
        callback()
      }
    }

    var checkPhone = (rule, value, callback) => {
      if (value) {
        // return callback(new Error('手机号不能为空'))
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      } else {
        callback()
      }
    }

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

    var hours24 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('巡检时间间隔不可填空'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字'))
      } else {
        if (value > 24) {
          callback(new Error('巡检时间间隔不可大于24小时'))
        } else {
          callback()
        }
      }
    }
    return {
      uploadForm: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: [],
      addVisible: false,
      addRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        userPhone: [
          { required: false, validator: checkPhone, trigger: 'blur' }
        ]
      },
      addForm: {
        username: '',
        password: '',
        userPhone: '',
        issms: 1
      },
      editVisible: false,
      editRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, validator: validateNewpassword, trigger: 'blur' }
        ]
      },
      editForm: {
        username: '',
        password: '',
        newpassword: ''
      },
      phoneVisible: false,
      phoneRules: {
        // userName: [
        //   { required: true, message: '请输入用户名', trigger: 'blur' }
        // ],
        userPhone: [
          { required: false, validator: checkPhone, trigger: 'blur' }
        ]
      },
      phoneForm: {
        id: '',
        userPhone: '',
        issms: 1
      },
      IPRules: {
        ip: [
          { required: true, validator: validateIp, trigger: 'blur' }
        ]
      },
      IPForm: {
        ip: ''
      },
      audioRules: {
        second: [
          { required: true, message: '请输入秒数', trigger: 'blur' }
        ]
      },
      audioForm: {
        second: '',
        enable: 0
      },
      inspectRules: {
        patrolDays: [
          { required: true, message: '请选择起始时间', trigger: 'change' }
        ],
        patrolTime: [
          { required: true, validator: hours24, trigger: 'blur' }
        ],
        guzhangTime: [
          { required: true, message: '请输入分钟', trigger: 'blur' }
        ]
      },
      value: '',
      inspectForm: {
        patrolDays: '',
        patrolTime: '',
        guzhangTime: '',
        enable: 0 // 0 关 1 开
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.setTableHeight(164, 'pageHeight')
      setTimeout(() => {
        this.$webSocket.getWebSocket().onmessage = this.websocketonMessage
      }, 1000)
      this.getSms()
      // for (let i = 0; i < 100; i++) {
      this.getVoice()
      // }
      this.getPatrol()
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
      userList({
        page: this.currentPage,
        size: this.pageSize
      }).then(res => {
        const data = res.data
        console.log(data)
        this.tableData = data.list
        this.total = data.total
      })
    },
    handleEdit (item) {
      this.editVisible = true
      this.editForm = item
    },
    handlePhone (item) {
      this.phoneVisible = true
      this.phoneForm = item
    },
    handleDelete (id) {
      this.$confirm('是否要删除此用户名？', '提示', {
        type: 'error'
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
        userDelete({
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
    updateAuth (item, type) {
      console.log(item)
      userAuthor({
        username: item.userName,
        userAdmin: type
      }).then(res => {
        this.getTable()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    addSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userAdd(this.addForm)
            .then(res => {
              const data = res.data
              console.log(data)
              this.$message({
                message: res.message,
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
          userUpdate({
            // id: this.editForm.id,
            username: this.editForm.userName,
            password: this.editForm.userPassword,
            newpassword: this.editForm.newpassword,
            userphone: this.editForm.userPhone,
            issms: this.editForm.issms
          }).then(res => {
            const data = res.data
            console.log(data)
            this.$message({
              message: res.message,
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
    phoneSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userPhone({
            id: this.phoneForm.id,
            userphone: this.phoneForm.userPhone,
            issms: this.phoneForm.issms
          }).then(res => {
            const data = res.data
            console.log(data)
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.resetForm('phoneRuleForm')
            this.getTable()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.addVisible = false
      this.editVisible = false
      this.phoneVisible = false
      this.$refs[formName].resetFields()
    },
    getSms () {
      getSms().then(res => {
        const data = res.data
        console.log(data)
        this.IPForm.ip = data.ip
      })
    },
    ipSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateSms({
            ip: this.IPForm.ip
          }).then(res => {
            const data = res.data
            console.log(data)
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getVoice () {
      getVoice().then(res => {
        const data = res.data
        console.log(data)
        this.audioForm.second = data.vSecond
        this.audioForm.enable = data.enable
      })
    },
    audioSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updaeVoice({
            second: this.audioForm.second,
            enable: this.audioForm.enable
          }).then(res => {
            const data = res.data
            console.log(data)
            this.$store.commit('SET_audioSetting', {
              second: this.audioForm.second,
              enable: this.audioForm.enable
            })
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            console.log(this.$store.getters.audioSecond)
            this.audioForTime = this.audioForm.second
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getPatrol () {
      getPatrol().then(res => {
        const data = res.data
        this.inspectForm = {
          patrolDays: data.patrolDays,
          patrolTime: data.patrolTime,
          guzhangTime: data.guzhangTime,
          enable: data.enable
        }
      })
    },
    inspectSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePatrol({
            day: this.inspectForm.patrolDays,
            minute: this.inspectForm.patrolTime,
            guzhangTime: this.inspectForm.guzhangTime,
            enable: this.inspectForm.enable
          }).then(res => {
            const data = res.data
            console.log(data)
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    uploadImg (file, callback) {
      console.log(file)
      const data = new FormData()
      data.append('file', file.file)
      // console.log(data)
      setUpload(data).then(() => {
        this.$message({
          message: '设置成功',
          type: 'success'
        })
      })
      // .thet((res) => {
      //   // callback(res)
      //   // return res
      //   // console.log(res)
      // })
    }
  }
  // beforeRouteLeave (to, form, next) {
  //   this.closeNotify()
  //   next()
  // }
}
</script>
