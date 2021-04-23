<template>
  <div class="page">
    <!-- <el-button v-if="notifyList.length !== 0" type="primary" class="closeNotify" @click="closeNotify">
      一键关闭
    </el-button> -->
    <div class="page-container page-tabs page-tabs--h" ref="pageHeight">
      <el-tabs type="border-card">
        <el-tab-pane label="短信息设置">
          <div class="form-center">
            <el-form class="text-center" :inline="true" :model="IPForm" :rules="IPRules" ref="IPRuleForm">
              <el-form-item label="IP地址" prop="ip" label-width="120px">
                <el-input v-model="IPForm.ip" placeholder="请输入IP地址"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ipSubmitForm('IPRuleForm')">设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="音频设置">
          <div class="form-center">
            <el-form class="text-center" :inline="true"  :model="audioForm" :rules="audioRules" ref="audioRuleForm">
              <el-form-item label="设置音频循环播放时间" prop="second" label-width="200px">
                <el-input v-model.number="audioForm.second" placeholder="请输入秒数">
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="audioSubmitForm('audioRuleForm')">设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { ws } from '@/mixins/webSocket'
import { getSms, updateSms, getVoice, updaeVoice } from '@/api/data'
export default {
  name: 'datas',
  mixins: [ws],
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
    return {
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
        second: ''
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.getSms()
      this.getVoice()
      setTimeout(() => {
        this.$webSocket.getWebSocket().onmessage = this.websocketonMessage
      }, 1000)
    })
  },
  methods: {
    websocketonMessage (e) {
      // this.overTimeClear()
      const redata = JSON.parse(e.data)
      this.websocketonMessageAll(redata)
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
      })
    },
    audioSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updaeVoice({
            second: this.audioForm.second
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
    }
  }
}
</script>
