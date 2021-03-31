<template>
  <div class="page">
    <div class="page-container"
      v-loading="WSloading"
      :element-loading-text="WSloadingText"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="home">
        <div class="home-left">

          <el-tree
          :expand-on-click-node="false"
          :highlight-current="true"
          :default-expand-all="true"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <!-- {{data.online}} -->
              <span>
                <!-- {{node}} -->
                <!-- <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  Append
                </el-button> -->
                <span v-if="data.online===1" class="el-tag el-tag--danger el-tag--dark"></span>
                <!-- 1 -->
                <!-- <el-tag v-if="data.online===1" type="danger" effect="dark"></el-tag>  -->
                <!-- <el-tag v-if="node.device.faguanggonglv===0" type="success" effect="dark"></el-tag>
                <el-tag v-else-if="node.device.faguanggonglv===1"  type="info" effect="dark"></el-tag>
                <el-tag v-else type="danger" effect="dark"></el-tag> -->
              </span>
            </span>
          </el-tree>
        </div>
        <div class="home-right" style="width: 800px;" v-show="!deviceId">
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170521%2F8b45d8c26664406ebf5c2df273086bc8_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618925314&t=0a42ba8e7a4ac7c39c60f459916c4f69" alt="" srcset="">
        </div>
        <div class="home-right" style="width: 800px;" v-show="deviceId">
          <div class="flex-container" v-show="homeType===1">
            <div class="flex-item m-r-md">
              在线状态：
              <el-tag v-if="dataNear.online==='在线'" type="success" effect="dark">
                在线
              </el-tag>
              <el-tag v-else-if="dataNear.online==='不在线'" type="info" effect="dark"> 离线</el-tag>
              <el-tag v-else-if="dataNear.online==='故障'" type="danger" effect="dark">故障</el-tag>
            </div>
            <div class="flex-item text-right">
              <el-button type="primary" size="small" @click="onQueryNear">
                手动检测
              </el-button>
              <el-button type="danger" size="small">
                核销故障
              </el-button>
            </div>
          </div>
          <div class="flex-container" v-show="homeType===2">
            <div class="flex-item m-r-md">
              在线状态：
              <el-tag v-if="dataFar.online==='在线'" type="success" effect="dark">
                在线
              </el-tag>
              <el-tag v-else-if="dataFar.online==='不在线'" type="info" effect="dark"> 离线</el-tag>
              <el-tag v-else-if="dataFar.online==='故障'" type="danger" effect="dark">故障</el-tag>
            </div>
            <div class="flex-item text-right">
              <el-button type="primary" size="small" @click="onQueryFar">
                手动检测
              </el-button>
              <el-button type="danger" size="small">
                核销故障
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
              </div>
            </div>
            <div class="home-main">
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  设备ID
                </el-col>
                <el-col :span="12">
                  {{dataNear.device.deviceId}}
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  收光功率状态
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataNear.device.shouguanggonglv===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataNear.device.shouguanggonglv===1"  type="danger" effect="dark"></el-tag>
                  <el-tag v-else type="info" effect="dark"></el-tag>

                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  发光功率状态
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataNear.device.faguanggonglv===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataNear.device.faguanggonglv===1"  type="danger" effect="dark"></el-tag>
                  <!-- <el-tag v-else type="danger" effect="dark"></el-tag> -->

                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  UPS警告
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataNear.device.upsgaojing===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataNear.device.upsgaojing===1"  type="danger" effect="dark"></el-tag>
                  <!-- <el-tag v-else type="danger" effect="dark"></el-tag> -->
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  更新时间
                </el-col>
                <el-col :span="12">
                  {{dataNear.device.deviceTime}}
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  指示说明
                </el-col>
                <el-col :span="12">
                  <el-tag type="success" effect="dark"></el-tag> <span class="home-tagtext">正常</span>
                  <el-tag type="danger" effect="dark"></el-tag>  <span class="home-tagtext">故障</span>
                  <el-tag type="info" effect="dark"></el-tag>  <span class="home-tagtext">未响应</span>

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
              </div>
            </div>
            <div class="home-main" v-show="homeType===2">
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  设备ID
                </el-col>
                <el-col :span="12">
                  {{dataFar.device.deviceId}}
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  发光警告
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataFar.device.faguanggaojing===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataFar.device.faguanggaojing===1"  type="danger" effect="dark"></el-tag>
                  <!-- <el-tag v-else type="danger" effect="dark"></el-tag> -->

                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  收光警告
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataFar.device.shouguanggaojing===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataFar.device.shouguanggaojing===1"  type="danger" effect="dark"></el-tag>
                  <!-- <el-tag v-else type="danger" effect="dark"></el-tag> -->
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  功放状态-故障告警
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataFar.device.guzhanggaojing===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataFar.device.guzhanggaojing===1"  type="danger" effect="dark"></el-tag>
                  <!-- <el-tag v-else type="danger" effect="dark"></el-tag> -->
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  功放状态-驻波比告警
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataFar.device.zhubobigaojing===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataFar.device.zhubobigaojing===1"  type="danger" effect="dark"></el-tag>
                  <!-- <el-tag v-else type="danger" effect="dark"></el-tag> -->
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  功放状态-过温告警
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataFar.device.guowengaojing===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataFar.device.guowengaojing===1"  type="danger" effect="dark"></el-tag>
                  <!-- <el-tag v-else type="danger" effect="dark"></el-tag> -->
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  功放状态-过功率告警
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataFar.device.guogonglvgaojing===0" type="success" effect="dark"></el-tag>
                  <!-- <el-tag v-else-if="dataFar.device.guogonglvgaojing===2"  type="info" effect="dark"></el-tag> -->
                  <el-tag v-else-if="dataFar.device.guogonglvgaojing===1" type="danger" effect="dark"></el-tag>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  上行故障
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataFar.device.shangxingguzhang===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataFar.device.shangxingguzhang===1"  type="danger" effect="dark"></el-tag>
                  <!-- <el-tag v-else type="danger" effect="dark"></el-tag> -->
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  UPS警告
                </el-col>
                <el-col :span="12">
                  <el-tag v-if="dataFar.device.upsgaojing===0" type="success" effect="dark"></el-tag>
                  <el-tag v-else-if="dataFar.device.upsgaojing===1"  type="danger" effect="dark"></el-tag>
                  <!-- <el-tag v-else type="danger" effect="dark"></el-tag> -->
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  更新时间
                </el-col>
                <el-col :span="12">
                  {{dataFar.device.deviceTime}}
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  指示说明
                </el-col>
                <el-col :span="12">
                  <el-tag type="success" effect="dark"></el-tag> <span class="home-tagtext">正常</span>
                  <el-tag type="danger" effect="dark"></el-tag>  <span class="home-tagtext">故障</span>
                  <el-tag type="info" effect="dark"></el-tag>  <span class="home-tagtext">未响应</span>
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
import { getTree } from '@/api/get'
import { getDetailFar, getDetailNear } from '@/api/home'
export default {
  name: 'home',
  data () {
    return {
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
      }
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
      this.$websocket.getWebSocket().onmessage = this.websocketonmessage
      this.getTree()
    })
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
            children: e.far
          })
        })
      })
    },
    onQueryNear () { // 近端机查询
      this.WSloading = true
      this.WSloadingText = '检测中...'
      this.$websocket.Send({
        commandString: 'CN',
        nearDevice: {
          deviceId: this.deviceId
        }
      })
    },
    onQueryFar () { // 远端机查询
      this.WSloading = true
      this.WSloadingText = '检测中...'
      this.$websocket.Send({
        commandString: 'CF',
        farDevice: {
          deviceId: this.deviceId,
          deviceNearId: this.deviceIdNear // 父级近端机
        }
      })
    },
    websocketonmessage (e) {
      const redata = JSON.parse(e.data)
      console.log(redata, 9999)
      if (redata.code === 500) {
        this.$message.error('连接发生了错误，请联系管理员')
      }
      // 近端机报警  更新树状图的报警灯泡
      if (redata.commandString === 'WN') {
        this.treeData.forEach(e => {
          if (e.deviceId === redata.nearDevice.deviceId) {
            e.online = 1
            this.treeData = [...this.treeData]
          }
        })
        if (this.dataNear.device.deviceId === redata.deviceId) {
          this.dataNear.device = redata.nearDevice
        }
      } else if (redata.commandString === 'WF') {
        // 远端机报警  更新树状图的报警灯泡
        this.treeData.forEach(e => {
          e.children.forEach(o => {
            if (o.deviceId === redata.farDevice.deviceId) {
              o.online = 1
              this.treeData = [...this.treeData]
            }
          })
        })
        if (this.dataFar.device.deviceId === redata.deviceId) {
          this.dataFar.device = redata.farDevice
        }
      } else if (redata.commandString === 'TRN') {
        // 近端机修复故障  更新树状图的报警灯泡
        this.treeData.forEach(e => {
          e.children.forEach(o => {
            if (o.deviceId === redata.nearDevice.deviceId) {
              o.online = 0
              this.treeData = [...this.treeData]
            }
          })
        })
        if (this.dataNear.device.deviceId === redata.deviceId) {
          this.dataNear.device = redata.nearDevice
        }
      } else if (redata.commandString === 'TRF') {
        // 远端机修复故障  更新树状图的报警灯泡
        this.treeData.forEach(e => {
          e.children.forEach(o => {
            if (o.deviceId === redata.farDevice.deviceId) {
              o.online = 0
              this.treeData = [...this.treeData]
            }
          })
        })
        if (this.dataFar.device.deviceId === redata.deviceId) {
          this.dataFar.device = redata.farDevice
        }
      } else if (redata.commandString === 'CN') {
        if (this.dataNear.device.deviceId === redata.deviceId) {
          this.dataNear.device = redata.dataNear
        }
      } else if (redata.commandString === 'CF') {
        if (this.dataFar.device.deviceId === redata.deviceId) {
          this.dataFar.device = redata.dataFar
        }
      }
      this.WSloading = false
    },
    handleNodeClick (data) {
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
    }
  }
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
