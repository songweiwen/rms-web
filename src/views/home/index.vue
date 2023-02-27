<template>
  <div class="page">
    <!-- <el-button v-if="notifyList.length !== 0" type="primary" class="closeNotify" @click="closeNotify">
      一键关闭
    </el-button> -->
    <div class="page-container">
      <div class="home">
        <div class="home-left">
          <div class="home-tree" v-show="WSloading"></div>
          <el-tree
            ref="treeDom"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :data="treeData"
            :props="defaultProps"
            :current-node-key="treeActive"
            highlight-current
            @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i v-if="data.level===1" class="iconfont icon-yuanduanji"></i>
                <i v-else class="iconfont icon-jinduanji"></i>
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
                <!-- 根据 每个设备的online决定   绿色在线1  红色报警2  灰色不在线0 -->
                <template v-if="data.level===1">
                  <span v-if="data.online===1" class="el-tag el-tag--success el-tag--dark"></span>
                  <span v-else-if="data.online===0" class="el-tag el-tag--info el-tag--dark"></span>
                  <span v-else-if="data.online===2" class="el-tag el-tag--danger el-tag--dark" :class="{
                   shanshuo: data.shanshuo===1
                  }"></span>
                </template>
                <!-- {{data.shanshuo}} -->
                <!-- {{data.shanshuo===1}} -->
                <!-- <span v-if="data.alert===1" class="el-tag el-tag--danger el-tag--dark"></span> -->
                <!-- 1 -->
                <!-- <el-tag v-if="data.online===1" type="danger" effect="dark"></span>  -->
                <!-- <el-tag v-if="node.device.faguanggonglv===0" type="success" effect="dark"></span>
                <el-tag v-else-if="node.device.faguanggonglv===1"  type="info" effect="dark"></span>
                <el-tag v-else type="danger" effect="dark"></span> -->
              </span>
            </span>
          </el-tree>
          <!-- <el-button type="primary" @click="onShanshuoNear">近端机闪烁</el-button>
          <el-button type="primary" @click="onShanshuoFar">远端机闪烁</el-button>
          <el-button type="primary" @click="onShanshuoNearClose">近端机闪烁关闭</el-button>
          <el-button type="primary" @click="onShanshuoFarClose">远端机闪烁关闭</el-button> -->
        </div>
        <div class="home-right" style="width: 100%;" v-show="!deviceId">
           <div class="flex-container">
            <!-- <div class="flex-item p-b-md">
              <marquee-text :duration="15" :repeat="1" v-show="reservedShow"  class="text-right">
                <template v-if="reserved==='巡检开始'">
                  <el-tag
                    class="m-r-md"
                    type="success"
                    effect="dark">
                    {{ reserved }}
                  </span>
                </template>
                <template v-else-if="reserved==='巡检结束'">
                  <el-tag
                    class="m-r-md"
                    effect="dark">
                    {{ reserved }}
                  </span>
                </template>
              </marquee-text>
            </div> -->
          </div>
          <!-- <div class="viewimg-left" @mousewheel.prevent="rollImg">
            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170521%2F8b45d8c26664406ebf5c2df273086bc8_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618925314&t=0a42ba8e7a4ac7c39c60f459916c4f69" class="viewimg-img" ref="imgDiv" @mousedown="move" />
          </div> -->
          <div id="equipment" :style="{width: homeWH[0] + 'px', height: homeWH[1] + 'px'}">
          <div style="position: absolute; bottom: 0; right: 100px">
            <el-button type="primary" v-for="(item, index) in homeWHArr" :key="index" @click="setWH(item)">
              {{item.title}}
            </el-button>
          </div>
          <span v-if="userInfo.userName==='admin'" style="position: absolute; bottom: 0;" >
          拖拽开关：
          </span>
            <el-radio-group style="position: absolute; bottom: 0; left: 70px; z-index: 99;" v-if="userInfo.userName==='admin'" v-model="dragBool" size="mini">
              <el-radio-button  :label="0">关</el-radio-button>
              <el-radio-button  :label="1">开</el-radio-button>
            </el-radio-group>

            <!-- 修改图片路径 -->
            <!-- {{process.env.HOME_IMG}} -->
            <!-- <img id="img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170521%2F8b45d8c26664406ebf5c2df273086bc8_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618925314&t=0a42ba8e7a4ac7c39c60f459916c4f69" alt="" srcset=""> -->
            <img id="img" :src="homeImg" />
            <!-- <img id="img" :src="require('@/assets/imgs/demo_picture.png')" /> -->
            <vue-draggable-resizable
              class="equipmentBox-darg"
              v-for="(item, index) in equipmentData"
              :key="index"
              :parent="true"
              :handles="dragActive"
              :w="48"
              :h="48"
              :snap="true"
              :y="item.locationY"
              :x="item.locationX"
              drag-handle=".equipmentBox"
              :is-conflict-check="true"
              :draggable="dragBool===1"
              @dragging="onDragging(item)"
              @dragstop="onDragstop">
              <!-- <div class="equipmentBox"
                :class="{
                  'equipmentBox--near': item.level===1,
                'equipmentBox--far': item.level===2,
                'equipmentBox--info': item.online===0,
                'equipmentBox--success': item.online===1,
                'equipmentBox--dagder': item.online===2,
                'shanshuo': item.shanshuo===1 }"
              >
              </div> -->
              <div class="equipmentBox"
                :class="{
                'equipmentBox--near': item.level===1,
                'equipmentBox--far': item.level===2,
                'equipmentBox--info': item.online===0,
                'equipmentBox--success': item.online===1,
                'equipmentBox--dagder': item.online===2,
                'shanshuo': item.online===2?item.shanshuo===1:'' }">
                <!-- {{item.deviceName}} -->
                 <el-popover
                  placement="top"
                  ref="popover"
                  width="200"
                  trigger="hover">
                  <div class="text-left">
                    <div>设备名称： {{item.deviceName}}</div>
                    <div>设备ID： {{item.deviceId}}</div>
                    <div v-if="item.level===2">所属近端机： {{item.deviceNearId}}</div>
                  </div>
                  <div class="text-center">
                    <el-button class="m-t-md" @click.stop="goTree(item)" type="primary" size="mini">查询</el-button>
                  </div>
                  <div slot="reference">
                    <i v-if="item.level===2" class="iconfont icon-yuanduanji"></i>
                    <i v-else class="iconfont icon-jinduanji"></i>
                    <div v-if="item.level === 2"> {{item.deviceName}} </div>
                    <div v-else>
                      <template v-if="item.online===0">
                        离线
                      </template>
                      <template v-else-if="item.online===1">
                        在线
                      </template>
                      <template v-else-if="item.online===2">
                        报警
                      </template>
                    </div>
                  </div>
                </el-popover>
              </div>
            </vue-draggable-resizable>
          </div>

        </div>
        <div class="home-right" style="width: 850px;" v-show="deviceId">
          <div class="flex-container">
            <div>
              <el-button v-show="deviceId"  type="primary" @click="deviceId=''">  <i class="el-icon-back"></i> 返回布局图 </el-button>
            </div>
            <!-- <div class="flex-item p-l-lg">
              <marquee-text :duration="5" :repeat="1" v-show="reservedShow" class="text-right">
                <template v-if="reserved==='巡检开始'">
                  <el-tag
                    class="m-r-md"
                    type="success"
                    effect="dark">
                    {{ reserved }}
                  </span>
                </template>
                <template v-else-if="reserved==='巡检结束'">
                  <el-tag
                    class="m-r-md"
                    effect="dark">
                    {{ reserved }}
                  </span>
                </template>
              </marquee-text>
            </div> -->
          </div>
          <div class="flex-container" v-show="homeType===1">
            <div class="flex-item m-r-md p-t-md">
              在线状态：
              <el-tag v-if="dataNear.device.online===1" type="success" effect="dark">
                在线
              </el-tag>
              <el-tag v-else-if="dataNear.device.online===0" type="info" effect="dark"> 离线</el-tag>
              <el-tag v-else-if="dataNear.device.online===2" type="success" effect="dark"> 在线</el-tag>
              <!-- <el-tag v-else type="info" effect="dark"> 未知</span> -->
              <!-- <el-tag v-else-if="dataNear.online==='故障'" type="danger" effect="dark">故障</span> -->
            </div>
            <div class="flex-item text-right">
              <el-button :loading="WSloading" :disabled ="dataNear.device.online ===0?true:xunjianDisabled" type="primary" @click="onQueryNear">
                手动检测
              </el-button>
              <el-button type="danger" :disabled ="dataNear.device.shanshuo === 0" @click="onWorkoutNear">
                核销故障
              </el-button>
            </div>
          </div>
          <div class="flex-container" v-show="homeType===2">

            <!-- <div class="flex-item m-r-md">
              在线状态：
              <el-tag v-if="dataFar.device.online===1" type="success" effect="dark">
                在线
              </span>
              <el-tag v-else-if="dataFar.device.online===0" type="info" effect="dark"> 离线</span>
            </div> -->
            <div class="flex-item text-right">
              <el-button :loading="WSloading" :disabled ="dataFar.device.deviceNearOnline  === 0?true:xunjianDisabled" type="primary" @click="onQueryFar">
                手动检测
              </el-button>
              <el-button type="danger" :disabled ="dataFar.device.shanshuo === 0" @click="onWorkoutFar">
                核销故障
              </el-button>
            </div>
          </div>
          <!-- 近端机第一代 -->
          <template v-if="dataNear.device.deviceLevel===1">
            <el-card class="home-card m-t-md m-b-md" v-show="homeType===1" v-loading="loading">
              <div slot="header" class="clearfix">
                <div class="page-title">
                  {{dataNear.device.deviceName}}
                  <span>
                    {{dataNear.device.deviceAddress}}
                  </span>
                  <div v-show="testing" class="page-title__state">
                    <el-tag
                      v-if="WSloadingState===0"
                      type="warning"
                      class="tag-big">
                      <i class="el-icon-loading"></i>
                      {{WSloadingText}}
                    </el-tag>
                    <el-tag
                      v-else-if="WSloadingState===1"
                      type="success"
                      class="tag-big">
                      <i class="el-icon-check"></i>
                      {{WSloadingText}}
                    </el-tag>
                    <el-tag
                      v-else-if="WSloadingState===2"
                      type="danger"
                      class="tag-big">
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
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.shouguanggonglv===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    <template v-else-if="dataNear.device.shouguanggonglv===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                    </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    发光功率状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.faguanggonglv===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                    </template>
                    <template v-else-if="dataNear.device.faguanggonglv===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    UPS状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.upsgaojing===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.upsgaojing===1" >
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.upsgaojing===2">
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
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
                    状态说明
                  </el-col>
                  <el-col :span="12">
                    <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span> <span class="home-tagtext">  正常</span>
                    <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span>  <span class="home-tagtext">  故障</span>
                    <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span>  <span class="home-tagtext" >超时/未连接</span>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </template>
          <!-- 近端机第二代 -->
          <template v-else-if="dataNear.device.deviceLevel===2">
            <el-card class="home-card m-t-md m-b-md" v-show="homeType===1" v-loading="loading">
              <div slot="header" class="clearfix">
                <div class="page-title">
                  {{dataNear.device.deviceName}}
                  <span>
                    {{dataNear.device.deviceAddress}}
                  </span>
                  <div v-show="testing" class="page-title__state">
                    <el-tag
                      v-if="WSloadingState===0"
                      type="warning"
                      class="tag-big">
                      <i class="el-icon-loading"></i>
                      {{WSloadingText}}
                    </el-tag>
                    <el-tag
                      v-else-if="WSloadingState===1"
                      type="success"
                      class="tag-big">
                      <i class="el-icon-check"></i>
                      {{WSloadingText}}
                    </el-tag>
                    <el-tag
                      v-else-if="WSloadingState===2"
                      type="danger"
                      class="tag-big">
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
                    1号光模块收光功率状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.shouguanggonglv===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv===254">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    1号光模块发光功率状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.faguanggonglv===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv===254">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    2号光模块收光功率状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.shouguanggonglv2===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv2===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv2===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv2===254">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    2号光模块发光功率状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.faguanggonglv2===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv2===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv2===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv2===254">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv2===2">
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    3号光模块收光功率状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.shouguanggonglv3===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv3===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv3===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv3===254">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    3号光模块发光功率状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.faguanggonglv3===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv3===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv3===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv3===254">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    4号光模块收光功率状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.shouguanggonglv4===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv4===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv4===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                      <template v-else-if="dataNear.device.shouguanggonglv4===254">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    4号光模块发光功率状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.faguanggonglv4===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv4===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv4===255">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                      <template v-else-if="dataNear.device.faguanggonglv4===254">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    UPS状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataNear.device.upsgaojing===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataNear.device.upsgaojing===1" >
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataNear.device.upsgaojing===2">
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <template v-if="dataNear.device.deviceLevel===2">
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="12">
                      电源套数
                    </el-col>
                    <el-col :span="12">
                      <div v-show="WSloading">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                      </div>
                      <div v-show="!WSloading">
                        <template v-if="dataNear.device.dianyuan===0">
                          <span class="home-tagtext" style="margin-left:30px">  单套电源</span>
                        </template>
                        <template v-else-if="dataNear.device.dianyuan===1">
                          <span class="home-tagtext" style="margin-left:30px">  双套电源</span>
                        </template>
                        <template v-else>
                          <span class="home-tagtext" style="margin-left:30px">  超时</span>
                        </template>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="12">
                      主路电源状态
                    </el-col>
                    <el-col :span="12">
                      <div v-show="WSloading">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                      </div>
                      <div v-show="!WSloading">
                        <template v-if="dataNear.device.zhuludianyuanzhuangtai===0">
                          <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                        </template>
                        <template v-else-if="dataNear.device.zhuludianyuanzhuangtai===1">
                          <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                        </template>
                        <template v-else>
                          <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                        </template>
                      </div>
                    </el-col>
                  </el-row>
                  <template v-if="dataNear.device.dianyuan===1">
                    <el-row type="flex" class="home-item" align="middle">
                      <el-col :span="12">
                        备路电源状态
                      </el-col>
                      <el-col :span="12">
                        <div v-show="WSloading">
                          <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                        </div>
                        <div v-show="!WSloading">
                          <template v-if="dataNear.device.beiludianyuanzhuangtai===0">
                            <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                          </template>
                          <template v-else-if="dataNear.device.beiludianyuanzhuangtai===1">
                            <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                          </template>
                          <template v-else>
                            <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                          </template>
                        </div>
                      </el-col>
                    </el-row>
                  </template>
                </template>

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
                    状态说明
                  </el-col>
                  <el-col :span="12">
                    <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span> <span class="home-tagtext">  正常</span>
                    <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span>  <span class="home-tagtext">  故障</span>
                    <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span>  <span class="home-tagtext" >超时/未连接</span>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </template>
          <el-card class="home-card m-t-md m-b-md" v-show="homeType===2" v-loading="loading">
            <div slot="header" class="clearfix">
              <div class="page-title">
                {{dataFar.device.deviceName}}
                <span>
                  {{dataFar.device.deviceAddress}}
                </span>
                <div v-show="testing" class="page-title__state">
                  <el-tag
                    v-if="WSloadingState===0"
                    type="warning"
                    class="tag-big">
                    <i class="el-icon-loading"></i>
                    {{WSloadingText}}
                  </el-tag>
                  <el-tag
                    v-else-if="WSloadingState===1"
                    type="success"
                    class="tag-big">
                    <i class="el-icon-check"></i>
                    {{WSloadingText}}
                  </el-tag>
                  <el-tag
                    v-else-if="WSloadingState===2"
                    type="danger"
                    class="tag-big">
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
                  {{dataFar.device.deviceLevel===2?'1号光模块':''}}发光状态
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                  </div>
                  <div v-show="!WSloading">
                    <template v-if="dataFar.device.faguanggaojing===0">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                    </template>
                    <template v-else-if="dataFar.device.faguanggaojing===1">
                      <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                    </template>
                    <template v-else>
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                    </template>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  {{dataFar.device.deviceLevel===2?'1号光模块':''}}收光状态
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                  </div>
                  <div v-show="!WSloading">
                    <template v-if="dataFar.device.shouguanggaojing===0">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                    </template>
                    <template v-else-if="dataFar.device.shouguanggaojing===1">
                      <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                    </template>
                    <template v-else>
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                    </template>
                  </div>
                </el-col>
              </el-row>

              <template v-if="dataFar.device.deviceLevel===2">
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    {{dataFar.device.deviceLevel===2?'2号光模块':''}}发光状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataFar.device.faguanggaojing2===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataFar.device.faguanggaojing2===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    {{dataFar.device.deviceLevel===2?'2号光模块':''}}收光状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataFar.device.shouguanggaojing2===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataFar.device.shouguanggaojing2===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
              </template>

              <!-- <el-row class="home-class">
                <el-col :span="dataFar.device.deviceLevel===2?24:24"> -->
                  <!-- 主路 -->
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      {{dataFar.device.deviceLevel===2?'主路':''}}功放状态-故障告警
                    </el-col>
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      <div v-show="WSloading">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                      </div>
                      <div v-show="!WSloading">
                        <template v-if="dataFar.device.guzhanggaojing===0">
                          <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                        </template>
                        <template v-else-if="dataFar.device.guzhanggaojing===1">
                          <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                        </template>
                        <template v-else>
                          <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                        </template>
                      </div>
                    </el-col>
                  </el-row>

                <!-- 备路 -->
                <template v-if="dataFar.device.deviceLevel===2">
                  <!-- <el-col :span="24"> -->
                    <el-row type="flex" class="home-item" align="middle">
                      <el-col :span="12">
                        备路功放状态-故障告警
                      </el-col>
                      <el-col :span="12">
                        <div v-show="WSloading">
                          <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                        </div>
                        <div v-show="!WSloading">
                          <template v-if="dataFar.device.guzhanggaojing2===0">
                            <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                          </template>
                          <template v-else-if="dataFar.device.guzhanggaojing2===1">
                            <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                          </template>
                          <template v-else>
                            <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                          </template>
                        </div>
                      </el-col>
                    </el-row>
                  <!-- </el-col> -->
                </template>

                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      {{dataFar.device.deviceLevel===2?'':''}}功放状态-驻波比告警
                    </el-col>
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      <div v-show="WSloading">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                      </div>
                      <div v-show="!WSloading">
                        <template v-if="dataFar.device.zhubobigaojing===0">
                          <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                        </template>
                        <template v-else-if="dataFar.device.zhubobigaojing===1">
                          <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                        </template>
                        <template v-else>
                          <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                        </template>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      {{dataFar.device.deviceLevel===2?'':''}}功放状态-过温告警
                    </el-col>
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      <div v-show="WSloading">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                      </div>
                      <div v-show="!WSloading">
                        <template v-if="dataFar.device.guowengaojing===0">
                          <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                        </template>
                        <template v-else-if="dataFar.device.guowengaojing===1">
                          <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                        </template>
                        <template v-else>
                          <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                        </template>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      {{dataFar.device.deviceLevel===2?'':''}}功放状态-过功率告警
                    </el-col>
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      <div v-show="WSloading">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                      </div>
                      <div v-show="!WSloading">
                        <template v-if="dataFar.device.guogonglvgaojing===0">
                          <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                        </template>
                        <template v-else-if="dataFar.device.guogonglvgaojing===1">
                          <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                        </template>
                        <template v-else>
                          <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                        </template>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      {{dataFar.device.deviceLevel===2?'':''}}上行故障
                    </el-col>
                    <el-col :span="dataFar.device.deviceLevel===2?12:12">
                      <div v-show="WSloading">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                      </div>
                      <div v-show="!WSloading">
                        <template v-if="dataFar.device.shangxingguzhang===0">
                          <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                        </template>
                        <template v-else-if="dataFar.device.shangxingguzhang===1">
                          <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                        </template>
                        <template v-else>
                          <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                        </template>
                      </div>
                    </el-col>
                  </el-row>
                <!-- </el-col>
              </el-row> -->

              <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  UPS状态
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                  </div>
                  <div v-show="!WSloading">
                    <template v-if="dataFar.device.upsgaojing===0">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                    </template>
                    <template v-else-if="dataFar.device.upsgaojing===1">
                      <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                    </template>
                    <template v-else-if="dataFar.device.upsgaojing===2">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                    </template>
                    <template v-else>
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                    </template>
                  </div>
                </el-col>
              </el-row>
              <template v-if="dataFar.device.deviceLevel===2">
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    电源套数
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataFar.device.shuangludianyuan===0">
                        <span class="home-tagtext" style="margin-left:30px">  单套电源</span>
                      </template>
                      <template v-else-if="dataFar.device.shuangludianyuan===1">
                        <span class="home-tagtext" style="margin-left:30px">  双套电源</span>
                      </template>
                      <template v-else-if="dataFar.device.shuangludianyuan===2">
                        <span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    功放套数
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataFar.device.gongfangtaoshu===0">
                        <span class="home-tagtext" style="margin-left:30px">  单套功放</span>
                      </template>
                      <template v-else-if="dataFar.device.gongfangtaoshu===1">
                        <span class="home-tagtext" style="margin-left:30px">  双套功放</span>
                      </template>
                      <template v-else-if="dataFar.device.gongfangtaoshu===2">
                        <span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    主路功放电源状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataFar.device.gongfangdianyuan1===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataFar.device.gongfangdianyuan1===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataFar.device.gongfangdianyuan1===2">
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="12">
                    备路功放电源状态
                  </el-col>
                  <el-col :span="12">
                    <div v-show="WSloading">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                    </div>
                    <div v-show="!WSloading">
                      <template v-if="dataFar.device.gongfangdianyuan2===0">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                      </template>
                      <template v-else-if="dataFar.device.gongfangdianyuan2===1">
                        <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                      </template>
                      <template v-else-if="dataFar.device.gongfangdianyuan2===2">
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                      </template>
                      <template v-else>
                        <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                <el-col :span="12">
                  主路电源状态
                </el-col>
                <el-col :span="12">
                  <div v-show="WSloading">
                    <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                  </div>
                  <div v-show="!WSloading">
                    <template v-if="dataFar.device.zhuludianyuanzhuangtai===0">
                      <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                    </template>
                    <template v-else-if="dataFar.device.zhuludianyuanzhuangtai===1">
                      <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                    </template>
                    <template v-else-if="dataFar.device.zhuludianyuanzhuangtai===2">
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                    </template>
                    <template v-else>
                      <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                    </template>
                  </div>
                </el-col>
              </el-row>
                <template v-if="dataFar.device.shuangludianyuan ===1">
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="12">
                      备路电源状态
                    </el-col>
                    <el-col :span="12">
                      <div v-show="WSloading">
                        <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="warning" effect="dark"></span>
                      </div>
                      <div v-show="!WSloading">
                        <template v-if="dataFar.device.beiludianyuanzhuangtai===0">
                          <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  正常</span>
                        </template>
                        <template v-else-if="dataFar.device.beiludianyuanzhuangtai===1">
                          <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  故障</span>
                        </template>
                        <template v-else-if="dataFar.device.beiludianyuanzhuangtai===2">
                          <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  未连接</span>
                        </template>
                        <template v-else>
                          <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span><span class="home-tagtext" style="margin-left:30px">  超时</span>
                        </template>
                      </div>
                    </el-col>
                  </el-row>
                </template>
              </template>
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
                  状态说明
                </el-col>
                <el-col :span="12">
                  <span class="home-item__tag el-tag el-tag--success el-tag--dark" type="success" effect="dark"></span> <span class="home-tagtext">正常</span>
                  <span class="home-item__tag el-tag el-tag--danger el-tag--dark" type="danger" effect="dark"></span>  <span class="home-tagtext">故障</span>
                  <span class="home-item__tag el-tag el-tag--info el-tag--dark" type="info" effect="dark"></span>  <span class="home-tagtext">超时/未连接</span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dragVisible"
      width="500px"
      :before-close="dragClose"
      >
      <el-form :model="editForm" :rules="editRules" ref="editRuleForm">
        <el-form-item label="输入密码" prop="userPassword" label-width="120px">
          <el-input v-model="editForm.userPassword" placeholder="请输入当前密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dragClose">取 消</el-button>
        <el-button type="primary" @click="dragSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/utils/utils'
