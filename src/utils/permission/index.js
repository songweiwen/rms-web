import store from '@/store'
// import { PermissionMap } from '@/utils/permission/permissionMap'

export default function checkPermission (value) {
  // let permissionButtons = store.getters.permission_buttons

  const roles = store.getters && store.getters.roles

  if (value && value instanceof Array && value.length > 0) {

    const permissionRoles = value
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    // const hasPermission = permissionButtons.some(item => {
    //   return item.url === PermissionMap[value]
    // })

    return hasPermission
  } else {
    throw new Error(`缺少关键词! Like v-permission="'xxx'"`)
    return false
  }
}
