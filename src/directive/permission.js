import Vue from 'vue'
import store from '@/store'
// import { PermissionMap } from '@/utils/permission/permissionMap'
// let rolesMap = {
//   'admin' : 1
// }
// 注册一个全局自定义指令 `v-focus`
Vue.directive('permission', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vnode) {
    debugger
    const { value } = binding

    const roles = store.getters && store.getters.roles

    // let permissionButtons = store.getters.permission_buttons

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      // const hasPermission = permissionButtons.some(item => {
      //   return item.url === PermissionMap[value]
      // })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
      // throw new Error(`缺少关键词! Like v-permission="'xxx'"`)
    }
  }
})
