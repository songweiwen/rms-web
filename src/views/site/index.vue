<template>
  <div class="page">
    <div class="page-container">
      <div class="table">
        <div class="table-hd">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addVisible=true">增加</el-button>
          <!-- <el-button type="danger" size="mini">删除</el-button> -->
          <!-- <el-button type="warning" size="mini">角色详情</el-button> -->
          <el-button type="danger" icon="el-icon-setting" size="mini">线路权限</el-button>
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
            <el-table-column
              prop="userTime"
              label="有效期"
              align="center">
            </el-table-column>
            <el-table-column
              prop="userAdmin"
              label="巡检管理权限"
              align="center">
              <template slot-scope="scope">
                <template>
                  <el-tag size="medium">{{ scope.row.userAdmin }}</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              prop="userRole"
              label="角色"
              align="center">
            </el-table-column>
            <el-table-column
              prop="userTime"
              label="更新时间"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="200"
              align="center">
              <template slot-scope="scope">
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
    </div>

    <el-dialog title="新增用户名" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addRuleForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="120px">
          <el-input v-model="addForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm('addRuleForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="addSubmitForm('addRuleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户名" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="editRules" ref="addRuleForm">
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
        <el-button size="small" type="primary" @click="editSubmitForm('addRuleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableHeight } from '@/mixins/tableHeight'
import { userList, userAdd, userUpdate, userDelete } from '@/api/user'
export default {
  name: 'user',
  mixins: [tableHeight],
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
    return {
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
        ]
      },
      addForm: {
        username: '',
        password: ''
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
      }
    }
  },
  created () {
    this.getTable()
  },
  methods: {
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
            username: this.editForm.userName,
            password: this.editForm.userPassword,
            newpassword: this.editForm.newpassword
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
    resetForm (formName) {
      this.addVisible = false
      this.editVisible = false
      this.$refs[formName].resetFields()
    }
  }
}
</script>
