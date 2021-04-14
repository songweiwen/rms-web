<template>
  <div class="page">
    <!-- <el-button v-if="notifyList.length !== 0" type="primary" class="closeNotify" @click="closeNotify">
      一键关闭
    </el-button> -->
    <div class="page-container">
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
              <span>
                <i v-if="data.level===1" class="el-icon-s-help"></i>
                <i v-else class="el-icon-s-platform"></i>
                {{ node.label }}
              </span>
              <!-- {{data.online}} -->
              <span>
                <!-- {{node}} -->
                <!-- <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  Append
                </el-button> -->
                <span v-if="data.alert===1" class="el-tag el-tag--danger el-tag--dark"></span>
                <!-- 1 -->
                <!-- <el-tag v-if="data.online===1" type="danger" effect="dark"></el-tag>  -->
                <!-- <el-tag v-if="node.device.faguanggonglv===0" type="success" effect="dark"></el-tag>
                <el-tag v-else-if="node.device.faguanggonglv===1"  type="info" effect="dark"></el-tag>
                <el-tag v-else type="danger" effect="dark"></el-tag> -->
              </span>
            </span>
          </el-tree>
        </div>
        <div class="home-right" style="width: 100%;" v-show="!deviceId">
          <!-- <img style="width: 100%;" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170521%2F8b45d8c26664406ebf5c2df273086bc8_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618925314&t=0a42ba8e7a4ac7c39c60f459916c4f69" alt="" srcset=""> -->
          <!-- <div class="viewimg-left" @mousewheel.prevent="rollImg">
            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170521%2F8b45d8c26664406ebf5c2df273086bc8_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618925314&t=0a42ba8e7a4ac7c39c60f459916c4f69" class="viewimg-img" ref="imgDiv" @mousedown="move" />
          </div> -->
          <div id="equipment">
            <img id="img" :src="require('@/assets/imgs/demo_picture.png')" />
            <vue-draggable-resizable
              v-for="(item, index) in equipmentData"
              :key="index"
              :parent="true"
              :handles="dragActive"
              :w="120"
              :h="30"
              :snap="true"
              :y="item.locationY"
              :x="item.locationX"
              :is-conflict-check="true"
              @dragging="onDragging(item)"
              @dragstop="onDragstop">
              <div class="equipmentBox"
                :class="{'equipmentBox--near': item.level===1,
                'equipmentBox--far': item.level===2,
                'equipmentBox--dagder': item.alert===1 }"
              >
                {{item.deviceName}}
              </div>
            </vue-draggable-resizable>
          </div>

        </div>
        <div class="home-right" style="width: 800px;" v-show="deviceId">
          <div class="flex-container" v-show="homeType===1">
            <div class="flex-item m-r-md">
              在线状态：
              <el-tag v-if="dataNear.device.online===1" type="success" effect="dark">
                在线
              </el-tag>
              <el-tag v-else-if="dataNear.device.online===0" type="info" effect="dark"> 离线</el-tag>
              <!-- <el-tag v-else type="info" effect="dark"> 未知</el-tag> -->
              <!-- <el-tag v-else-if="dataNear.online==='故障'" type="danger" effect="dark">故障</el-tag> -->
            </div>
            <div class="flex-item text-right">
              <el-button :loading="WSloading" type="primary" size="small" @click="onQueryNear">
                手动检测
              </el-button>
              <el-button type="danger" size="small">
                核销故障
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
              <el-button :loading="WSloading" type="primary" size="small" @click="onQueryFar">
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
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataNear.device.shouguanggonglv===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataNear.device.shouguanggonglv===1"  type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  发光功率状态
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataNear.device.faguanggonglv===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataNear.device.faguanggonglv===1"  type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  UPS警告
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <!-- ups 告警 = 00  =   绿色正常 -->
                    <el-tag class="home-item__tag" v-if="dataNear.device.upsgaojing===0" type="success" effect="dark"></el-tag>
                    <!-- ups告警  = 01   =  告警红色。 -->
                    <el-tag class="home-item__tag" v-else-if="dataNear.device.upsgaojing===1"  type="danger" effect="dark"></el-tag>
                     <!-- 255 = FF =   超时 -->
                    <el-tag class="home-item__tag" v-else-if="dataNear.device.upsgaojing===255" type="info" effect="dark"></el-tag>
                  </div>
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
                  <el-tag class="home-item__tag" type="success" effect="dark"></el-tag> <span class="home-tagtext">正常</span>
                  <el-tag class="home-item__tag" type="danger" effect="dark"></el-tag>  <span class="home-tagtext">故障</span>
                  <el-tag class="home-item__tag" type="info" effect="dark"></el-tag>  <span class="home-tagtext">未响应</span>

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
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataFar.device.faguanggaojing===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataFar.device.faguanggaojing===1"  type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  收光警告
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataFar.device.shouguanggaojing===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataFar.device.shouguanggaojing===1"  type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  功放状态-故障告警
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataFar.device.guzhanggaojing===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataFar.device.guzhanggaojing===1"  type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  功放状态-驻波比告警
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataFar.device.zhubobigaojing===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataFar.device.zhubobigaojing===1"  type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  功放状态-过温告警
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataFar.device.guowengaojing===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataFar.device.guowengaojing===1"  type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  功放状态-过功率告警
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataFar.device.guogonglvgaojing===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataFar.device.guogonglvgaojing===1" type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  上行故障
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataFar.device.shangxingguzhang===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataFar.device.shangxingguzhang===1"  type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  UPS警告
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <el-tag class="home-item__tag" type="warning" effect="dark"></el-tag>
                  </div>
                  <div v-show="!WSloading">
                    <el-tag class="home-item__tag" v-if="dataFar.device.upsgaojing===0" type="success" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else-if="dataFar.device.upsgaojing===1"  type="danger" effect="dark"></el-tag>
                    <el-tag class="home-item__tag" v-else type="info" effect="dark"></el-tag>
                  </div>
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
                  <el-tag class="home-item__tag" type="success" effect="dark"></el-tag> <span class="home-tagtext">正常</span>
                  <el-tag class="home-item__tag" type="danger" effect="dark"></el-tag>  <span class="home-tagtext">故障</span>
                  <el-tag class="home-item__tag" type="info" effect="dark"></el-tag>  <span class="home-tagtext">未响应</span>
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
import { formatDate } from '@/utils/utils'
import { ws } from '@/mixins/webSocket'
import { getTree } from '@/api/get'
import { getDetailFar, getDetailNear, updateMoveNear, updateMoveFar } from '@/api/home'
export default {
  name: 'home',
  // overTimeInit
  mixins: [ws],
  data () {
    return {
      overTime: null,
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
      dragActive: [],
      equipmentData: [],
      equipmentActive: {}
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
      document.getElementById('img').onmousedown = function (e) {
        e.preventDefault()
      }
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

          this.equipmentData.push({
            deviceName: e.near.deviceName,
            deviceId: e.near.deviceId,
            id: e.near.id,
            deviceAddress: e.near.deviceAddress,
            level: 1,
            locationX: e.near.locationX,
            locationY: e.near.locationY,
            alert: 0,
            treeId: e.near.id
          })

          e.far.forEach(o => {
            console.log(o)
            this.equipmentData.push({
              deviceName: o.deviceName,
              deviceId: o.deviceId,
              id: o.id,
              deviceAddress: o.deviceAddress,
              level: 2,
              deviceNearId: o.deviceNearId,
              locationX: o.locationX,
              locationY: o.locationY,
              alert: 0,
              treeId: o.deviceNearId + '-' + o.id
            })
          })
        })

        this.treeData.forEach(e => {
          e.children.forEach(o => {
            o.treeId = o.deviceNearId + '-' + o.id
          })
        })
      })
    },
    onQueryNear () { // 近端机查询
      // this.overTimeRun()
      this.WSloading = true
      this.WSloadingText = '检测中'
      this.$webSocket.Send({
        commandString: 'CN',
        nearDevice: {
          deviceId: this.deviceId
        }
      })
    },
    onQueryFar () { // 远端机查询
      // this.overTimeRun()
      this.WSloading = true
      this.WSloadingText = '检测中'
      this.$webSocket.Send({
        commandString: 'CF',
        farDevice: {
          deviceId: this.deviceId,
          deviceNearId: this.deviceIdNear // 父级近端机
        }
      })
    },
    websocketonMessage (e) {
      this.WSloading = false
      this.clearOverTime()
      // this.overTimeClear()
      // this.$webSocket.getStatus()
      const redata = JSON.parse(e.data)
      console.log(redata, 9999)
      this.websocketonMessageAll(redata)

      // 近端机报警  更新树状图的报警灯泡
      if (redata.commandString === 'WN') {
        this.treeData.forEach(e => {
          if (e.deviceId === redata.nearDevice.deviceId) {
            e.alert = 1
            this.treeData = [...this.treeData]
          }
        })

        this.equipmentData.forEach(e => {
          if (e.level === 1) {
            if (e.deviceId === redata.nearDevice.deviceId) {
              e.alert = 1
              this.equipmentData = [...this.equipmentData]
            }
          }
        })

        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
          if (String(this.dataNear.device.deviceTime).length === 13) {
            this.dataNear.device.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.dataNear.device.deviceTime))
          }
        }
      } else if (redata.commandString === 'WF') {
        // 远端机报警  更新树状图的报警灯泡
        this.treeData.forEach(e => {
          e.children.forEach(o => {
            if (o.deviceId === redata.farDevice.deviceId) {
              o.alert = 1
              this.treeData = [...this.treeData]
            }
          })
        })

        this.equipmentData.forEach(e => {
          // if (e.level === 2) {
          if (e.deviceNearId === redata.farDevice.deviceNearId) {
            if (e.deviceId === redata.farDevice.deviceId) {
              e.alert = 1
              this.equipmentData = [...this.equipmentData]
            }
          }
        })

        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
          if (String(this.dataFar.device.deviceTime).length === 13) {
            this.dataFar.device.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.dataFar.device.deviceTime))
          }
        }
      } else if (redata.commandString === 'TRN') {
        // 近端机修复故障  更新树状图的报警灯泡
        this.treeData.forEach(e => {
          e.children.forEach(o => {
            if (o.deviceId === redata.nearDevice.deviceId) {
              o.alert = 0
              this.treeData = [...this.treeData]
            }
          })
        })

        this.equipmentData.forEach(e => {
          if (e.level === 1) {
            if (e.deviceId === redata.nearDevice.deviceId) {
              e.alert = 0
              this.equipmentData = [...this.equipmentData]
            }
          }
        })

        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
          if (String(this.dataNear.device.deviceTime).length === 13) {
            this.dataNear.device.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.dataNear.device.deviceTime))
          }
        }
      } else if (redata.commandString === 'TRF') {
        // 远端机修复故障  更新树状图的报警灯泡
        this.treeData.forEach(e => {
          e.children.forEach(o => {
            if (o.deviceId === redata.farDevice.deviceId) {
              o.alert = 0
              this.treeData = [...this.treeData]
            }
          })
        })

        this.equipmentData.forEach(e => {
          // if (e.level === 2) {
          if (e.deviceNearId === redata.farDevice.deviceNearId) {
            if (e.deviceId === redata.farDevice.deviceId) {
              e.alert = 0
              this.equipmentData = [...this.equipmentData]
            }
          }
        })

        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
          if (String(this.dataFar.device.deviceTime).length === 13) {
            this.dataFar.device.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.dataFar.device.deviceTime))
          }
        }
      } else if (redata.commandString === 'SCN') {
        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
          if (String(this.dataNear.device.deviceTime).length === 13) {
            this.dataNear.device.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.dataNear.device.deviceTime))
          }
        }
        this.$message({
          message: '检测成功',
          type: 'success'
        })
        this.WSloadingState = 1
        this.WSloadingText = '检测完毕'
      } else if (redata.commandString === 'SCF') {
        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
          if (String(this.dataFar.device.deviceTime).length === 13) {
            this.dataFar.device.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.dataFar.device.deviceTime))
          }
        }
        this.$message({
          message: '检测成功',
          type: 'success'
        })
        this.WSloadingState = 1
        this.WSloadingText = '检测完毕'
      }
    },
    handleNodeClick (data) {
      this.homeType = data.level || 2
      console.log(data)
      this.deviceId = data.id
      this.loading = true
      this.WSloadingState = 0
      this.WSloadingText = ''
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
    },
    move (e) {
      e.preventDefault()
      // 获取元素
      var left = document.querySelector('.viewimg-left')
      var img = document.querySelector('.viewimg-img')
      var x = e.pageX - img.offsetLeft
      var y = e.pageY - img.offsetTop
      // 添加鼠标移动事件
      left.addEventListener('mousemove', move)
      function move (e) {
        img.style.left = e.pageX - x + 'px'
        img.style.top = e.pageY - y + 'px'
      }
      // 添加鼠标抬起事件，鼠标抬起，将事件移除
      img.addEventListener('mouseup', function () {
        left.removeEventListener('mousemove', move)
      })
      // 鼠标离开父级元素，把事件移除
      left.addEventListener('mouseout', function () {
        left.removeEventListener('mousemove', move)
      })
    },
    // 缩放图片
    rollImg () {
      /* 获取当前页面的缩放比 若未设置zoom缩放比，则为默认100%，即1，原图大小 */

      var zoom = parseInt(this.$refs.imgDiv.style.zoom) || 100
      /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动 */

      zoom += event.wheelDelta / 12
      /* 最小范围 和 最大范围 的图片缩放尺度 */

      if (zoom >= 80 && zoom < 500) {
        this.$refs.imgDiv.style.zoom = zoom + '%'
      }
      return false
    },
    onDragging (item) {
      this.equipmentActive = item
      console.log(item)
    },
    onDragstop (left, top) {
      console.log(left, top)
      if (this.equipmentActive.level === 1) {
        updateMoveNear({
          x: left,
          y: top,
          id: this.equipmentActive.id
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
        })
      } else if (this.equipmentActive.level === 2) {
        updateMoveFar({
          x: left,
          y: top,
          id: this.equipmentActive.id
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
        })
      }
    },
    getRefLineParams (params) {
      console.log(111)
      console.log(params)
    }
  },
  watch: {
    WSloading (val) {
      if (val) {
        this.overTime = setTimeout(() => {
          this.WSloading = false
          this.WSloadingState = 2
          this.WSloadingText = '检测超时'
          this.$message.error('检测超时')
          // 近端机
          // this.dataNear.device.online = 0
          this.dataNear.device.shouguanggonglv = 99
          this.dataNear.device.faguanggonglv = 99
          this.dataNear.device.upsgaojing = 99

          // 远端机
          // this.dataFar.device.online = 0
          this.dataFar.device.faguanggaojing = 99
          this.dataFar.device.shouguanggaojing = 99
          this.dataFar.device.guzhanggaojing = 99
          this.dataFar.device.zhubobigaojing = 99
          this.dataFar.device.guowengaojing = 99
          this.dataFar.device.guogonglvgaojing = 99
          this.dataFar.device.shangxingguzhang = 99
          this.dataFar.device.upsgaojing = 99
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

  .home-right {
    height: 100%;
  }

  .viewimg-left {
    position: relative;
    float: left;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: hidden;
    background-color: #fff;
  }

  .viewimg-img {
    position: absolute;
    top: 5px;
    left: 7px;
    max-width: 923px;
    max-height: 460px;
    cursor: move;
  }

</style>
