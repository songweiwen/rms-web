
// 获取浏览权限列表（下拉框） permissionSelect

// 获取页面分类列表（下拉框） pageSelect

// 获取机构列表（下拉框） orgSelect

// 获取赛事列表（下拉框） stageSelect

import { permissionSelect, pageSelect, orgSelect, stageSelect } from '@/api/get'
export const get = {
  data () {
    return {
      optionPermission: [],
      optionPageClass: [],
      optionOrg: [],
      optionStage: []
    }
  },
  created () {
    // this.getPermissionSelect()
    // this.getOrgSelect()
    // this.getStageSelect()
  },
  methods: {
    getPermissionSelect () {
      permissionSelect().then(res => {
        const data = res.data
        this.optionPermission = []
        data.forEach(e => {
          this.optionPermission.push({
            name: e.name,
            id: String(e.id)
          })
        })
        // this.optionPermission = data
      })
    },
    getPageSelect () {
      return pageSelect()
    },
    getOrgSelect () {
      orgSelect().then(res => {
        const data = res.data
        this.optionOrg = data
      })
    },
    getStageSelect () {
      stageSelect().then(res => {
        const data = res.data
        this.optionStage = data
        this.$store.commit('SET_optionStage', data)
      })
    }
  }
}