import { ws } from '@/mixins/webSocket'
import { getTree } from '@/api/get'
import { getDetailFar, getDetailNear, updateMoveNear, updateMoveFar, workoutNear, workoutFar } from '@/api/home'
export default {
  name: 'home',
  // overTimeInit
  mixins: [ws],
  data () {
    return {
      homeWH: [1000, 800],
      homeWHArr: [{
        w: 1000,
        h: 800,
        title: '正常'
      }, {
        w: 1400,
        h: 1000,
        title: '大'
      }, {
        w: 800,
        h: 600,
        title: '小'
      }],
      treeActive: [],
      reserved: '',
      reservedShow: true,
      isHome: true,
      homeImg: '',
      userInfo: this.$store.getters.userInfo.userInfo.userInfo,
      dragBool: 0,
      dragVisible: false,
      editRules: {
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      editForm: {
        password: '',
        newpassword: ''
      },
      overTime: null,
      WSloadingState: 0,
      WSloading: false,
      xunjianDisabled: false,
      WSloadingText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'deviceName'
      },
      loading: false,
      homeType: 1,
      id: '',
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
      this.homeImg = process.env.VUE_APP_HOME_IMG
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
    onShanshuoNear () { // 闪烁
      const data = {}
      data.nearDevice = this.equipmentData[0]
      data.type = 'shanshuo-OPENNEAR'
      data.commandString = 'shanhong-near'
      this.$webSocket.Send(data)
    },
    onShanshuoFar () { // 闪烁
      const data = {}
      data.farDevice = this.equipmentData[0]
      data.type = 'shanshuo-OPENNEAR'
      data.commandString = 'shanhong-far'
      this.$webSocket.Send(data)
    },
    onShanshuoNearClose () { // 闪烁
      const data = {}
      data.nearDevice = this.equipmentData[0]
      data.type = 'shanshuo-CLOSENEAR'
      data.commandString = 'shanhong-near'
      this.$webSocket.Send(data)
    },
    onShanshuoFarClose () { // 闪烁
      const data = {}
      data.farDevice = this.equipmentData[0]
      data.type = 'shanshuo-CLOSEFAR'
      data.commandString = 'shanhong-far'
      this.$webSocket.Send(data)
    },
    goTree (item) {
      console.log(item)
      if (item.level === 1) {
        this.$refs.treeDom.$el.children[item.treeIndex].className = 'el-tree-node is-expanded is-current is-focusable'
      } else if (item.level === 2) {
        console.log(this.$refs.treeDom.$el.children)
        // el-tree-node__children
        this.$refs.treeDom.$el.children[item.treeIndex].children[1].children[item.treeChildrenIndex].className = 'el-tree-node is-expanded is-current is-focusable  tree-active'
      }
      this.treeData = JSON.parse(JSON.stringify(this.treeData))
      this.handleNodeClick(item)
    },
    getTree () {
      getTree().then(res => {
        this.treeData = []
        this.equipmentData = []
        const treeData = res.data
        treeData.forEach((e, i) => {
          this.treeData.push({
            deviceName: e.near.deviceName,
            deviceId: e.near.deviceId,
            id: e.near.id,
            deviceAddress: e.near.deviceAddress,
            level: 1,
            children: e.far,
            treeId: e.near.deviceId,
            treeIndex: i,
            online: e.near.online,
            shanshuo: e.near.shanshuo
          })
          this.equipmentData.push({
            deviceName: e.near.deviceName,
            deviceId: e.near.deviceId,
            id: e.near.id,
            deviceAddress: e.near.deviceAddress,
            level: 1,
            locationX: e.near.locationX,
            locationY: e.near.locationY,
            treeId: e.near.deviceId,
            treeIndex: i,
            online: e.near.online,
            shanshuo: e.near.shanshuo
          })

          e.far.forEach((o, j) => {
            this.equipmentData.push({
              deviceName: o.deviceName,
              deviceId: o.deviceId,
              id: o.id,
              deviceAddress: o.deviceAddress,
              level: 2,
              deviceNearId: o.deviceNearId,
              locationX: o.locationX,
              locationY: o.locationY,
              treeId: o.deviceNearId + '-' + o.deviceId,
              treeIndex: i,
              treeChildrenIndex: j,
              online: o.online,
              shanshuo: o.shanshuo
            })
          })
        })

        this.treeData.forEach((e, i) => {
          e.children.forEach((o, j) => {
            o.treeId = o.deviceNearId + '-' + o.deviceId
            o.treeChildrenIndex = j
            o.treeIndex = i
            o.level = 2
          })
        })
      })
    },
    onQueryNear () { // 近端机查询
      // this.overTimeRun()
      this.checkNear()
      this.WSloading = true
      this.WSloadingText = '检测中'
      this.$webSocket.Send({
        commandString: 'CN',
        nearDevice: {
          deviceId: this.deviceId,
          deviceLevel: this.dataNear.device.deviceLevel,
          deviceProtocol: this.dataNear.device.deviceProtocol
        }
      })
    },
    onQueryFar () { // 远端机查询
      // this.overTimeRun()
      this.checkFar()
      this.WSloading = true
      this.WSloadingText = '检测中'
      this.$webSocket.Send({
        commandString: 'CF',
        farDevice: {
          deviceId: this.dataFar.device.deviceId,
          deviceNearId: this.dataFar.device.deviceLevel === 1 ? this.dataFar.device.deviceNearId : this.dataFar.device.deviceNearId, // 父级近端机
          deviceLevel: this.dataFar.device.deviceLevel,
          deviceNear2Id: this.dataFar.device.deviceNear2Id
        }
      })
    },
    websocketonMessage (e) {
      this.WSloading = false
      this.clearOverTime()
      // this.overTimeClear()
      // this.$webSocket.getStatus()
      const redata = JSON.parse(e.data)
      this.websocketonMessageAll(redata)

      // 近端机报警  更新树状图的报警灯泡
      if (redata.commandString === 'WN' || redata.commandString === 'CSSNAER') {
        this.treeData.forEach(e => {
          if (e.deviceId === redata.nearDevice.deviceId) {
            e = redata.nearDevice
            this.treeData = [...this.treeData]
          }
        })

        this.equipmentData.forEach(e => {
          if (e.level === 1) {
            if (e.deviceId === redata.nearDevice.deviceId) {
              e = redata.nearDevice
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
      } else if (redata.commandString === 'TON' || redata.commandString === 'CSSFAR') {
        this.treeData.forEach(e => {
          if (e.deviceId === redata.nearDevice.deviceId) {
            e = redata.nearDevice
            this.treeData = [...this.treeData]
          }
        })

        this.equipmentData.forEach(e => {
          if (e.level === 1) {
            if (e.deviceId === redata.nearDevice.deviceId) {
              e = redata.nearDevice
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
      } else if (redata.commandString === 'TOF' || redata.commandString === 'CSSFAR') {
        // 远端机报警  更新树状图的报警灯泡
        this.treeData.forEach(e => {
          e.children.forEach(o => {
            if (o.deviceId === redata.farDevice.deviceId) {
              o = redata.farDevice
              this.treeData = [...this.treeData]
            }
          })
        })

        this.equipmentData.forEach(e => {
          // if (e.level === 2) {
          if (e.deviceNearId === redata.farDevice.deviceNearId) {
            if (e.deviceId === redata.farDevice.deviceId) {
              e = redata.farDevice
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
      } else if (redata.commandString === 'WF' || redata.commandString === 'CSSFAR') {
        // 远端机报警  更新树状图的报警灯泡
        this.treeData.forEach(e => {
          e.children.forEach(o => {
            if (o.deviceId === redata.farDevice.deviceId) {
              o = redata.farDevice
              this.treeData = [...this.treeData]
            }
          })
        })

        this.equipmentData.forEach(e => {
          // if (e.level === 2) {
          if (e.deviceNearId === redata.farDevice.deviceNearId) {
            if (e.deviceId === redata.farDevice.deviceId) {
              e = redata.farDevice
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
              o = redata.nearDevice
              this.treeData = [...this.treeData]
            }
          })
        })

        this.equipmentData.forEach(e => {
          if (e.level === 1) {
            if (e.deviceId === redata.nearDevice.deviceId) {
              e = redata.nearDevice
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
              o = redata.farDevice
              this.treeData = [...this.treeData]
            }
          })
        })

        this.equipmentData.forEach(e => {
          // if (e.level === 2) {
          if (e.deviceNearId === redata.farDevice.deviceNearId) {
            if (e.deviceId === redata.farDevice.deviceId) {
              e = redata.farDevice
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
        this.checkNearSuccess()
        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
          if (String(this.dataNear.device.deviceTime).length === 13) {
            this.dataNear.device.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.dataNear.device.deviceTime))
          }
          this.treeData.forEach(e => {
            if (e.deviceId === redata.nearDevice.deviceId) {
              e = redata.nearDevice
              this.treeData = [...this.treeData]
            }
          })
        }
        // this.$message({
        //   message: '检测成功',
        //   type: 'success'
        // })
        this.WSloadingState = 1
        this.WSloadingText = '检测成功'
      } else if (redata.commandString === 'SCF') {
        this.checkFarSuccess()
        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
          if (String(this.dataFar.device.deviceTime).length === 13) {
            this.dataFar.device.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.dataFar.device.deviceTime))
          }
        }
        // this.$message({
        //   message: '检测成功',
        //   type: 'success'
        // })
        this.WSloadingState = 1
        this.WSloadingText = '检测成功'
      } else if (redata.commandString === 'OLN') {
        // this.treeData.forEach(e => {
        //   if (e.deviceId === redata.nearDevice.deviceId) {
        //     e = redata.nearDevice
        //     this.treeData = [...this.treeData]
        //   }
        // })
        console.log('上下线的过程中经过了这段代码')
        const treeData = JSON.parse(JSON.stringify(this.treeData))
        treeData.forEach((e, i) => {
          const data = redata.nearDevice
          if (e.deviceId === redata.nearDevice.deviceId) {
            e.deviceName = data.deviceName
            e.deviceId = data.deviceId
            e.id = data.id
            e.deviceAddress = data.deviceAddress
            e.treeId = data.deviceId
            e.treeIndex = i
            e.online = data.online
            e.shanshuo = data.shanshuo
          }
        })
        this.treeData = treeData
        this.equipmentData.forEach(e => {
          if (e.deviceId === redata.nearDevice.deviceId) {
            e = redata.nearDevice
            this.equipmentData = [...this.equipmentData]
          }
        })
        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
          if (String(this.dataNear.device.deviceTime).length === 13) {
            this.dataNear.device.deviceTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.dataNear.device.deviceTime))
          }
        }
      } else if (redata.commandString === 'xunjian') {
        this.reserved = redata.reserved
        this.$notify.success({
          /* eslint-disable */
          title: `巡检`,
          message: `${redata.reserved}`,
          duration: 3000
        })
        if (redata.reserved === '巡检开始') {
          this.xunjianStart()
          this.xunjianDisabled = true
        } else {
          this.xunjianEnd()
          this.xunjianDisabled = false
        }
      }
    },
    handleNodeClick (data) {
      this.WSloadingState = 0
      this.WSloading = false
      this.WSloadingText = ''
      this.homeType = data.level || 2
      this.id = data.id
      this.deviceId = data.deviceId
      this.loading = true
      this.WSloadingState = 0
      this.WSloadingText = ''

      if (this.homeType === 1) {
        this.deviceIdNear = null
        this.deviceNearId = null
        getDetailNear({
          id: this.id
        }).then(res => {
          const data = res.data
          this.dataNear = data
          this.treeData.forEach(e => {
            if (e.deviceId === data.deviceId) {
              e = data
              this.treeData = [...this.treeData]
            }
          })
          this.loading = false
        })
      } else if (this.homeType === 2) {
        this.deviceIdNear = data.deviceNearId
        this.deviceNearId = data.deviceNearId
        getDetailFar({
          id: this.id
        }).then(res => {
          const data = res.data
          this.dataFar = data
          this.loading = false
        })
      }
      // this.getTree()
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
      this.$refs.popover.forEach(e => {
        e.doClose()
      })
      // this.$refs.popover.doClose()
      // document.body.click()
      this.equipmentActive = item
    },
    onDragstop (left, top) {
      if (this.equipmentActive.level === 1) {
        updateMoveNear({
          x: left,
          y: top,
          id: this.equipmentActive.id
        }).then(res => {
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
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
        })
      }
    },
    getRefLineParams (params) {
    },
    dragClose () {
      this.dragVisible = false
      this.dragBool = 0
    },
    dragSubmit () {
      const pw = this.userInfo.userPassword
      if (pw === this.editForm.userPassword) {
        this.dragVisible = false
        this.dragBool = 1
        this.$message({
          message: '拖拽开启成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '密码不正确',
          type: 'error'
        })
      }
    },
    onWorkoutNear () {
      workoutNear({
        id: this.id
      }).then(res => {
        // this.$message({
        //   type: 'success',
        //   message: '核销成功!'
        // })
        if (res.data === '已核销!') {
          this.WSloadingState = 2
          this.WSloadingText = '已核销!'
        } else {
          const treeData = JSON.parse(JSON.stringify(this.treeData))
          treeData.forEach((e, i) => {
            if (e.deviceId === res.data.deviceId) {
              e.shanshuo = res.data.shanshuo
              // console.log(res.data)
              // this.treeData = JSON.parse(JSON.stringify(this.treeData))
              // console.log(e.deviceId)
              // console.log(this.treeData)
              // console.log(treeData)
            }
          })
          this.treeData = treeData
          this.WSloadingState = 1
          this.WSloadingText = '核销成功'
          this.dataNear.device.shanshuo = 0
        }
      })
    },
    onWorkoutFar () {
      workoutFar({
        id: this.id
      }).then(res => {
        // this.$message({
        //   type: 'success',
        //   message: '核销成功!'
        // })
        if (res.data === '已核销!') {
          this.WSloadingState = 2
          this.WSloadingText = '已核销!'
        } else {
          this.WSloadingState = 1
          this.WSloadingText = '核销成功'
          this.dataFar.device.shanshuo = 0
        }
      })
    },
    setWH(arr){
      this.homeWH = [
        arr.w,
        arr.h
      ]
    }
  },
  watch: {
    dragBool (val) {
      if (val === 1) {
        this.dragVisible = true
      } else {
        setTimeout(() => {
          this.editForm.userPassword = ''
        }, 2000)
      }
    },
    dragVisible (val) {
      if (!val) {
      }
    },
    WSloading (val) {
      if (val) {
        this.overTime = setTimeout(() => {
          this.WSloading = false
          this.WSloadingState = 2
          this.WSloadingText = '检测失败'
          // this.$message.error('检测失败')
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
          this.dataFar.device.shouguanggaojing2 = 99
          this.dataFar.device.faguanggaojing2 = 99
          this.dataFar.device.guzhanggaojing2 = 99

          this.timeOutAudio()

          this.setTimeoutLog(localStorage.getItem('wsParams'))
        }, 1000 * 3)
      }
    }
  }
  // beforeRouteLeave (to, form, next) {
  //   this.closeNotify()
  //   next()
  // }
}
</script>

<style lang="less">
   .tree-active {
     background: red;
   }
</style>

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
