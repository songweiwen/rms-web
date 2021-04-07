import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '@/layout/index'
Vue.use(VueRouter)
/**
 * 注意：子菜单仅在路由children.length> = 1时出现
 * 详细信息请参见: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 * 配置项
 *
 *
 * hidden: true // (默认 false)    // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * alwaysShow: true
 *
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/example/list'  // 如果设置了路径，则侧边栏将突出显示您设置的路径
  }
 */

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    // path: '/',
    // component: () => import('@/views/layout/index.vue'),
    path: '/',
    component: Layout,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    }, {
      path: 'stateLog',
      name: 'stateLog',
      component: () => import('@/views/stateLog/index.vue')
    }, {
      path: 'settingParams',
      name: 'settingParams',
      component: () => import('@/views/settingParams/index.vue')
    }, {
      path: 'settingLog',
      name: 'settingLog',
      component: () => import('@/views/settingLog/index.vue')
    }, {
      path: 'site',
      name: 'site',
      component: () => import('@/views/site/index.vue')
    }, {
      path: 'address',
      name: 'address',
      component: () => import('@/views/address/index.vue')
    }, {
      path: 'equipment',
      name: 'equipment',
      component: () => import('@/views/equipment/index.vue')
    }, {
      path: 'user',
      name: 'user',
      component: () => import('@/views/user/index.vue')
    }]
  }
]
const router = new VueRouter({
  routes
})
// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }
export default router
