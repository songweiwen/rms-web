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
          :highlight-current="true"
          :default-expand-all="true"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i v-if="data.level===1" class="iconfont icon-yuanduanji"></i>
                <i v-else class="iconfont icon-jinduanji"></i>
                {{ node.label }}
              </span>
              <span>
              <!-- 根据 每个设备的online决定   绿色在线1  红色报警2  灰色不在线0 -->
                <template v-if="data.level===1">
                  <span v-if="data.online===1" class="el-tag el-tag--success el-tag--dark"></span>
                  <span v-else-if="data.online===0" class="el-tag el-tag--info el-tag--dark"></span>
                  <span v-else-if="data.online===2" class="el-tag el-tag--danger el-tag--dark" :class="{
                   shanshuo: data.shanshuo===1
                  }"></span>
                </template>
              </span>
            </span>
          </el-tree>
        </div>
        <!-- <div class="home-right" style="width: 800px;" v-show="!deviceId">
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170521%2F8b45d8c26664406ebf5c2df273086bc8_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618925314&t=0a42ba8e7a4ac7c39c60f459916c4f69" alt="" srcset="">
        </div> -->
        <div class="home-right" :style="'width:' + (dataFar.device.deviceLevel===1 ? 850 : homeType===1 ? 850 : 1100) + 'px;'" style="padding-bottom: 40px;" v-show="deviceId">
          <div class="flex-container" v-show="homeType===1">
            <div class="flex-item m-r-md">
              在线状态：
              <el-tag v-if="dataNear.device.online===1" type="success" effect="dark">
                在线
              </el-tag>
              <el-tag v-else-if="dataNear.device.online===0" type="info" effect="dark"> 离线</el-tag>
              <el-tag v-else-if="dataNear.device.online===2" type="success" effect="dark"> 在线</el-tag>
              <!-- <el-tag v-else-if="dataNear.online==='故障'" type="danger" effect="dark">故障</el-tag> -->
            </div>
            <div class="flex-item text-right" v-show="!loading">
              <el-button :loading="getLoading" :disabled ="dataNear.device.online ===0?true:xunjianDisabled" type="primary" @click="onQueryNear(false)">
                读取
              </el-button>
              <template v-if="dataNear.device.deviceLevel===1">
                <el-button :loading="settingLoading" :disabled ="dataNear.device.online ===0?true:xunjianDisabled" type="danger" @click="settingNear(true)">
                  设置
                </el-button>
              </template>
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
            <div class="flex-item text-right" v-show="!loading">
              <el-button :loading="getLoading" :disabled ="dataNear.device.online ===0?true:xunjianDisabled" type="primary" @click="onQueryFar(false)">
                读取
              </el-button>
              <el-button :loading="settingLoading" :disabled ="dataNear.device.online ===0?true:xunjianDisabled" type="danger" @click="settingFar(true)">
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
            <!-- 第一代近端机 -->
            <template v-if="dataNear.device.deviceLevel===1">
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
                      v-model.number="dataNear.device.shuaijianzhi" placeholder="" @input="shuaijianzhiNear"></el-input>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    0-31（范围值）
                  </el-col>
                </el-row>
                <!-- <el-row type="flex" class="home-item" align="middle" style="height: 0;"></el-row> -->
                <!-- <el-alert
                  :closable="false"
                  v-show="showShuaijianzhi"
                  title="光模块衰减值不可空，范围值允许为0-31"
                  type="error"
                  effect="dark">
                </el-alert> -->
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
                    <template v-else-if="dataNear.device.shouguangzhi>127 && dataNear.device.shouguangzhi < 255">
                      {{dataNear.device.shouguangzhi-256}}
                    </template>
                    <template v-else>
                      {{dataNear.device.shouguangzhi}}
                    </template>
                  </el-col>
                  <el-col :span="8">
                    dBm
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
                    <el-button type="primary" :disabled ="dataNear.device.online ===0?true:xunjianDisabled"  size="small" @click="onVersionNear" :loading="versionLoading">
                      读取版本号
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </template>
            <!-- 第二代近端机 -->
            <template v-if="dataNear.device.deviceLevel===2">
              <div class="home-main">
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="6">
                    设备ID
                  </el-col>
                  <el-col :span="6">
                    {{dataNear.device.deviceId}}
                  </el-col>
                </el-row>
                <el-row type="flex" class="home-item" align="middle">
                  <el-col :span="6">
                    模块名称
                  </el-col>
                  <el-col :span="6">
                    目前数值
                  </el-col>
                  <el-col :span="6">
                    单位
                  </el-col>
                </el-row>

                <div v-for="(item, index) in 4" :key="index">
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="6">
                      {{index+1}}号光模块衰减值
                    </el-col>
                    <el-col :span="6">
                      <template v-if="dataNear.device['shuaijianzhi' + (index===0?'':index+1)]===255">
                        <el-tag type="danger">
                          超时
                        </el-tag>
                      </template>
                      <template v-else>
                        <el-input class="home-item__input" :maxlength="2" :min="0" :max="31" size="small"
                        v-model.number="dataNear.device['shuaijianzhi' + (index===0?'':index+1)]" placeholder="" @input="shuaijianzhiNear222('shuaijianzhi', index)"></el-input>
                      </template>
                    </el-col>
                    <el-col :span="6">
                      0-31（范围值）
                    </el-col>
                    <el-col :span="6" class="text-center">
                      <el-button type="primary" size="small" :disabled ="dataNear.device.online ===0?true:xunjianDisabled" @click="settingNear222('shuaijianzhi', index)" :loading="versionLoading">
                        设置
                      </el-button>
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="6">
                      {{index+1}}号收光功率
                    </el-col>
                    <el-col :span="6">
                      <template v-if="dataNear.device['shouguangzhi' + (index===0?'':index+1)]===255">
                        <el-tag type="danger">
                          超时
                        </el-tag>
                      </template>
                      <template v-else-if="dataNear.device['shouguangzhi' + (index===0?'':index+1)]>127 && dataNear.device['shouguangzhi' + (index===0?'':index+1)] < 255">
                        {{dataNear.device['shouguangzhi' + (index===0?'':index+1)]-256}}
                      </template>
                      <template v-else>
                        {{dataNear.device['shouguangzhi' + (index===0?'':index+1)]}}
                      </template>
                    </el-col>
                    <el-col :span="6">
                      dBm
                    </el-col>
                  </el-row>
                </div>

                <el-row type="flex" class="home-item home-even" align="middle">
                  <el-col :span="6">
                    版本号
                  </el-col>
                  <el-col :span="6">
                    {{dataNear.device.deviceVersion}}
                  </el-col>
                  <el-col :span="6">
                  </el-col>
                  <el-col :span="6" class="text-center">
                    <el-button type="primary" :disabled ="dataNear.device.online ===0?true:xunjianDisabled"  size="small" @click="onVersionNear" :loading="versionLoading">
                      读取版本号
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </template>
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

              <!-- <el-row type="flex" class="home-item" align="middle" style="height: 0;"></el-row> -->
              <!-- <el-alert
                :closable="false"
                v-show="showShuaijianzhiFar"
                title="光模块衰减值不可空，范围值允许为0-31"
                type="error"
                effect="dark">
              </el-alert> -->
              <el-row class="">
                <el-col :span="dataFar.device.deviceLevel===2?24:24">
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="8">
                      {{dataFar.device.deviceLevel===2?'1号':''}}光模块衰减值
                    </el-col>
                    <el-col :span="8">
                      <template v-if="dataFar.device.shuaijianzhi===255">
                        <el-tag type="danger">
                          超时
                        </el-tag>
                      </template>
                      <template v-else>
                        <el-input class="home-item__input" :maxlength="2" :min="0" :max="31" size="small"
                        v-model.number="dataFar.device.shuaijianzhi" placeholder="" @input="shuaijianzhiFar"></el-input>
                      </template>
                    </el-col>
                    <el-col :span="8">
                      0-31（范围值）
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="home-item" align="middle">
                    <el-col :span="8">
                      {{dataFar.device.deviceLevel===2?'1号光模块':''}}收光功率
                    </el-col>
                    <el-col :span="8">
                      <template v-if="dataFar.device.shouguangzhi===255">
                        <el-tag type="danger">
                          超时
                        </el-tag>
                      </template>
                      <template v-else-if="dataFar.device.shouguangzhi>127 && dataFar.device.shouguangzhi < 255">
                        {{dataFar.device.shouguangzhi-256}}
                      </template>
                      <template v-else>
                        {{dataFar.device.shouguangzhi}}
                      </template>
                    </el-col>
                    <el-col :span="8">
                      dBm
                    </el-col>
                  </el-row>

                  <!-- 备路 -->
                  <template v-if="dataFar.device.deviceLevel===2">
                    <el-row type="flex" class="home-item" align="middle">
                      <el-col :span="8">
                        2号光模块衰减值
                      </el-col>
                      <el-col :span="8">
                        <template v-if="dataFar.device.shuaijianzhi2===255">
                          <el-tag type="danger">
                            超时
                          </el-tag>
                        </template>
                        <template v-else>
                          <el-input class="home-item__input" :maxlength="2" :min="0" :max="31" size="small"
                          v-model.number="dataFar.device.shuaijianzhi2" placeholder="" @input="shuaijianzhiFar2"></el-input>
                        </template>
                      </el-col>
                      <el-col :span="8">
                        0-31（范围值）
                      </el-col>
                    </el-row>
                    <!-- <el-row type="flex" class="home-item" align="middle" style="height: 0;"></el-row> -->
                    <!-- <el-alert
                      :closable="false"
                      v-show="showShuaijianzhiFar"
                      title="光模块衰减值不可空，范围值允许为0-31"
                      type="error"
                      effect="dark">
                    </el-alert> -->
                    <el-row type="flex" class="home-item" align="middle">
                      <el-col :span="8">
                        2号光模块收光功率
                      </el-col>
                      <el-col :span="8">
                        <template v-if="dataFar.device.shouguangzhi2===255">
                          <el-tag type="danger">
                            超时
                          </el-tag>
                        </template>
                        <template v-else-if="dataFar.device.shouguangzhi2>127 && dataFar.device.shouguangzhi2 < 255">
                          {{dataFar.device.shouguangzhi2-256}}
                        </template>
                        <template v-else>
                          {{dataFar.device.shouguangzhi2}}
                        </template>
                      </el-col>
                      <el-col :span="8">
                        dBm
                      </el-col>
                    </el-row>
                  </template>

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
                        <el-input class="home-item__input" size="small" v-model.number="dataFar.device.gongfangshuaijianzhi" @input="gongfangshuaijianzhiFar"></el-input>
                        <!-- {{dataFar.device.gongfangshuaijianzhi}} -->
                      </template>
                    </el-col>
                    <el-col :span="8">
                      0-31（范围值）
                    </el-col>
                  </el-row>
                  <!-- <el-row type="flex" class="home-item" align="middle" style="height: 0;"></el-row> -->
                  <!-- <el-alert
                    :closable="false"
                    v-show="showGongfangshuaijianzhi"
                    title="上行衰减值不可空"
                    type="error"
                    effect="dark">
                  </el-alert> -->
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
                      <template v-else-if="dataFar.device.xiaxingfanxiangzhi<0">
                      -1
                      </template>
                      <template v-else>
                        {{dataFar.device.xiaxingfanxiangzhi}}
                      </template>
                    </el-col>
                    <el-col :span="8">
                      dBm
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
                      ℃
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
                      dBm
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
                      <template v-else-if="dataFar.device.xiaxingqianxiangzhi<0">
                        -1
                      </template>
                      <template v-else>
                        {{dataFar.device.xiaxingqianxiangzhi}}
                      </template>
                    </el-col>
                    <el-col :span="8">
                      dBm
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
                        <el-input class="home-item__input" size="small" v-model.number="dataFar.device.shangxingshuajianzhi" @input="shangxingshuajianzhiFar"></el-input>
                        <!-- {{dataFar.device.shangxingshuajianzhi}} -->
                      </template>
                    </el-col>
                    <el-col :span="8">
                      0-31（范围值）
                    </el-col>
                  </el-row>
                  <!-- <el-row type="flex" class="home-item" align="middle" style="height: 0;"></el-row> -->
                  <!-- <el-alert
                    :closable="false"
                    v-show="showShangxingshuajianzhi"
                    title="上行衰减值不可空"
                    type="error"
                    effect="dark">
                  </el-alert> -->
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
                      dB
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row type="flex" class="home-item home-even" align="middle">
                <el-col :span="8">
                  版本号
                </el-col>
                <el-col :span="8">
                  {{dataFar.device.deviceVersion}}
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" :disabled ="dataFar.device.deviceNearOnline  === 0?true:xunjianDisabled" size="small" @click="onVersionFar" :loading="versionLoading">
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
import { formatDate } from '@/utils/utils'
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
      initTreeData: true,
      active: [],
      WSloadingType: '',
      WSloadingState: 0,
      WSloading: false,
      xunjianDisabled: false,
      WSloadingText: '',
      getLoading: false,
      versionLoading: false,
      settingLoading: false,
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
      dataNearWS: {
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
        this.treeData = []
        const treeData = res.data
        treeData.forEach((e, i) => {
          this.treeData.push({
            deviceName: e.near.deviceName,
            deviceId: e.near.deviceId,
            deviceLevel: e.near.deviceLevel,
            deviceProtocol: e.near.deviceProtocol,
            id: e.near.id,
            deviceAddress: e.near.deviceAddress,
            level: 1,
            children: e.far,
            treeId: e.near.deviceId,
            treeIndex: i,
            online: e.near.online,
            shanshuo: e.near.shanshuo
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

        // this.active = [String(this.treeData[0].id)]
        // .el-tree-node
        this.$nextTick(() => {
          // el-tree-node is-expanded is-current is-focusable
          if (this.initTreeData) {
            this.$refs.treeDom.$el.children[0].className = 'el-tree-node is-expanded is-current is-focusable'
            this.handleNodeClick(this.treeData[0])
            this.initTreeData = false
          }
          this.initTree = true
        })
      })
    },
    onZeroNear () {
      this.dataNear.device.shuaijianzhi = 0
    },
    onZeroFar () {
      this.dataFar.device.shuaijianzhi = 0
      this.dataFar.device.gongfangshuaijianzhi = 0
      this.dataFar.device.shangxingshuajianzhi = 0
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
          deviceId: this.deviceId,
          deviceLevel: this.dataNear.device.deviceLevel,
          deviceProtocol: this.dataNear.device.deviceProtocol
        }
      })

      this.getLoading = true
      this.onZeroNear()
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
          deviceNearId: this.deviceIdNear, // 父级近端机
          deviceLevel: this.dataFar.device.deviceLevel
        }
      })
      this.onZeroFar()
      this.getLoading = true
    },
    onVersionNear () { // 近端机 版本
      this.versionLoading = true
      this.WSloadingType = '读取版本'
      this.WSloadingState = 0
      this.WSloadingText = '读取版本中'
      this.$webSocket.Send({
        commandString: 'RNV',
        nearDevice: {
          deviceId: this.deviceId,
          deviceLevel: this.dataNear.device.deviceLevel,
          deviceProtocol: this.dataNear.device.deviceProtocol
        }
      })
    },
    onVersionFar () { // 远端机 版本
      this.versionLoading = true
      this.WSloadingType = '读取版本'
      this.WSloadingState = 0
      this.WSloadingText = '读取版本中'
      this.$webSocket.Send({
        commandString: 'RFV',
        farDevice: {
          deviceId: this.deviceId,
          deviceNearId: this.deviceIdNear, // 父级近端机
          deviceLevel: this.dataFar.device.deviceLevel
        }
      })
    },
    shuaijianzhiNear () {
      console.log(1)
      if (this.dataNear.device.shuaijianzhi > 31) {
        this.dataNear.device.shuaijianzhi = 31
      } else if (this.dataNear.device.shuaijianzhi < 0) {
        this.dataNear.device.shuaijianzhi = 0
      }
    },
    shuaijianzhiFar () {
      console.log(1)
      if (this.dataFar.device.shuaijianzhi > 31) {
        this.dataFar.device.shuaijianzhi = 31
      } else if (this.dataFar.device.shuaijianzhi < 0) {
        this.dataFar.device.shuaijianzhi = 0
      }
    },
    shuaijianzhiFar2 () {
      console.log(1)
      if (this.dataFar.device.shuaijianzhi2 > 31) {
        this.dataFar.device.shuaijianzhi2 = 31
      } else if (this.dataFar.device.shuaijianzhi2 < 0) {
        this.dataFar.device.shuaijianzhi2 = 0
      }
    },
    gongfangshuaijianzhiFar () {
      console.log(1)
      if (this.dataFar.device.gongfangshuaijianzhi > 31) {
        this.dataFar.device.gongfangshuaijianzhi = 31
      } else if (this.dataFar.device.gongfangshuaijianzhi < 0) {
        this.dataFar.device.gongfangshuaijianzhi = 0
      }
    },
    gongfangshuaijianzhiFar2 () {
      console.log(1)
      if (this.dataFar.device.gongfangshuaijianzhi2 > 31) {
        this.dataFar.device.gongfangshuaijianzhi2 = 31
      } else if (this.dataFar.device.gongfangshuaijianzhi2 < 0) {
        this.dataFar.device.gongfangshuaijianzhi2 = 0
      }
    },
    shangxingshuajianzhiFar () {
      console.log(1)
      if (this.dataFar.device.shangxingshuajianzhi > 31) {
        this.dataFar.device.shangxingshuajianzhi = 31
      } else if (this.dataFar.device.shangxingshuajianzhi < 0) {
        this.dataFar.device.shangxingshuajianzhi = 0
      }
    },
    shangxingshuajianzhiFar2 () {
      console.log(1)
      if (this.dataFar.device.shangxingshuajianzhi2 > 31) {
        this.dataFar.device.shangxingshuajianzhi2 = 31
      } else if (this.dataFar.device.shangxingshuajianzhi2 < 0) {
        this.dataFar.device.shangxingshuajianzhi2 = 0
      }
    },
    settingNear (bool) {
      // if (this.dataNear.device.shuaijianzhi === '') {
      //   this.showShuaijianzhi = true
      // } else if (this.dataNear.device.shuaijianzhi > 31 || this.dataNear.device.shuaijianzhi < 0) {
      //   this.showShuaijianzhi = true
      // } else {
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
      this.settingLoading = true
      // }
      // this.onZeroNear()
    },
    shuaijianzhiNear222 (paramesName, index) {
      const paramesNameNew = paramesName + index + 1
      console.log(1)
      if (this.dataNear.device[paramesNameNew] > 31) {
        this.dataNear.device[paramesNameNew] = 31
      } else if (this.dataNear.device[paramesNameNew] < 0) {
        this.dataNear.device[paramesNameNew] = 0
      }
    },
    settingNear222 (paramesName, index) {
      console.log(paramesName)
      this.WSloadingType = '设置'
      this.WSloadingState = 0
      this.WSloading = true
      this.WSloadingText = '设置中'
      this.showShuaijianzhi = false

      this.dataNearWS.device[paramesName + index + 1] = this.dataNear.device[paramesName + index + 1]

      this.$webSocket.Send({
        commandString: 'SN',
        nearDevice: this.dataNearWS.device,
        reserved: index + 1
      })
      this.settingLoading = true
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
      // this.onZeroFar()
      this.settingLoading = true
    },
    websocketonMessage (e) {
      this.WSloadingState = 1
      this.WSloading = false
      this.clearOverTime()
      // this.overTimeClear()
      const redata = JSON.parse(e.data)
      this.websocketonMessageAll(redata)
      // alert(1)
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
      } else if (redata.commandString === 'SRN') { // 读取近端机
        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
        }
        // if (!this.settingBool) {
        // this.$message({
        //   message: '读取成功',
        //   type: 'success'
        // })
        this.WSloadingText = '读取成功'
        this.queryPlay()
        this.getLoading = false
        // }
      } else if (redata.commandString === 'SRF') { // 读取远端机
        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
        }
        // if (!this.settingBool) {
        // this.$message({
        //   message: '读取成功',
        //   type: 'success'
        // })
        this.WSloadingText = '读取成功'
        this.queryPlay()
        this.getLoading = false
        // }
      } else if (redata.commandString === 'SRNV') { // 近端机 版本
        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
        }
        // this.$message({
        //   message: '版本号更新成功',
        //   type: 'success'
        // })
        this.versionLoading = false
        this.WSloadingText = '版本号更新成功'
      } else if (redata.commandString === 'SRFV') { // 远端机 版本
        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
        }
        // this.$message({
        //   message: '版本号更新成功',
        //   type: 'success'
        // })
        this.versionLoading = false
        this.WSloadingText = '版本号更新成功'
      } else if (redata.commandString === 'SSN') { // 近端机 设置
        if (this.dataNear.device.deviceId === redata.nearDevice.deviceId) {
          this.dataNear.device = redata.nearDevice
        }
        // this.$message({
        //   message: '设置成功',
        //   type: 'success'
        // })
        this.WSloadingText = '设置成功'
        this.settingPlay()
        // this.onQueryNear()// 近端机读取
        this.settingLoading = false
      } else if (redata.commandString === 'SSF') { // 远端机 设置
        if (this.dataFar.device.deviceId === redata.farDevice.deviceId) {
          this.dataFar.device = redata.farDevice
        }
        // this.$message({
        //   message: '设置成功',
        //   type: 'success'
        // })
        this.WSloadingText = '设置成功'
        this.settingPlay()
        // this.onQueryFar()// 远端机读取
        this.settingLoading = false
      } else if (redata.commandString === 'OLN') {
        // this.treeData.forEach(e => {
        //   if (e.deviceId === redata.nearDevice.deviceId) {
        //     e = redata.nearDevice
        //     this.treeData = [...this.treeData]
        //   }
        // })
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
            e.deviceLevel = data.deviceLevel
            e.deviceProtocol = data.deviceProtocol
          }
        })
        this.treeData = treeData
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
      this.$nextTick(() => {
        if (this.initTree) {
          //this.$refs.treeDom.$el.children[0].className = 'el-tree-node is-expanded'
          this.initTree = false
        }
      })
      this.homeType = data.level || 2
      console.log(data)
      this.deviceId = data.deviceId
      this.id = data.id
      this.loading = true
      this.getTree()
      if (this.homeType === 1) {
        this.deviceIdNear = null
        getDetailNear({
          id: this.id
        }).then(res => {
          const data = res.data
          console.log(data)
          this.dataNear = data
          this.dataNearWS = data
          this.loading = false
        })
      } else if (this.homeType === 2) {
        this.deviceIdNear = data.deviceNearId
        getDetailFar({
          id: this.id
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
          this.getLoading = false
          this.WSloadingState = 2
          this.settingLoading = false
          switch (this.WSloadingType) {
            case '读取':
              this.WSloadingText = '读取超时'
              // this.$message.error('读取超时')
              break
            case '读取版本':
              this.WSloadingText = '读取版本超时'
              // this.$message.error('读取版本超时')
              break
            case '设置':
              this.WSloadingText = '设置超时'
              // this.$message.error('设置超时')
              break
            default:
              break
          }
          // 近端机
          // this.dataNear.device.online = 0

          // 远端机
          // this.dataFar.device.online = 0

          this.setTimeoutLog(localStorage.getItem('wsParams'))
        }, 1000 * 3)
      }
    },
    versionLoading (val) {
      if (val) {
        this.overTime = setTimeout(() => {
          this.versionLoading = false
          this.WSloadingState = 2
          switch (this.WSloadingType) {
            case '读取版本':
              this.WSloadingText = '读取版本超时'
              break
            default:
              break
          }
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
