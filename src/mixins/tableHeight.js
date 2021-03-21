export const tableHeight = {
  data () {
    return {
      tableHeight: 500
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.getTableHeight(140)
    // })
  },
  methods: {
    setTableHeight (number, refDom) {
      this.getTableHeight(number, refDom)
      window.addEventListener('resize', () => {
        this.getTableHeight(number, refDom)
      })
    },
    getTableHeight (number, refDom) {
      console.log(refDom)
      const dom = this.$refs[refDom]
      console.log(dom)
      const pTop = this.getPageStyle(dom, 'paddingTop', true)
      const pBottom = this.getPageStyle(dom, 'paddingTop', true)
      this.tableHeight = dom.offsetHeight - pTop - pBottom - (number || 0)
      // console.log(this.$refs.pageHeight.currentStyle)
      // const obj = this.$refs.pageHeight
      console.log(this.getPageStyle(dom, 'paddingTop', true))
    },
    getPageStyle (dom, styleName, parseIntBool) {
      if (parseIntBool) {
        if (dom.currentStyle) {
          return parseInt(dom.currentStyle[styleName])
        } else {
          return parseInt(document.defaultView.getComputedStyle(dom, null)[styleName])
          // console.log(document.defaultView.getComputedStyle(dom, null).padding)
        }
      } else {
        if (dom.currentStyle) {
          return dom.currentStyle[styleName]
        } else {
          return document.defaultView.getComputedStyle(dom, null)[styleName]
          // console.log(document.defaultView.getComputedStyle(dom, null).padding
        }
      }
    }
  }
}
