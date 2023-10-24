
export const time = (x) => {
  return x + 1
}

export const toDecimal2 = function (x) {
  console.log(123)
  var f = parseFloat(x)
  if (isNaN(f)) {
    return false
  }
  f = Math.round(x * 100) / 100
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  console.log('toDecimal2', s / 10)
  return Number(s / 10)
}

/**
 * @param format
 * @param currDate
 * @returns
 * 转换时间格式
 */

export const getDay = function (i) {
  var date = new Date()// 获取当前时间
  // var dateNow = date.setDate(date.getDate() - 1)
  var dateNow = new Date(date.setDate(date.getDate() - (i || 0)))
  var Month = dateNow.getMonth() + 1
  var Day = dateNow.getDate()
  var Y = dateNow.getFullYear() + '-'
  var M = Month < 10 ? '0' + Month + '-' : Month + '-'
  var D = Day + 1 < 10 ? '0' + Day : Day
  return Y + M + D
}

export const getweekday = function (date) {
  const weekArray = ['日', '一', '二', '三', '四', '五', '六']

  const week = weekArray[new Date(date).getDay()]// 注意此处必须是先new一个Date

  return week
}

export const getweekdayIndex = function (date) {
  const weekArray = [7, 1, 2, 3, 4, 5, 6]

  const week = weekArray[new Date(date).getDay()]// 注意此处必须是先new一个Date

  return week
}

export const getMonthWeek = function (currDate) {
  // 设置时间为本月的1号
  var date = new Date((new Date(this).setDate(1)) || (new Date()).setDate(1))
  // 获取今天的日期
  var today = new Date(currDate)
  var d = today.getDate()
  var firstWeekDate
  if (date.getDay() === 0) { // 判断1号是周日
    firstWeekDate = 6
  } else { // 判断1号是周一至周六之间
    firstWeekDate = date.getDay() - 1
  }
  return Math.ceil((d + firstWeekDate) / 7)
}

export const formatDate = function (format, currDate) {
  /*
   * eg:format="yyyy-MM-dd hh:mm:ss";
   */
  var o = {
    'M+': currDate.getMonth() + 1, // month
    'd+': currDate.getDate(), // day
    'h+': currDate.getHours(), // hour
    'm+': currDate.getMinutes(), // minute
    's+': currDate.getSeconds(), // second
    'q+': Math.floor((currDate.getMonth() + 3) / 3), // quarter
    S: currDate.getMilliseconds()
    // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (currDate.getFullYear() + '')
      .substr(4 - RegExp.$1.length))
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k]
        : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}
/* eslint-disable */


/**
 * @param week
 * @returns
 * getday()数字转换星期几格式
 */
export const formatWeekday = function (week) {
  const weekday = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  }
  return weekday[week]
}

export const replaceAllJson = function (str) {
  if (str != null) str = str.replace(/&quot;/g, '"')
  const dataJson = JSON.parse(str)
  return dataJson
}

// 数组转为对象 函数
export const _object = function (list, values) {
  var result = {}
  for (var i = 0; i < list.length; i++) {
    if (values) {
      result[list[i]] = values[i]
    } else {
      result[list[i][0]] = list[i][1]
    }
  }
  return result
}

/*
* JS生成某个范围的随机数
* */
// min ≤ r ≤ max
export const RandomNumBoth = function (Min, Max) {
  const Range = Max - Min
  const Rand = Math.random()
  const num = Min + Math.round(Rand * Range) // 四舍五入
  return num
}
// min ≤ r < max
export const RandomNumMin = function (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  var num = Min + Math.floor(Rand * Range) // 舍去
  return num
}
// min < r ≤ max
export const RandomNumMax = function (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  if (Math.round(Rand * Range) === 0) {
    return Min + 1
  }
  var num = Min + Math.round(Rand * Range)
  return num
}
// min < r < max
export const RandomNumNot = function (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  if (Math.round(Rand * Range) === 0) {
    return Min + 1
  } else if (Math.round(Rand * Max) === Max) {
    // index++
    return Max - 1
  } else {
    var num = Min + Math.round(Rand * Range) - 1
    return num
  }
}

// j将一个数组拆分为相同长度的多个数组
export const arrSliceSameLength = function (orgArr, size) {
  size = parseInt(size)
  if (isNaN(size) || size < 1 || size >= orgArr.length) {
    return [orgArr]
  }
  const newArr = []
  for (let i = 0, len = orgArr.length; i < len; i += size) {
    newArr.push(orgArr.slice(i, i + size))
  }
  return newArr
}

// 生成uuid
export const generateUuid = function (Bit = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() // use high-precision timer if available
  }
  var uuid = Bit.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

// js 保留两位小数，并且四舍五入
// https://www.jianshu.com/p/d2965bcb3a36
// num为传入的值，n为保留的小数位
export function keepTwoDecimalFull (num, p) {
  let result = parseFloat(num)
  if (isNaN(result)) {
    // alert('传递参数错误，请检查！')
    return false
  }

  const multiplicator = Math.pow(10, p)
  result = Math.round(num * multiplicator) / multiplicator
  let sx = result.toString()
  let posDecimal = sx.indexOf('.')
  if (posDecimal < 0) {
    posDecimal = sx.length
    sx += '.'
  }
  while (sx.length <= posDecimal + p) {
    sx += '0'
  }
  return sx
}
/* eslint-enable */
