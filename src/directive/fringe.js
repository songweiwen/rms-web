import Vue from 'vue'
import store from '@/store'
// 注册一个全局自定义指令 `v-focus`
Vue.directive('fringe', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vnode) {
    const fringeDom = document.querySelector('.fringe__hd')
    fringeDom.style.display = 'none'
    // const { value } = binding
    // const getFringe = store.getters.fringe
    // const fringe = typeof (getFringe) === 'string' ? JSON.parse(getFringe) : getFringe
    const fringe = store.getters.fringe
    console.log(fringe, typeof (fringe), fringe.statusBarHeight, '拿高度')
    if (JSON.stringify(fringe) !== '{}') {
      el.style.paddingTop = fringe.statusBarHeight + fringe.headTitleHeight + 'px'
      console.log(el, el.style.paddingTop)
    }
  }
})

Vue.directive('fringeScroll', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vnode) {
    // const { value } = binding
    // const getFringe = store.getters.fringe
    // const fringe = typeof (getFringe) === 'string' ? JSON.parse(getFringe) : getFringe
    const fringe = store.getters.fringe
    console.log(fringe, typeof (fringe), fringe.statusBarHeight, '拿高度')
    if (JSON.stringify(fringe) !== '{}') {
      // el.style.position = 'absolute'
      // el.style.top = fringe.statusBarHeight + fringe.headTitleHeight + 'px'
      // el.style.width = '100%'
      // el.style.height = 'calc( 100% - ' + (fringe.statusBarHeight + fringe.headTitleHeight) + 'px )'
      el.style.paddingTop = fringe.statusBarHeight + fringe.headTitleHeight + 'px'
      const fringeDom = document.querySelector('.fringe__hd')
      fringeDom.style.background = 'none'
      fringeDom.style.display = 'block'
      // fringeDom.style.background = 'rgba(68, 56, 163, 1)'
      fringeDom.style.height = fringe.statusBarHeight + fringe.headTitleHeight + 'px'
      el.addEventListener('scroll', function (e) {
        // console.log(e)
        const scrollTop = el.scrollTop
        // const opacity = Math.abs(Math.round(scrollTop)) / 100
        // console.log(opacity)
        if (scrollTop > 0) {
          fringeDom.style.background = 'linear-gradient(to top, rgba(19, 127, 254, 0),rgba(68, 57, 163, 1))'
          // fringeDom.style.background = `linear-gradient(rgba(54, 46, 117,${opacity}) 0%, rgba(68, 56, 163,${opacity}) 100%)`
        } else {
          fringeDom.style.background = 'none'
        }
      })
    }
  }
})

Vue.directive('fringeScroll--settl', {
  inserted: function (el, binding, vnode) {
    const fringe = store.getters.fringe
    console.log(fringe, typeof (fringe), fringe.statusBarHeight, '拿高度')
    if (JSON.stringify(fringe) !== '{}') {
      el.style.paddingTop = fringe.statusBarHeight + fringe.headTitleHeight + 'px'
      const fringeDom = document.querySelector('.fringe__hd')
      fringeDom.style.background = 'rgba(117, 87, 238, 1)'
      fringeDom.style.display = 'block'
      fringeDom.style.height = fringe.statusBarHeight + fringe.headTitleHeight + 'px'
    }
  }
})
