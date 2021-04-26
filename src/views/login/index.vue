<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">
        <img class="img-responsive" src="@/assets/imgs/logo.png" alt="">
        <h2>光纤直放站网管中心</h2>
        <!-- <p>后台管理系统</p> -->
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item  prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            allow-clear
            prefix-icon="el-icon-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password"
            v-model="form.password"
            placeholder="密码"
            autocomplete="off"
            prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- <el-form-item  prop="vercode">
          <el-row :gutter="8">
            <el-col :span="15">
              <el-input
                v-model="form.vercode"
                placeholder="请输入验证码"
                v-decorator="[
                  'vercode',
                  { rules: [{ required: true, message: '请输入图形验证码' }] },
                ]"
                allow-clear
              />
            </el-col>
            <el-col :span="9" class="login-captcha">
              <img class="img-responsive" :src="imgCaptcha" @click="getCaptcha">
            </el-col>
          </el-row>
        </el-form-item> -->
        <el-form-item>
          <el-row :gutter="8">
            <!-- <el-col :span="12">
              <el-checkbox v-model="rememberPW">
                记住密码
              </el-checkbox>
            </el-col> -->
            <el-col :span="24" class="text-right">
              <!-- <el-button type="text" @click="onForget">
                忘记密码
              </el-button> -->
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item  class="text-center">
          <el-button class="login-btn" type="primary" @click="onLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer">
      <p>© 2021 <a href="#">北京达因瑞康电气设备有限公司</a></p>
    </div>
  </div>
</template>

<script>
import { setLogin } from '@/api/login'
export default {
  data () {
    return {
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
        // vercode: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' }
        // ]
      },
      // uuid: '',
      form: {
        username: '',
        password: ''
        // vercode: '',
        // uuid: ''
      }
      // imgCaptcha: '',
      // rememberPW: false
    }
  },
  created () {
    // this.getCaptcha()
    localStorage.removeItem('vuex')
    this.$Cookies.remove('access_token')
    if (process.env.NODE_ENV === 'development') {
      this.form.username = 'admin'
      this.form.password = 'admin1'
    }
    console.log(localStorage.getItem('userInfo'))
    console.log(this.$store.getters.userInfo)
  },
  methods: {
    getCaptcha () {
      // this.uuid = this.$uuid()
      // this.imgCaptcha = 'http://songweiwenceshi.oicp.io:20010/admin/captcha?uuid=' + this.uuid
    },
    onLogin () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.form.uuid = this.uuid
          setLogin(this.form)
            .then(res => {
              const data = res.data
              console.log(data)
              if (res.code === 200) {
                this.$Cookies.set('access_token', data.token)
                this.$store.commit('SET_userInfo', data)
                this.$store.commit('SET_audioSetting', {
                  second: data.second,
                  enable: data.enable
                })
                this.$router.push({ path: 'home' })
              }
            }).catch(error => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    },
    onForget () {
      this.$Message.warning('请联系管理员')
    }
  }
}
</script>
<style lang="less">
.login {
  position: relative;
  top: 0;
  left: 0;
  min-height: 100%;
  padding: 96px 0;
  background-color: #f2f2f2;
  box-sizing: border-box;

  &-btn {
    display: block;
    width: 100%;
  }

  &-container {
    width: 375px;
    padding: 20px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
  }

  &-title {
    padding: 20px;
    text-align: center;

    img {
      // width: 800px;
      margin: 0 auto 10px;
      border-radius: 12px;
    }

    h2 {
      margin-bottom: 10px;
      font-size: 30px;
      font-weight: 300;
      color: #000;
    }

    p {
      font-weight: 300;
      color: #999;
    }
  }

  &-captcha {
    padding-top: 2px;

    img {
      cursor: pointer;
    }
  }

  &-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    line-height: 30px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    box-sizing: border-box;

    a {
      padding: 0 5px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
