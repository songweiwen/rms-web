/**
 * @desc 防抖函数
 * @param fn 目标函数
 * @param wait 延迟执行毫秒数
*/
export function debounce (fn, wait = 500) {
  let timer = null
  return function () {
    const now = !timer
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
    }, wait)
    if (now) {
      fn.apply(this, arguments)
    };
  }
};
/**
 * @desc 节流函数
 * @param fn 目标函数
 * @param wait 延迟执行毫秒数
*/
export function throttle (fn, wait = 500) {
  let last = 0
  return function () {
    const now = Date.now()
    if (now - last > wait) {
      fn.apply(this, arguments)
      last = now
    };
  }
};
