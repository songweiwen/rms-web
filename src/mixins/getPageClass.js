
// 获取页面分类列表（下拉框） pageSelect

import { pageSelect } from '@/api/get'
export const getPageClass = {
  data () {
    return {
      optionPageClass: []
    }
  },
  created () {
    // this.getPageSelect()
  },
  methods: {
    getPageSelect () {
      return pageSelect()
    }
  }
}
