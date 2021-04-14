<template>
  <div class="page">
    <!-- <el-button v-if="notifyList.length !== 0" type="primary" class="closeNotify" @click="closeNotify">
      一键关闭
    </el-button> -->
    <div class="page-container">
      <div class="home">
        <div class="home-left">

          <el-tree
          ref="treeDom"
          :expand-on-click-node="false"
          :highlight-current="true"
          :default-expand-all="true"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i v-if="data.level===1" class="el-icon-s-help"></i>
                <i v-else class="el-icon-s-platform"></i>
                {{ node.label }}
              </span>
              <!-- {{data.online}} -->
              <!-- <span>
                <span v-if="data.alert===1" class="el-tag el-tag--danger el-tag--dark"></span>
              </span> -->
            </span>
          </el-tree>
        </div>
        <!-- <div class="home-right" style="width: 800px;" v-show="!deviceId">
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170521%2F8b45d8c26664406ebf5c2df273086bc8_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618925314&t=0a42ba8e7a4ac7c39c60f459916c4f69" alt="" srcset="">
        </div> -->
        <div class="home-right" style="width: 800px;" v-show="deviceId">
          <div class="flex-container" v-show="homeType===1">
            <div class="flex-item m-r-md">
              在线状态：
              <el-tag v-if="dataNear.device.online===1" type="success" effect="dark">
                在线
              </el-tag>
              <el-tag v-else-if="dataNear.device.online===0" type="info" effect="dark"> 离线</el-tag>
              <!-- <el-tag v-else-if="dataNear.online==='故障'" type="danger" effect="dark">故障</el-tag> -->
            </div>
            <div class="flex-item text-right">
              <el-button :loading="WSloading" type="primary" size="small" @click="onQueryNear(false)">
                读取
              </el-button>
              <el-button :loading="WSloading" type="danger" size="small" @click="settingNear(true)">
                设置
              </el-button>
            </div>
          </div>
          <div class="flex-container" v-show="homeType===2">
            <!-- <div class="flex-item m-r-md">
              在线状态：
              <el-tag v-if="dataFar.device.online===1" type="success" effect="dark">
                在线
              </el-tag>
              <el-tag v-else-if="dataFar.device.online===0" type="info" effect="dark"> 离线</el-tag>
            </div> -->
            <div class="flex-item text-right">
              <el-button :loading="WSloading" type="primary" size="small" @click="onQueryFar(false)">
                读取
              </el-button>
              <el-button :loading="WSloading" type="danger" size="small" @click="settingFar(true)">
                设置
              </el-button>
            </div>
          </div>

          <el-card class="home-card m-t-md" v-show="homeType===1" v-loading="loading">
            <div slot="header" class="clearfix">
              <div class="page-title">
                {{dataNear.device.deviceName}}
                <span>
                  {{dataNear.device.deviceAddress}}
                </span>
                <div v-show="testing" class="page-title__state">
                  <el-tag
                    v-if="WSloadingState===0"
                    type="warning">
                    <i class="el-icon-loading"></i>
                    {{WSloadingText}}
                  </el-tag>
                  <el-tag
                    v-else-if="WSloadingState===1"
                    type="success">
                    <i class="el-icon-check"></i>
                    {{WSloadingText}}
                  </el-tag>
                  <el-tag
                    v-else-if="WSloadingState===2"
                    type="danger">
                    <i class="el-icon-warning-outline"></i>
                    {{WSloadingText}}
                  </el-tag>
                </div>
              </div>
            </div>
            <div class="home-main">
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  设备ID
                </el-col>
                <el-col :span="8">
                  {{dataNear.device.deviceId}}
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  模块名称
                </el-col>
                <el-col :span="8">
                  目前数值
                </el-col>
                <el-col :span="8">
                  单位
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  光模块衰减值
                </el-col>
                <el-col :span="8">
                  <template v-if="dataNear.device.shuaijianzhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    <el-input class="home-item__input" :maxlength="2" :min="0" :max="31" size="small"
                    v-model.number="dataNear.device.shuaijianzhi" placeholder=""></el-input>
                  </template>
                </el-col>
                <el-col :span="8">
                  0-31（范围值）
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle" style="height: 0;"></el-row>
              <el-alert
                :closable="false"
                v-show="showShuaijianzhi"
                title="光模块衰减值不可空，范围值允许为0-31"
                type="error"
                effect="dark">
              </el-alert>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  收光功率
                </el-col>
                <el-col :span="8">
                  <template v-if="dataNear.device.shouguangzhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    {{dataNear.device.shouguangzhi}}
                  </template>
                </el-col>
                <el-col :span="8">
                  单位:dbm
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  版本号
                </el-col>
                <el-col :span="8">
                  {{dataNear.device.deviceVersion}}
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" size="small" @click="onVersionNear" :loading="WSloading">
                    读取版本号
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <el-card class="home-card m-t-md" v-show="homeType===2" v-loading="loading">
            <div slot="header" class="clearfix">
              <div class="page-title">
                {{dataFar.device.deviceName}}
                <span>
                  {{dataFar.device.deviceAddress}}
                </span>
                <div v-show="testing" class="page-title__state">
                  <el-tag
                    v-if="WSloadingState===0"
                    type="warning">
                    <i class="el-icon-loading"></i>
                    {{WSloadingText}}
                  </el-tag>
                  <el-tag
                    v-else-if="WSloadingState===1"
                    type="success">
                    <i class="el-icon-check"></i>
                    {{WSloadingText}}
                  </el-tag>
                  <el-tag
                    v-else-if="WSloadingState===2"
                    type="danger">
                    <i class="el-icon-warning-outline"></i>
                    {{WSloadingText}}
                  </el-tag>
                </div>
              </div>
            </div>
            <div class="home-main" v-show="homeType===2">
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  设备ID
                </el-col>
                <el-col :span="8">
                  {{dataFar.device.deviceId}}
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  模块名称
                </el-col>
                <el-col :span="8">
                  目前数值
                </el-col>
                <el-col :span="8">
                  单位
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  光模块衰减值
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.shuaijianzhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    <el-input class="home-item__input" :maxlength="2" :min="0" :max="31" size="small"
                    v-model.number="dataFar.device.shuaijianzhi" placeholder=""></el-input>
                  </template>
                </el-col>
                <el-col :span="8">
                  0-31（范围值）
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle" style="height: 0;"></el-row>
              <el-alert
                :closable="false"
                v-show="showShuaijianzhiFar"
                title="光模块衰减值不可空，范围值允许为0-31"
                type="error"
                effect="dark">
              </el-alert>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  收光功率
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.shouguangzhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    {{dataFar.device.shouguangzhi}}
                  </template>
                </el-col>
                <el-col :span="8">
                  单位:dbm
                </el-col>
              </el-row>

              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  功放衰减值
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.gongfangshuaijianzhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    <el-input class="home-item__input" size="small" v-model.number="dataFar.device.gongfangshuaijianzhi"></el-input>
                    <!-- {{dataFar.device.gongfangshuaijianzhi}} -->
                  </template>
                </el-col>
                <el-col :span="8">
                  无符号数
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle" style="height: 0;"></el-row>
              <el-alert
                :closable="false"
                v-show="showGongfangshuaijianzhi"
                title="上行衰减值不可空"
                type="error"
                effect="dark">
              </el-alert>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  下行反向功率
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.xiaxingfanxiangzhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    {{dataFar.device.xiaxingfanxiangzhi}}
                  </template>
                </el-col>
                <el-col :span="8">
                  单位dbm
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  功放温度
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.gongfangwenduzhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    {{dataFar.device.gongfangwenduzhi}}
                  </template>
                </el-col>
                <el-col :span="8">
                  有符号数：℃
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  功放ALC值
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.gongfangalczhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    {{dataFar.device.gongfangalczhi}}
                  </template>
                </el-col>
                <el-col :span="8">
                  有符号数：dBm
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  驻波比
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.zhubobizhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    {{dataFar.device.zhubobizhi/10}}
                  </template>
                </el-col>
                <el-col :span="8">
                  无符号数
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  下行前向功率
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.xiaxingqianxiangzhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    {{dataFar.device.xiaxingqianxiangzhi}}
                  </template>
                </el-col>
                <el-col :span="8">
                  有符号数：dBm
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  上行衰减值
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.shangxingshuajianzhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    <el-input class="home-item__input" size="small" v-model.number="dataFar.device.shangxingshuajianzhi"></el-input>
                    <!-- {{dataFar.device.shangxingshuajianzhi}} -->
                  </template>
                </el-col>
                <el-col :span="8">
                  无符号数
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle" style="height: 0;"></el-row>
              <el-alert
                :closable="false"
                v-show="showShangxingshuajianzhi"
                title="上行衰减值不可空"
                type="error"
                effect="dark">
              </el-alert>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  LNA最大增益
                </el-col>
                <el-col :span="8">
                  <template v-if="dataFar.device.lnazuidazhi===255">
                    <el-tag type="danger">
                      超时
                    </el-tag>
                  </template>
                  <template v-else>
                    {{dataFar.device.lnazuidazhi}}
                  </template>
                </el-col>
                <el-col :span="8">
                  有符号数：DB
                </el-col>
              </el-row>

              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="8">
                  版本号
                </el-col>
                <el-col :span="8">
                  {{dataFar.device.deviceVersion}}
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" size="small" @click="onVersionFar" :loading="WSloading">
                    读取版本号
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ws } from '@/mixins/webSocket'
// import { overTimeInit } from '@/mixins/overTime'
import { getTree } from '@/api/get'
import { getDetailFar, getDetailNear } from '@/api/home'
export default {
  name: 'settingParams',
  // overTimeInit
  mixins: [ws],
  data () {
    return {
      overTime: null,
      initTree: false,
      active: [],
      WSloadingType: '',
      WSloadingState: 0,
      WSloading: false,
      WSloadingText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'deviceName'
      },
      loading: false,
      homeType: 1,
      deviceId: '',
      deviceIdNear: null,
      dataFar: {
        device: {}
      },
      dataNear: {
        device: {}
      },
      showShuaijianzhi: false,
      showShuaijianzhiFar: false,
      showGongfangshuaijianzhi: false,
      showShangxingshuajianzhi: false,
      settingBool: false
    }
  },
  created () {
    // this.$notify({
    //   title: '提示',
    //   message: '这是一条不会自动关闭的消息',
    //   duration: 0
    // })
    // const treeData = this.$store.getters.userInfo.userInfo.device
    // treeData.forEach(e => {
    //   this.treeData.push({
    //     deviceName: e.near.deviceName,
    //     deviceId: e.near.deviceId,
    //     id: e.near.id,
    //     deviceAddress: e.near.deviceAddress,
    //     level: 1,
    //     children: e.far
    //   })
    // })
    this.$nextTick(() => {
      this.getTree()
      setTimeout(() => {
        this.$webSocket.getWebSocket().onmessage = this.websocketonMessage
      }, 1000)
    })
  },
  computed: {
    testing () {
      return this.WSloading || this.WSloadingText
    }
  },
  methods: {
    getTree () {
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
            children: e.far,
            treeId: e.near.id
          })
        })

        this.treeData.forEach(e => {
          e.children.forEach(o => {
            o.treeId = o.deviceNearId + '-' + o.id
          })
        })
        this.handleNodeClick(this.treeData[0])
        // this.active = [String(this.treeData[0].id)]
        // .el-tree-node
        this.$nextTick(() => {
          // el-tree-node is-expanded is-current is-focusable
          this.$refs.treeDom.$el.children[0].className = 'el-tree-node is-expanded is-current is-focusable'
          this.initTree = true
        })
      })
    },
    onQueryNear (bool) { // 近端机读取
      // this.settingBool = bool || true
      // if (!this.settingBool) {
      this.WSloadingType = '读取'
      this.WSloadingState = 0
      this.WSloading = true
      this.WSloadingText = '读取中'
      // }
      this.$webSocket.Send({
        commandString: 'RN',
        nearDevice: {
          deviceId: this.deviceId
        }
      })
    },
    onQueryFar (bool) { // 远端机读取
      // this.settingBool = bool || true
      // if (!this.settingBool) {
      this.WSloadingType = '读取'
      this.WSloadingState = 0
      this.WSloading = true
      this.WSloadingText = '读取中'
      // }
      this.$webSocket.Send({
        commandString: 'RF',
        farDevice: {
          deviceId: this.deviceId,
          deviceNearId: this.deviceIdNear // 父级近端机
        }
      })
    },
    onVersionNear () { // 近端机 版本
      this.WSloadingType = '读取版本'
      this.WSloadingState = 0
      this.WSloading = true
      this.WSloadingText = '读取版本中'
      this.$webSocket.Send({
        commandString: 'RNV',
        nearDevice: {
          deviceId: this.deviceId
        }
      })
    },
    onVersionFar () { // 远端机 版本
      this.WSloadingType = '读取版本'
      this.WSloadingState = 0
      this.WSloading = true
      this.WSloadingText = '读取版本中'
      this.$webSocket.Send({
        commandString: 'RFV',
        farDevice: {
          deviceId: this.deviceId,
          deviceNearId: this.deviceIdNear // 父级近端机
        }
      })
    },
    settingNear (bool) {
      if (this.dataNear.device.shuaijianzhi === '') {
        this.showShuaijianzhi = true
      } else if (this.dataNear.device.shuaijianzhi > 31 || this.dataNear.device.shuaijianzhi < 0) {
        this.showShuaijianzhi = true
      } else {
        // this.settingBool = bool
        this.WSloadingType = '设置'
        this.WSloadingState = 0
        this.WSloading = true
        this.WSloadingText = '设置中'
        this.showShuaijianzhi = false
        this.$webSocket.Send({
          commandString: 'SN',
          nearDevice: this.dataNear.device
        })
      }
    },
    settingFar (bool) {
      if (this.dataFar.device.shuaijianzhi === '') {
        this.showShuaijianzhiFar = true
      } else if (this.dataFar.device.shuaijianzhi > 31 || this.dataFar.device.shuaijianzhi < 0) {
        this.showShuaijianzhiFar = true
      } else if (this.dataFar.device.gongfangshuaijianzhi === '') {
        this.showGongfangshuaijianzhi = true
      } else if (this.dataFar.device.shangxingshuajianzhi === '') {
        this.showShangxingshuajianzhi = true
      } else {
        // this.settingBool = bool
        this.WSloadingType = '设置'
        this.WSloadingState = 0
        this.WSloading = true
        this.WSloadingText = '设置中'
        this.showShuaijianzhiFar = false
        this.showShuaijianzhiFar = false
        this.showGongfangshuaijianzhi = false
        this.showShangxingshuajianzhi = false
        this.$webSocket.Send({
          commandString: 'SF',
          farDevice: this.dataFar.device
        })
      }
    },
    websocketonMessage (e) {
      this.WSloadingState = 1
      this.WSloading = false
      this.clearOverTime()

      // this.overTimeClear()
      const redata = JSON.parse(e.data)
      this.websocketonMessageAll(redata)
      // alert(1)
      if (redata.commandString === 'SRN') { // 读取近端机
        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
        }
        // if (!this.settingBool) {
        this.$message({
          message: '读取成功',
          type: 'success'
        })
        this.WSloadingText = '读取完毕'
        this.nearErroePlay()

        // }
      } else if (redata.commandString === 'SRF') { // 读取远端机
        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
        }
        // if (!this.settingBool) {
        this.$message({
          message: '读取成功',
          type: 'success'
        })
        this.WSloadingText = '读取完毕'
        this.queryPlay()
        // }
      } else if (redata.commandString === 'SRNV') { // 近端机 版本
        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
        }
        this.$message({
          message: '版本号更新成功',
          type: 'success'
        })
        this.WSloadingText = '版本号更新完毕'
      } else if (redata.commandString === 'SRFV') { // 远端机 版本
        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
        }
        this.$message({
          message: '版本号更新成功',
          type: 'success'
        })
        this.WSloadingText = '版本号更新完毕'
      } else if (redata.commandString === 'SSN') { // 近端机 设置
        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
        }
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.WSloadingText = '设置完毕'
        this.settingPlay()
        // this.onQueryNear()// 近端机读取
      } else if (redata.commandString === 'SSF') { // 远端机 设置
        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
        }
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.WSloadingText = '设置完毕'
        this.settingPlay()
        // this.onQueryFar()// 远端机读取
      }
    },
    handleNodeClick (data) {
      this.$nextTick(() => {
        if (this.initTree) {
          this.$refs.treeDom.$el.children[0].className = 'el-tree-node is-expanded'
          this.initTree = false
        }
      })
      this.homeType = data.level || 2
      console.log(data)
      this.deviceId = data.id
      this.loading = true
      if (this.homeType === 1) {
        this.deviceIdNear = null
        getDetailNear({
          id: this.deviceId
        }).then(res => {
          const data = res.data
          console.log(data)
          this.dataNear = data
          this.loading = false
        })
      } else if (this.homeType === 2) {
        this.deviceIdNear = data.deviceNearId
        getDetailFar({
          id: this.deviceId
        }).then(res => {
          const data = res.data
          console.log(data)
          this.dataFar = data
          this.loading = false
        })
      }
    },
    clearOverTime () {
      clearTimeout(this.overTime)
      this.overTime = null
    }
  },
  watch: {
    WSloading (val) {
      if (val) {
        this.overTime = setTimeout(() => {
          this.WSloading = false
          this.WSloadingState = 2
          switch (this.WSloadingType) {
            case '读取':
              this.WSloadingText = '读取超时'
              this.$message.error('读取超时')
              break
            case '读取版本':
              this.WSloadingText = '读取版本超时'
              this.$message.error('读取版本超时')
              break
            case '设置':
              this.WSloadingText = '设置超时'
              this.$message.error('设置超时')
              break
            default:
              break
          }
          // 近端机
          // this.dataNear.device.online = 0

          // 远端机
          // this.dataFar.device.online = 0
        }, 1000 * 10)
      }
    }
  }
  // beforeRouteLeave (to, form, next) {
  //   this.closeNotify()
  //   next()
  // }
}
</script>

<style lang="less" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
    font-size: 14px;

    .el-tag {
      display: inline-block;
      width: 16px;
      height: 16px;
      padding: 0;
      border-radius: 50%;
    }
  }
</style>
