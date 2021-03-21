import {
  debounce,
  throttle
} from './instructions'
import Vue from 'vue'

/**
 * @desc 防抖指令
 * @param fn 目标函数
 * @param wait 延迟执行毫秒数
 * v-debounce="[事件名('debounce'),500]"
*/
Vue.directive('debounce', {
  bind (el, binding) {
    let executeFunction = null
    if (binding.value instanceof Array) {
      const [func, timer] = binding.value
      executeFunction = debounce(func, timer)
    } else {
      console.error('参数必须是数组')
      return 0
    };
    el.addEventListener('click', executeFunction)
  }
})
/**
 * @desc 节流指令
 * @param fn 目标函数
 * @param wait 延迟执行毫秒数
 * v-throttle="[事件名('throttle'),500]"
*/
Vue.directive('throttle', {
  bind (el, binding) {
    let executeFunction = null
    if (binding.value instanceof Array) {
      const [func, timer] = binding.value
      executeFunction = throttle(func, timer)
    } else {
      console.error('参数必须是数组')
      return 0
    };
    el.addEventListener('click', executeFunction)
  }
})
