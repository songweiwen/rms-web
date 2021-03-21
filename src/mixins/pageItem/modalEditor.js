
// 添加修改视频
// import { updatePageItem } from '@/api/home'
export const modalEditor = {
  data () {
    return {
      visibleEditorNavmenu: false,
      visibleEditorSwiper: false,
      editorHtml: '',
      editorHtmlNew: '',
      editorformSwiper: {},
      editorformNavmenu: {}
    }
  },
  created () {
  },
  methods: {
    openEditorNavmenu (item) {
      console.log(item)
      this.editorformNavmenu = item
      this.editorHtml = item.content
      this.visibleEditorNavmenu = true
    },
    openEditorSwiper (item) {
      console.log(item)
      this.editorformSwiper = item
      this.editorHtml = item.content
      this.visibleEditorSwiper = true
    },
    getEditor (val) {
      this.editorHtmlNew = val
    },
    onSubmitEditorNavmenu () {
      this.dataNavmenu.forEach((e, i) => {
        if (this.editorformNavmenu.index === e.index) {
          e.content = this.editorHtmlNew
        }
      })
      this.visibleEditorNavmenu = false
    },
    onSubmitEditorSwiper () {
      this.dataSwiper.forEach((e, i) => {
        if (this.editorformSwiper.index === e.index) {
          e.content = this.editorHtmlNew
        }
      })
      this.visibleEditorSwiper = false
    },
    onCloseEditor () {
      this.editorHtmlNew = ''
      this.editorHtml = ''
      this.visibleEditorSwiper = false
      this.visibleEditorNavmenu = false
    }
  }
}
