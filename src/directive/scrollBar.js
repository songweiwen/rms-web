
// 引入vue2-perfect-scrollbar
import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

// eslint-disable-next-line camelcase
const el_scrollBar = (el) => {
  // 在元素上加点私货，名字随便取，确保不会和已有属性重复即可，我取名叫做_ps_
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    // el上挂一份属性
    el._ps_ = new PerfectScrollbar(el)
  }
}

// 接着，自定义Vue指令,指令名你自己随便编一个，我们假定它叫scrollBar
Vue.directive('scrollBar', {
  // 使用inserted钩子函数（初次创建dom）获取使用自定义指令处的dom
  inserted (el, binding, vnode) {
    const { arg } = binding
    if (arg === 'table') {
      el = el.querySelector('.el-table__body-wrapper')
      if (!el) {
        return console.warn('未发现className为el-table__body-wrapper的dom')
      }
    } else if (arg === 'hover') {
      el.className = el.className + ' ps-hover'
    }
    // 判断其样式是否存在position 并且position为"fixed", "absolute"或"relative"
    // 如果不符合条件，抛个错误。当然你也可以抛个警告然顺便给其position自动加上"relative"
    // 为什么要这么做呢，因为PerfectScrollbar实现原理就是对dom注入两个div，一个是x轴一个是y轴，他们两的position都是absolute。
    // 对css稍有常识的人都知道，absolute是相对于所有父节点里设置了position属性的最近的一个节点来定位的，为了能够正确定位，我们要给其设置position属性
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      // console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join('、')}`)
    }
    // el上挂一份属性
    el_scrollBar(el)
    // el.style.overflow = 'hidden'
  },
  // 更新dom的时候
  componentUpdated (el, binding, vnode, oldVnode) {
    try {
      const { arg } = binding
      if (arg === 'table') {
        el = el.querySelector('.el-table__body-wrapper')
        if (!el) {
          return console.warn('未发现className为el-table__body-wrapper的dom')
        }
      } else if (arg === 'hover') {
        el.className = el.className + ' ps-hover'
      }
      // vnode.context其实就是vue实例，这里其实无需实例也直接用Vue的静态方法
      // 故而也可以写成Vue.nextTick
      vnode.context.$nextTick(
        () => {
          el_scrollBar(el)
          // el.style.overflow = 'hidden'
        }
      )
    } catch (error) {
      console.error(error)
      el_scrollBar(el)
    }
  }
})
