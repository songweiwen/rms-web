<template>
  <a-layout>
      <a-layout-sider width="200" style="background: #fff;">
      <a-menu
        mode="inline"
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-menu-item
          v-for="(item) in menus"
          :key="item.key">
          <a-icon :type="item.icon" />
          <span>{{item.name}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout-content">
      <a-layout-content>
        详情
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'details',
  data () {
    return {
      menus: [
        {
          name: '添加图片',
          key: '1',
          icon: 'file-image'
        },
        {
          name: '添加文本',
          key: '2',
          icon: 'file-text'
        },
        {
          name: '添加视频',
          key: '3',
          icon: 'video-camera'
        },
        {
          name: '添加轮播图',
          key: '4',
          icon: 'switcher'
        }
      ],
      collapsed: false
    }
  }
}
</script>
