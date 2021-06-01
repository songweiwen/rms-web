
<template>
<el-container class="layout">
  <!-- <el-aside width="200px">
    <el-menu
      :default-active="menuDefault"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#1890ff"
      @select="onMenu">

      <el-menu-item
        v-for="(item, index) in menuData"
        :key="index"
        :index="String(index)">
        <i :class="item.icon?item.icon:'el-icon-menu'"></i>
        <span slot="title">
          {{item.webTitle}}
        </span>
      </el-menu-item>
    </el-menu>
  </el-aside> -->

  <el-container>
    <el-header style="font-size: 12px; text-align: right;">
      <el-menu
        style="padding-right: 128px;"
        mode="horizontal"
        :default-active="menuDefault"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#1890ff"
        @select="onMenu">

        <el-menu-item
          v-for="(item, index) in menuData"
          :key="index"
          :index="String(index)">
          <i :class="item.icon?item.icon + ' iconfont':'el-icon-menu'"></i>
          <span slot="title">
            {{item.webTitle}}
          </span>
        </el-menu-item>
      </el-menu>
      <div class="layout-user">
        <span>{{userInfo.userInfo.userName}}</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-left: 15px;"></i>
          <template #dropdown>
            <el-dropdown-menu>
                <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
                <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-main>
      <router-view />
      <!-- <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table> -->
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      menuDefault: '0',
      userInfo: {},
      menuData: [],
      menuUrl: {
        系统总览: '/home',
        // 状态日志: '/stateLog',
        // 站点: '/site',
        故障管理: '/warning',
        // 操作日志: '/data',
        // 线路: '/line',
        // 地址: '/address',
        参数设置: '/settingParams',
        操作日志: '/log',
        用户管理: '/user',
        开站设置: '/equipment'
      },
      menuIcon: {
        系统总览: 'icon-zhuye',
        操作日志: 'icon-caozuorizhi',
        参数设置: 'icon-canshushezhi',
        用户管理: 'icon-yonghuguanli',
        开站设置: 'icon-kaizhanguanli'
      }
    }
  },
  created () {
    const userInfo = this.$store.getters.userInfo
    console.log(userInfo, 1)
    this.userInfo = userInfo.userInfo
    this.menuData = userInfo.userInfo.webInfo
    console.log(this.$store.getters.userInfo)

    console.log(this.$route)
    this.$nextTick(() => {
      this.$webSocket.Init()
    })
    for (const key in this.menuUrl) {
      if (this.menuUrl[key] === this.$route.path) {
        for (let i = 0; i < this.menuData.length; i++) {
          const e = this.menuData[i]
          if (key === e.webTitle) {
            this.menuDefault = String(i)
          }
        }
      }
      // if (e.webTitle===this.me) {

      // }
      // if (e.webTitle === key) {
      //   console.log(i)
      //   this.menuDefault = String(i)
      //   break
      // }
    }
    console.log(this.menuData)
    // for (let i = 0; i < this.menuData.length; i++) {
    //   const e = this.menuData[i]
    //   console.log(e)
    for (const key in this.menuIcon) {
      console.log(key)
      // if (e.webTitle === key) {
      this.menuData.forEach(e => {
        console.log(e)
        if (e.webTitle === key) {
          e.icon = this.menuIcon[key]
        }
      })
      // }
    }
    // this.menuIcon.forEach(o => {
    //   console.log(o)
    // })
    // }
  },
  methods: {
    onMenu (index, indexPath) {
      this.$router.push({ path: this.menuUrl[this.menuData[index].webTitle] })
      console.log(index, indexPath)
    },
    loginOut () {
      this.$confirm('是否要退出登录？', '提示', {
        type: 'error'
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
        this.$store.commit('SET_userInfo', {})
        localStorage.removeItem('vuex')
        this.$Cookies.remove('access_token')
        this.$router.push({ path: '/login' })

        // 方案一
        this.$Cookies.remove('api')
        this.$Cookies.remove('ws')
        // window.close()
        // 方案一
      }).catch(() => {
        // 点击确定的操作(调用接口)
      })
    }
  }
}
</script>

<style lang="less">
.layout {
  .layout-user {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 10px;
    color: #fff;
  }

  .el-menu {
    display: flex;
    width: 84%;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: #001529;
    border-bottom: none !important;
  }

  .el-menu--horizontal > .el-menu-item {
    flex: 1;
    float: none;
    max-width: 140px;
    text-align: center;
  }

  .el-main {
    height: 100%;
    padding: 0px;
    background-color: #f1f2f5;
  }

  &.el-container {
    height: 100%;
  }

  .el-header {
    padding: 0;
    line-height: 60px;
    background-color: #001529;
    // color: #333;
    // background-color: #B3C0D1;
  }

  .el-aside {
    color: #333;
  }

  .el-menu-item {
    color: #fff;
  }

  .el-submenu__title:hover,
  .el-menu-item.is-active,
  .el-menu-item:focus,
  .el-menu-item:hover {
    color: #fff !important;
    background-color: #1890ff !important;
  }

  .el-submenu__title {
    color: #fff;
  }
}
</style>
