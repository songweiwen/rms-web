<template>
  <div class="page">
1332
  </div>
</template>

<script>
export default {
  name: 'site',
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
