<template>
  <div class="homeSetting page">
    <div class="page-tabs">
      <a-tabs @change="onTabs" v-model="tabsActive">
        <a-tab-pane
          v-for="(item) in optionPageClass"
          :key="item.id"
          :tab="item.title">
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="page-container" ref="pageHeight">
      <div class="table">
        <div class="table-hd">
          <a-space>
            <a-button
              v-for="(item, index) in modular"
              :key="index"
              type="primary"
              icon="plus"
              @click="item.click()">
              {{item.name}}
            </a-button>
          </a-space>
        </div>
        <div class="table-bd">
          <a-table
            id="table"
            :columns="columnsList"
            :data-source="list"
            :pagination="paginationList"
            @change="changeCurrentList"
            :scroll="{ y: tableHeight, scrollToFirstRowOnChange: true }"
            align="center"
            rowKey="id">
            <span slot="sort" slot-scope="sort">
              <a-icon class="cursor-m" type="menu" :key="sort"/>
            </span>
            <span slot="type" slot-scope="type">
              {{typeCH(type)}}
            </span>
            <span slot="data" slot-scope="data, item" class="view">
              <!-- {{item.type}} -->
              <!-- {{item}} -->
              <!-- 文章：article
                  广告图：banner
                  轮播图：carousel
                  导航菜单：menu
                  视频：video -->
              <template v-if="item.type==='article'">
                <a-row
                  class="view-article"
                  type="flex"
                  justify="center"
                  align="bottom">
                  <a-col
                    :span="24"
                    class="view-article-item">
                    <img class="view-article-img"
                      :src="data.cover">
                      <!-- <div class="view-article-label">
                        {{item.title}}
                      </div> -->
                  </a-col>
                </a-row>
              </template>
              <template v-else-if="item.type==='line'">
                <a-row
                  class="view-line"
                  type="flex"
                  justify="center"
                  align="bottom">
                  <a-col
                    :span="24"
                    class="view-line-item">
                    <div class="view-line-item--line"></div>
                  </a-col>
                </a-row>
              </template>
              <template v-else-if="item.type==='banner'">
                <a-row
                  class="view-banner"
                  type="flex"
                  justify="center"
                  align="bottom">
                  <a-col
                    :span="24"
                    class="view-banner-item">
                    <img class="view-banner-img"
                      :src="data.cover">
                      <!-- <div class="view-article-label">
                        {{item.title}}
                      </div> -->
                  </a-col>
                </a-row>
              </template>
              <template v-else-if="item.type==='carousel'">
                <a-row
                  class="view-swiper"
                  type="flex"
                  justify="center"
                  align="bottom">
                  <a-col
                    :span="4"
                    class="view-swiper-item"
                    v-for="(item, index) in data"
                    :key="index">
                    <img
                      class="view-swiper-img"
                      :src="item.image">
                  </a-col>
                </a-row>
              </template>
              <template v-if="item.type==='video'">
                <a-row
                  class="view-video"
                  type="flex"
                  justify="center"
                  align="bottom">
                  <a-col
                    :span="24"
                    class="view-video-item">
                    <img class="view-video-bg_image"
                      :src="data.bg_image">
                      <div class="view-video-cover">
                        <img
                          :src="data.cover">
                      </div>
                  </a-col>
                </a-row>
              </template>
              <template v-else-if="item.type==='menu'">
                <a-row
                  class="view-menu"
                  :gutter="10"
                  type="flex"
                  justify="center"
                  align="bottom">
                  <a-col
                    :span="4"
                    class="view-menu-item"
                    v-for="(item, index) in data"
                    :key="index">
                    <img
                      class="view-menu-img"
                      :src="item.icon">
                    <div class="view-menu-label">
                      {{item.title}}
                    </div>
                  </a-col>
                </a-row>
              </template>
            </span>
            <span slot="permission" slot-scope="permission">
              <a-tag
                v-for="tag in permission"
                :key="tag"
                :color="tag==='所有人' ? 'green' : 'geekblue'"
              >
                {{ tag }}
              </a-tag>
            </span>
            <span slot="show" slot-scope="is_show, item">
              <a-switch
                :key="item.id"
                v-model="item.is_show"
                checked-children="显示"
                un-checked-children="隐藏"
                :checked="item.is_show"
                @change="toggleState(item)"
                />

                <!-- @click="toggleShow(record)" -->
                <!-- {{record}} -->
            </span>
            <span slot="id" slot-scope="id, record">
              <!-- <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                  在此之后添加 <a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item
                    v-for="(item, index) in modular"
                    :key="index">
                    <a href="javascript:;" @click="item.click(record)">
                      {{item.name}}
                    </a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
              <a-divider type="vertical" /> -->
              <a-button
                type="primary"
                size="small"
                @click="openEdit(record)">
                <a-icon type="edit" />
                编辑
              </a-button>
              <a-divider type="vertical" />
              <a-button type="danger" size="small" @click="tableRowDel(id)">
                <a-icon type="delete" />
                删除
              </a-button>
            </span>
          </a-table>
        </div>
      </div>
    </div>

    <a-modal
      :width="900"
      title="分隔线"
      :visible="visibleLine"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      ok-text="保存"
      @ok="onSubmitLine"
      @cancel="onCloseLine"
    >

      <template slot="footer">
        <div v-show="formLine.jump_type===3">
          <div v-show="stepLine===0">
            <a-button key="back" @click="onCloseLine">
              取消
            </a-button>
            <a-button key="submit" type="primary" @click="onNextLine">
              下一步
            </a-button>
          </div>

          <div v-show="stepLine===1">
            <a-button key="back" @click="stepLine=0">
              上一步
            </a-button>
            <a-button key="submit" type="primary" @click="onSubmitLine">
              保存
            </a-button>
          </div>
        </div>
        <div v-show="formLine.jump_type!==3">
          <a-button key="back" @click="onCloseLine">
            取消
          </a-button>
          <a-button key="submit" type="primary" @click="onSubmitLine">
            保存
          </a-button>
        </div>
      </template>

      <div class="modal">
        <div v-show="formLine.jump_type===3">
          <div class="modal-hd">
            <a-steps :current="stepLine">
              <a-step title="填写文章信息"></a-step>
              <a-step title="完善文章内容" />
              <a-step title="完成" />
            </a-steps>
          </div>
        </div>

        <div class="modal-bd" v-show="stepLine===0">
          <a-form-model
            ref="rulesFormLine"
            :model="formVideo"
            :rules="rulesVideo"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >

            <a-form-model-item label="浏览权限" prop="permission_ids">
              <a-select
                v-if="visibleLine"
                mode="multiple"
                :defaultValue="formLine.permission_ids"
                @change="changeSelectLine"
              >
                <a-select-option
                  v-for="(item) in optionPermission"
                  :key="item.id"
                  :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- <jumpType
              :typeVal="formLine.jump_type"
              @updateType="updateTypeLine"
              @updateForm="updateFormLine" /> -->
          </a-form-model>
        </div>
        <div class="modal-bd" v-show="stepLine===1">
          <wangeditor
            :content="formLine.content"
            @getHtml="getEditorLine"/>
        </div>
        <div class="modal-bd" v-show="stepLine===2">
          <a-result
            status="success"
            :title="formLine.id?'修改成功':'添加成功'"
            sub-title="已在首页显示"
          >
            <template #extra>
              <a-button key="add" v-show="!formLine.id" type="primary" @click="onResetLine">
                再次添加
              </a-button>
              <a-button key="close" @click="onCloseLine">
                关闭
              </a-button>
            </template>
          </a-result>
        </div>
      </div>
    </a-modal>

    <a-modal
      :width="900"
      title="富文本"
      :visible="visibleEditorSwiper"
      :maskClosable="false"
      ok-text="保存"
      @ok="onSubmitEditorSwiper"
      @cancel="onCloseEditor"
    >
      <wangeditor
        v-if="visibleEditorSwiper"
        :content="editorHtml"
        @getHtml="getEditor"/>
    </a-modal>
    <a-modal
      :width="1100"
      title="轮播图"
      :visible="visibleSwiper"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      ok-text="保存"
      @ok="onSubmitSwiper"
      @cancel="onCloseSwiper"
    >
      <div class="table" v-if="visibleSwiper">
        <div class="table-bd">
          <a-table
            id="tableSwiper"
            :columns="columnsSwiper"
            :data-source="dataSwiper"
            :pagination="false"
            align="center"
            rowKey="index">
            <span slot="indexNav" slot-scope="index">
              <a-icon class="cursor-m" type="menu" :key="index"/>
            </span>
            <span class="td-upload" slot="image" slot-scope="image, item">
               <a-form-item
                class="m-b-0"
                :label-col="{
                xs: { span: 0 },
                sm: { span: 0 },
                }"
                :wrapper-col="{
                xs: { span: 24 },
                sm: { span: 24 },
                }"
                :validate-status="item.validateUpload?item.validateUpload.validateStatus:''"
                :help="item.validateUpload?item.validateUpload.errorMsg:''">
                <a-upload
                  list-type="picture"
                  :customRequest="uploadSwiper"
                  :file-list="fileListSwiper['file'+item.index]"
                  @change="uploadChangeSwiper"
                >
                  <a-button @click="beforeUploadSwiper(item)"> <a-icon type="upload" /> 上传图片 </a-button>
                </a-upload>
              </a-form-item>
            </span>
            <div slot="jumpType" slot-scope="jumpType, item">
              <a-form-model
                :model="dataSwiper[item.index]"
                :label-col="labelColTd"
                :wrapper-col="wrapperColTd"
              >
              <!-- {{item}} -->
                <jumpType
                  @click.native="beforeUploadSwiper(item)"
                  :typeVal="item.jump_type"
                  :formProp="item"
                  @updateType="updateTypeSwiper"
                  @updateForm="updateFormSwiper" />
              </a-form-model>
              <!-- dataSwiper[item.index] -->
              <div v-if="item.jump_type===3" :key="item.index">
                <a-button type="primary" @click="openEditorSwiper(item)">
                  富文本编辑
                </a-button>
              </div>
            </div>
            <span slot="indexSwiperEdit" slot-scope="index, item">
              <a-button :key="index" :disabled="dataSwiper.length<=1" type="danger" size="small" @click="delSwiper(item.index)">
                <a-icon type="delete" />
                删除
              </a-button>
            </span>
          </a-table>
          <div class="text-center" style="margin-top: 20px;">
            <a-tooltip>
              <template slot="title">
                提示： 轮播图 最多添加1-5个
              </template>
              <a-button @click="addSwiper" class="btn-add" block type="primary" :disabled="dataSwiper.length>4">
                <a-icon type="plus" />
                增加
              </a-button>
            </a-tooltip>
          </div>
          <div class="" style="margin-top: 50px;">
            <a-form-model
              :model="formSwiper"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-form-model-item label="浏览权限" prop="permission_ids">
                <a-select
                  mode="multiple"
                  v-if="formSwiper"
                  :defaultValue="formSwiper.permission_ids"
                  @change="changeSelectSwiper"
                >
                  <a-select-option
                    v-for="(item) in optionPermission"
                    :key="item.id"
                    :value="item.id">
                    {{item.name}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </div>
    </a-modal>

    <a-modal
      :width="900"
      title="广告图"
      :visible="visibleAd"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      ok-text="保存"
      @ok="onSubmitAd"
      @cancel="onCloseAd"
    >
      <template slot="footer">
        <div v-show="formAd.jump_type===3">
          <div v-show="stepAd===0">
            <a-button key="back" @click="onCloseAd">
              取消
            </a-button>
            <a-button key="submit" type="primary" @click="onNextAd">
              下一步
            </a-button>
          </div>

          <div v-show="stepAd===1">
            <a-button key="back" @click="stepAd=0">
              上一步
            </a-button>
            <a-button key="submit" type="primary" @click="onSubmitAd">
              保存
            </a-button>
          </div>
        </div>
        <div v-show="formAd.jump_type!==3">
          <a-button key="back" @click="onCloseAd">
            取消
          </a-button>
          <a-button key="submit" type="primary" @click="onSubmitAd">
            保存
          </a-button>
        </div>
      </template>

      <div class="modal">
        <div v-show="formAd.jump_type===3">
          <div class="modal-hd">
            <a-steps :current="stepAd">
              <a-step title="填写文章信息"></a-step>
              <a-step title="完善文章内容" />
              <a-step title="完成" />
            </a-steps>
          </div>
        </div>
        <div class="modal-bd" v-show="stepAd===0">
          <a-form-model
            ref="rulesFormAd"
            :model="formAd"
            :rules="rulesAd"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >

            <a-form-model-item label="广告图" prop="cover">
              <a-upload
                list-type="picture"
                :customRequest="uploadAd"
                :file-list="fileListAd"
                @change="uploadChangeAd"
              >
                <a-button>
                  <a-icon type="upload" /> 上传广告图
                </a-button>
              </a-upload>
            </a-form-model-item>

            <!-- <a-form-model-item label="高度(%)" prop="height">
              <a-input-number v-model="heightAd" :min="1" :max="100" :step="10" />
            </a-form-model-item> -->

            <a-form-model-item label="内容样式" prop="jumpType">
              <!-- 1铺满 0 不铺满 -->
              <a-radio-group v-model="formAd.is_full" name="objectFit">
                <a-radio :value="0">
                  不铺满
                </a-radio>
                <a-radio :value="1">
                  铺满
                </a-radio>
              </a-radio-group>
            </a-form-model-item>

            <a-form-model-item label="浏览权限" prop="permission_ids">
              <a-select
                v-if="visibleAd"
                mode="multiple"
                :defaultValue="formAd.permission_ids"
                @change="changeSelectAd"
              >
                <a-select-option
                  v-for="(item) in optionPermission"
                  :key="item.id"
                  :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <jumpType
              :typeVal="formAd.jump_type"
              :formProp="formAd"
              @updateType="updateTypeAd"
              @updateForm="updateFormAd" />
            <!-- <a-form-model-item label="跳转方式" prop="jumpType">
              <a-select v-model="formAd.jumpType">
                <a-select-option
                  v-for="(item, index) in jumpTypeOtion"
                  :key="index"
                  :value="item.type">
                    {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-model-item> -->
          </a-form-model>
        </div>
        <div class="modal-bd" v-show="stepAd===1">
          <wangeditor
            :content="formAd.content"
            @getHtml="getEditorAd"/>
        </div>
        <div class="modal-bd" v-show="stepAd===2">
          <a-result
            status="success"
            :title="formAd.id?'修改成功':'添加成功'"
            sub-title="已在首页显示"
          >
            <template #extra>
              <a-button key="add" v-show="!formAd.id" type="primary" @click="onResetAd">
                再次添加
              </a-button>
              <a-button key="close" @click="onCloseAd">
                关闭
              </a-button>
            </template>
          </a-result>
        </div>
      </div>
    </a-modal>

    <a-modal
      :width="900"
      title="视频"
      :visible="visibleVideo"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      ok-text="保存"
      @ok="onSubmitVideo"
      @cancel="onCloseVideo"
    >

      <template slot="footer">
        <div v-show="formVideo.jump_type===3">
          <div v-show="stepVideo===0">
            <a-button key="back" @click="onCloseVideo">
              取消
            </a-button>
            <a-button key="submit" type="primary" @click="onNextVideo">
              下一步
            </a-button>
          </div>

          <div v-show="stepVideo===1">
            <a-button key="back" @click="stepVideo=0">
              上一步
            </a-button>
            <a-button key="submit" type="primary" @click="onSubmitVideo">
              保存
            </a-button>
          </div>
        </div>
        <div v-show="formVideo.jump_type!==3">
          <a-button key="back" @click="onCloseVideo">
            取消
          </a-button>
          <a-button key="submit" type="primary" @click="onSubmitVideo">
            保存
          </a-button>
        </div>
      </template>
      <div class="modal">
        <div v-show="formVideo.jump_type===3">
          <div class="modal-hd">
            <a-steps :current="stepVideo">
              <a-step title="填写文章信息"></a-step>
              <a-step title="完善文章内容" />
              <a-step title="完成" />
            </a-steps>
          </div>
        </div>
        <div class="modal-bd" v-show="stepVideo===0">
          <a-form-model
            ref="rulesFormVideo"
            :model="formVideo"
            :rules="rulesVideo"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >

            <a-form-model-item label="视频封面图" prop="cover">
              <a-upload
                list-type="picture"
                :customRequest="uploadVideoCover"
                :file-list="fileListVideoCover"
                @change="uploadChangeVideoCover"
              >
                <a-button>
                  <a-icon type="upload" /> 上传视频封面图
                </a-button>
              </a-upload>
            </a-form-model-item>
            <a-form-model-item label="背景图片" prop="bg_image">
              <a-upload
                list-type="picture"
                :customRequest="uploadVideoBg"
                :file-list="fileListVideoBg"
                @change="uploadChangeVideoBg"
              >
                <a-button>
                  <a-icon type="upload" /> 上传背景图片
                </a-button>
              </a-upload>
            </a-form-model-item>
            <a-form-model-item label="视频地址" prop="video_url" placeholder="请输入视频地址">
              <a-input v-model="formVideo.video_url" />
            </a-form-model-item>
            <a-form-model-item label="浏览权限" prop="permission_ids">
              <a-select
                mode="multiple"
                v-if="visibleVideo"
                :defaultValue="formVideo.permission_ids"
                @change="changeSelectVideo"
              >
                <a-select-option
                  v-for="(item) in optionPermission"
                  :key="item.id"
                  :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <jumpType
              :typeVal="formVideo.jump_type"
              :formProp="formVideo"
              @updateType="updateTypeVideo"
              @updateForm="updateFormVideo" />
          </a-form-model>
        </div>
        <div class="modal-bd" v-show="stepVideo===1">
          <wangeditor
            :content="formVideo.content"
            @getHtml="getEditorVideo"/>
        </div>
        <div class="modal-bd" v-show="stepVideo===2">
          <a-result
            status="success"
            :title="formVideo.id?'修改成功':'添加成功'"
            sub-title="已在首页显示"
          >
            <template #extra>
              <a-button v-show="!formVideo.id" key="add" type="primary" @click="onResetVideo">
                再次添加
              </a-button>
              <a-button key="close" @click="onCloseVideo">
                关闭
              </a-button>
            </template>
          </a-result>
        </div>
      </div>
    </a-modal>
    <a-modal
      :width="900"
      title="富文本"
      :visible="visibleEditorNavmenu"
      :maskClosable="false"
      ok-text="保存"
      @ok="onSubmitEditorNavmenu"
      @cancel="onCloseEditor"
    >
      <wangeditor
        v-if="visibleEditorNavmenu"
        :content="editorHtml"
        @getHtml="getEditor"/>
    </a-modal>
    <a-modal
      :width="1300"
      title="导航菜单"
      :visible="visibleNavmenu"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      ok-text="保存"
      @ok="onSubmitNavmenu"
      @cancel="onCloseNavmenu"
    >
      <div class="table" v-if="visibleNavmenu">
        <div class="table-bd">
          <a-table
            id="tableNavmenu"
            :columns="columnsNavmenu"
            :data-source="dataNavmenu"
            :pagination="false"
            align="center"
            rowKey="index">
            <span slot="indexNav" slot-scope="index">
              <a-icon class="cursor-m" type="menu" :key="index"/>
            </span>
            <!-- <span slot="titleNav" slot-scope="title, item"> -->
              <!-- <a-input
                v-model="item.title"
                :maxLength="5"
                placeholder="请输入五字之内标题"
                allow-clear /> -->
                <!-- :validate-status="getFildStatus(item.index).validateStatus" -->
              <!-- :help="getFildStatus(item.index).errorMsg" -->
            <a-form-item
              class="m-b-0"
              :label-col="{
              xs: { span: 0 },
              sm: { span: 0 },
              }"
              :wrapper-col="{
              xs: { span: 24 },
              sm: { span: 24 },
              }"
              :validate-status="item.validate?item.validate.validateStatus:''"
              :help="item.validate?item.validate.errorMsg:''"
              slot="titleNav"
              slot-scope="text, item">
              <a-input
              style="width: 100%;"
              :min="1"
              v-model="item.title"
              :key="item.index"
              @change="changeValidateNavmenu(item.index)"
              />
            </a-form-item>

            <!-- </span> -->
            <span class="td-upload" slot="icon" slot-scope="icon, item">
              <a-form-item
                class="m-b-0"
                :label-col="{
                xs: { span: 0 },
                sm: { span: 0 },
                }"
                :wrapper-col="{
                xs: { span: 24 },
                sm: { span: 24 },
                }"
                :validate-status="item.validateUpload?item.validateUpload.validateStatus:''"
                :help="item.validateUpload?item.validateUpload.errorMsg:''">
                <a-upload
                  list-type="picture"
                  :customRequest="uploadNavmenu"
                  :file-list="fileListNavmenu['file'+item.index]"
                  @change="uploadChangeNavmenu"
                >
                  <a-button @click="beforeUploadNavmenu(item)"> <a-icon type="upload" /> 上传图片 </a-button>
                </a-upload>
              </a-form-item>
            </span>
            <div slot="jumpType" slot-scope="jumpType, item">
              <a-form-model
                :key="item.index"
                :model="dataNavmenu[item.index]"
                :label-col="labelColTd"
                :wrapper-col="wrapperColTd"
              >
                <jumpType
                  :key="item.index"
                  @click.native="beforeUploadNavmenu(item)"
                  :typeVal="item.jump_type"
                  :formProp="item"
                  @updateType="updateTypeNavmenu"
                  @updateForm="updateFormNavmenu" />
              </a-form-model>
              <!-- dataNavmenu[item.index] -->
              <!-- {{jumpType}} -->
              <!-- {{item.index}} -->
              <!-- {{aaaa(item.index)}} -->
              <!-- {{dataNavmenu}} -->
              <!-- dataNavmenu[item.index] -->
              <div v-if="item.jump_type===3">
                <a-button type="primary" @click="openEditorNavmenu(item)">
                  富文本编辑
                </a-button>
              </div>
            </div>
            <span slot="indexNavEdit" slot-scope="index, item">
              <a-button :key="index" :disabled="dataNavmenu.length<=4" type="danger" size="small" @click="delNavmenu(item.index)">
                <a-icon type="delete" />
                删除
              </a-button>
            </span>
          </a-table>
          <div class="text-center" style="margin-top: 20px;">
            <a-tooltip>
              <template slot="title">
                提示： 导航菜单 最多添加4-5个
              </template>
              <a-button @click="addNavmenu" class="btn-add" block type="primary" :disabled="dataNavmenu.length>4">
                <a-icon type="plus" />
                增加
              </a-button>
            </a-tooltip>
          </div>
          <div class="" style="margin-top: 50px;">
            <a-form-model
              :model="formNavmenu"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-form-model-item label="浏览权限" prop="permission_ids">
                <a-select
                  mode="multiple"
                  v-if="formNavmenu"
                  :defaultValue="formNavmenu.permission_ids"
                  @change="changeSelectNavmenu"
                >
                  <a-select-option
                    v-for="(item) in optionPermission"
                    :key="item.id"
                    :value="item.id">
                    {{item.name}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </div>
    </a-modal>

    <a-modal
      :width="900"
      :class="stepArticle===2?'modal--nofooter':''"
      title="文章"
      :visible="visibleArticle"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      @ok="onNextArticle"
      @cancel="onCloseArticle"
    >

      <template slot="footer">
        <div v-show="formArticle.jump_type===3">
          <div v-show="stepArticle===0">
            <a-button key="back" @click="onCloseArticle">
              取消
            </a-button>
            <a-button key="submit" type="primary" @click="onNextArticle">
              下一步
            </a-button>
          </div>

          <div v-show="stepArticle===1">
            <a-button key="back" @click="stepArticle=0">
              上一步
            </a-button>
            <a-button key="submit" type="primary" @click="onSubmitArticle">
              保存
            </a-button>
          </div>
        </div>
        <div v-show="formArticle.jump_type!==3">
          <a-button key="back" @click="onCloseArticle">
            取消
          </a-button>
          <a-button key="submit" type="primary" @click="onSubmitArticle">
            保存
          </a-button>
        </div>
      </template>

      <div class="modal">
        <div v-show="formArticle.jump_type===3">
          <div class="modal-hd">
            <a-steps :current="stepArticle">
              <a-step title="填写文章信息"></a-step>
              <a-step title="完善文章内容" />
              <a-step title="完成" />
            </a-steps>
          </div>
        </div>
        <div class="modal-bd" v-show="stepArticle===0">
            <!-- :rules="Object.assign(rulesArticle, rulesJumpType)" -->
          <a-form-model
            ref="rulesFormArticle"
            :model="formArticle"
            :rules="rulesArticle"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="标题" prop="title" placeholder="请输入文章标题">
              <a-input v-model="formArticle.title" />
            </a-form-model-item>

            <!-- <a-form-model-item label="关联赛事" prop="stage_id">
              <a-select v-model="formArticle.stage_id">
                <a-select-option
                  v-for="(item) in optionStage"
                  :key="item.id"
                  :value="item.id">
                    {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-model-item> -->

            <a-form-model-item label="文章分类" prop="category_id">
              <a-select v-model="formArticle.category_id">
                <a-select-option
                  v-for="(item) in optionCategory"
                  :key="item.id"
                  :value="item.id">
                    {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="选择机构" prop="org_id">
              <a-select v-model="formArticle.org_id">
                <a-select-option
                  v-for="(item) in optionOrg"
                  :key="item.id"
                  :value="item.id">
                    {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="缩略图" prop="cover">
              <input type="hidden" v-model="formArticle.cover">
              <a-upload
                list-type="picture"
                :customRequest="uploadArticle"
                :file-list="fileListArticle"
                @change="uploadChangeArticle"
              >
                <a-button>
                  <a-icon type="upload" /> 上传缩略图
                </a-button>
              </a-upload>
            </a-form-model-item>

            <a-form-model-item label="浏览权限" prop="permission_ids">
              <a-select
                mode="multiple"
                v-if="visibleArticle"
                :defaultValue="formArticle.permission_ids"
                @change="changeSelectArticle"
              >
                <a-select-option
                  v-for="(item) in optionPermission"
                  :key="item.id"
                  :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <jumpType
              :typeVal="formArticle.jump_type"
              :formProp="formArticle"
              @updateType="updateTypeArticle"
              @updateForm="updateFormArticle" />
          </a-form-model>
        </div>
        <div class="modal-bd" v-show="stepArticle===1">
          <wangeditor
            :content="formArticle.content"
            @getHtml="getEditorArticle"/>
        </div>
        <div class="modal-bd" v-show="stepArticle===2">
          <a-result
            status="success"
            :title="formArticle.id?'修改成功':'添加成功'"
            sub-title="已在首页显示"
          >
            <template #extra>
              <a-button key="add" v-show="!formArticle.id" type="primary" @click="onResetArticle">
                再次添加
              </a-button>
              <a-button key="close" @click="onCloseArticle">
                关闭
              </a-button>
            </template>
          </a-result>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { pageItemList, changeShowStatus, refreshSort, delPageItem } from '@/api/home'
// import { setUpload } from '@/api/upload'
import { rulesArticle, rulesAd, rulesVideo } from '@/mixins/rules'
import { get } from '@/mixins/get'
import { getPageClass } from '@/mixins/getPageClass'
import { upload } from '@/mixins/upload'
import { tableHeight } from '@/mixins/tableHeight'
import { settingArticle } from '@/mixins/pageItem/article'
import { settingLine } from '@/mixins/pageItem/line'
import { settingAd } from '@/mixins/pageItem/ad'
import { settingVideo } from '@/mixins/pageItem/video'
import { settingnNavmenu } from '@/mixins/pageItem/navmenu'
import { settingnSwiper } from '@/mixins/pageItem/swiper'
import { modalEditor } from '@/mixins/pageItem/modalEditor'
import { edit } from '@/mixins/pageItem/edit'
// import vuedraggable from 'vuedraggable'
export default {
  name: 'homeSetting',
  mixins: [
    rulesArticle,
    rulesAd,
    rulesVideo,
    get,
    getPageClass,
    tableHeight,
    upload,
    settingArticle,
    settingLine,
    settingAd,
    settingVideo,
    settingnNavmenu,
    settingnSwiper,
    modalEditor,
    edit
  ],
  // components: { vuedraggable },
  data () {
    return {
      tabsDefault: 0,
      tabsActive: 0,
      paginationList: {
        current: 1,
        total: 0,
        pageSize: 20,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'], // 每页中显示的数据
        showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
      },
      modular: [
        {
          name: '文章',
          click: this.openArticle
        },
        {
          name: '分隔线',
          click: this.openLine
        },
        {
          name: '轮播图',
          click: this.openSwiper
        },
        {
          name: '广告图',
          click: this.openAd
        },
        {
          name: '视频',
          click: this.openVideo
        },
        {
          name: '导航菜单',
          click: this.openNavmenu
        }
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      labelColTd: { span: 6 },
      wrapperColTd: { span: 18 },
      confirmLoading: false,
      columnsList: [
        {
          width: 80,
          // fixed: 'left',
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          align: 'center',
          scopedSlots: { customRender: 'sort' }
        },
        {
          width: 100,
          title: '模块类型',
          dataIndex: 'type',
          key: 'type',
          align: 'center',
          scopedSlots: { customRender: 'type' }
        },
        {
          width: 400,
          title: '内容',
          dataIndex: 'data',
          key: 'data',
          align: 'center',
          className: 'tr-preview',
          scopedSlots: { customRender: 'data' }
        },
        {
          width: 100,
          title: '浏览权限',
          dataIndex: 'permission',
          key: 'permission',
          scopedSlots: { customRender: 'permission' }
          // align: 'center'
        },
        {
          width: 120,
          title: '显示',
          dataIndex: 'is_show',
          key: 'is_show',
          scopedSlots: { customRender: 'show' },
          align: 'center'
        },
        {
          width: 200,
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          scopedSlots: { customRender: 'id' },
          align: 'center'
        }
      ],
      list: []
    }
  },
  mounted () {
    this.getStageSelect()
    this.getPermissionSelect() // 权限
    this.getOrgSelect() // 机构
    this.getPageSelect().then(res => {
      const data = res.data
      this.optionPageClass = data
      this.$store.commit('SET_optionPageClass', data)
      this.getPageInit()
    })
    this.$nextTick(() => {
      this.setTableHeight(140, 'pageHeight')
    })
  },
  computed: {
  },
  methods: {
    typeCH (type) {
      // 文章：article
      // 分隔线： line
      // 广告图：banner
      // 轮播图：carousel
      // 导航菜单：menu
      // 视频：video
      switch (type) {
        case 'article':
          return '文章'
        case 'line':
          return '分隔线'
        case 'banner':
          return '广告图'
        case 'carousel':
          return '轮播图'
        case 'menu':
          return '导航菜单'
        case 'video':
          return '视频'
      }
      return type
    },
    getPageInit () {
      if (process.env.NODE_ENV === 'development') {
        this.tabsActive = this.tabsDefault = this.optionPageClass[2].id
      } else {
        this.tabsActive = this.tabsDefault = this.optionPageClass[0].id
      }

      this.getPageItemList()
    },
    onTabs (activeKey) {
      this.tabsActive = activeKey
      // console.log(activeKey)
      this.paginationList.current = 1
      this.paginationList.total = 0
      this.list = []
      this.getPageItemList()
    },
    getPageItemList () {
      pageItemList({
        page_id: this.tabsActive,
        limit: this.paginationList.pageSize,
        page: this.paginationList.current
      }).then(res => {
        const data = res.data
        console.log(data)
        data.forEach(e => {
          // 0不显示 1显示
          e.is_show = e.is_show !== 0
        })
        this.list = data
        this.paginationList.total = res.count
        this.tableRowDrag()
      })
    },
    changeCurrentList (pagination, filters, sorter, { currentDataSource }) {
      // console.log(pagination, filters, sorter, { currentDataSource })
      this.paginationList = pagination
      this.getPageItemList()
    },
    tableRowDrag () {
      // 首先获取需要拖拽的dom节点
      const el1 = document.querySelectorAll('#table .ant-table-tbody')[0]
      // .querySelectorAll('.anticon-menu')[0]
      console.log(el1)
      this.$Sortable.create(el1, {
        // draggable: '.anticon-menu',
        // disabled: false, // 是否开启拖拽
        filter: '.ignore-elements',
        ghostClass: 'sortable-ghost', // 拖拽样式
        animation: 150, // 拖拽延时，效果更好看
        group: { // 是否开启跨表拖拽
          pull: false,
          put: false
        },
        onEnd: (e) => { // 这里主要进行数据的处理，拖拽实际并不会改变绑定数据的顺序，这里需要自己做数据的顺序更改
          const arr = this.list // 获取表数据
          const oldSortData = []
          const newSortData = []
          arr.forEach((e, i) => {
            oldSortData.push({
              sort: e.sort,
              // sort: i,
              //  === 0 ? i + 1 : e.sort
              id: e.id
            })
          })
          arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]) // 数据处理
          this.$nextTick(() => {
            this.list = arr

            arr.forEach((e, i) => {
              newSortData.push({
                // sort: e.sort === 0 ? i + 1 : e.sort,
                sort: i,
                // === 0 ? i + 1 : e.sort
                id: e.id
              })
            })
            refreshSort({
              old_sort_data: oldSortData,
              new_sort_data: newSortData
            }).then(() => {

            })
          })
        }
      })
    },
    swiperDrag () {
      // 首先获取需要拖拽的dom节点
      const el1 = document.querySelectorAll('#tableSwiper .ant-table-tbody')[0]
      // .querySelectorAll('.anticon-menu')[0]
      console.log(el1)
      this.$Sortable.create(el1, {
        // draggable: '.anticon-menu',
        // disabled: false, // 是否开启拖拽
        filter: '.ignore-elements',
        ghostClass: 'sortable-ghost', // 拖拽样式
        animation: 150, // 拖拽延时，效果更好看
        group: { // 是否开启跨表拖拽
          pull: false,
          put: false
        },
        onEnd: (e) => { // 这里主要进行数据的处理，拖拽实际并不会改变绑定数据的顺序，这里需要自己做数据的顺序更改
          const arr = this.dataSwiper // 获取表数据
          arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]) // 数据处理
          this.$nextTick(function () {
            this.dataSwiper = arr
          })
        }
      })
    },
    toggleState (item) {
      console.log(item)
      const params = {
        id: item.id,
        is_show: item.is_show ? 1 : 0
        // 0不显示 1显示
      }

      // 0不显示 1显示
      changeShowStatus(params)
        .then(() => {

        })
    },
    tableRowDel (id) {
      const that = this
      this.$confirm({
        title: '提示',
        content: '是否要删除此模块？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          // console.log('OK')
          delPageItem({
            id: id
          }).then((res) => {
            that.$Message.success(res.msg)
            that.getPageItemList()
          })
          // that.data.forEach((e, i) => {
          //   if (e.id === id) {
          //     that.data.splice(i, 1)
          //   }
          // })
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scope>
  .homeSetting {
    height: ~'calc( 100% - 117px )' !important;
  }
</style>
