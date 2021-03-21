<template>
    <div ref="editor"></div>
</template>
<script>
import E from 'wangeditor-antd'
export default {
  name: 'wangeditor',
  props: ['get-full-text', 'content'], // 回调方法
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new E(this.$refs.editor)
    console.log(this.content)

    this.editor.customConfig.uploadImgServer = '你的上传地址'
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.zIndex = 100

    this.editor.customConfig.uploadImgServer = process.env.VUE_APP_BASE_API + '/admin/upload'

    this.editor.customConfig.uploadImgHeaders = {
      // from: 'editor'
      Authorization: this.$Cookies.get('access_token')
    }

    this.editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function (xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },

      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        console.log(result)
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        const url = result.data.src
        insertImg(url)

        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }
    this.editor.customConfig.onchange = (html) => {
      // this.getFullText(html) // 内容赋值
      console.log(12334, html)
      this.$emit('getHtml', html)
    }
    this.editor.create()
    // 如果默认传递content值则渲染默认内容
    if (this.content) {
      this.editor.txt.html(this.content)
    }
  },
  methods: {
    getEditor () {
      console.log(123)
      console.log(this.editor.txt.getJSON())
    }
  },
  watch: {
    content (val) {
      console.log(val, '获取html')
      // this.editor.txt.clear()
      this.editor.txt.html(val)
    }
  }
}
</script>

<style lang="less">
  .w-e-text {
    min-height: 300px !important;
  }
</style>
