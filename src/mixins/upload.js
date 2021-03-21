
// 获取浏览权限列表（下拉框） permissionSelect

// 获取页面分类列表（下拉框） pageSelect

// 获取机构列表（下拉框） orgSelect

// 获取赛事列表（下拉框） stageSelect

import { setUpload } from '@/api/upload'
// import axios from 'axios'
export const upload = {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    customRequest (file, callback) {
      console.log(file)
      const data = new FormData()
      data.append('file', file.file)
      // console.log(data)
      return setUpload(data)
      // .thet((res) => {
      //   // callback(res)
      //   // return res
      //   // console.log(res)
      // })
    }
  }
}
