
/* eslint-disable */
// 常量定义 - 全局
// 帧头
var HEADERONE = 0x28
var HEADERTWO = 0x97

// 模式字
var MODE_HOST = 0x0C
var MODE_WEB = 0x0D

// 控制字
var CONTROL_WEB = 0x4F
var CONTROL_FAR = 0x2F
var CONTROL_NEAR = 0x3F
var CONTROL_HOST = 0x1F

// 帧尾
var TAILONE = 0x28
var TAITWO = 0x98

var Command_Who = 0xE1

// 编码工具类 return -> 要发送的btyes[]
function EncodeTools () {
  var bytes = []
}

// 解码工具类 return -> 自定义Command对象
function decodeTools (data) {
  var bytes = []
  if (isString(data)) {
    bytes = stringToBytes(str) // 这块你最好有个断点跟一下。 看看收到的data到底是什么数据
  } else {
    // 如果不是 十六进制的字符串  找方法把它变成 byte数组
    /// /

  }
  // 将拿到的bytes进行逐帧解码
  if ((bytes[0] == HEADERONE) && (bytes[1] == HEADERTWO)) {
    // 帧头OK
    var dataLength = (int)(bytes[3] & 0xFF) // 取出数据长度

    if (bytes[2] == MODE_WEB) { // 此处是 服务器的数据包
      if (bytes[4] == Command_Who) { // 服务器在问我是谁
        /** *******此处处理业务 -> 调用 ws send方法  发送登录指令 *********/
      }
    }

    if (bytes[2] == MODE_HOST) { // 此处是 下位机的数据包

    }
  } else {
    // 帧头不对 不考虑拼包情况。 直接丢弃当前数据
    return null
  }
}

// 检查是否为字符串类型
function isString (str) {
  return str.constructor.toString().indexOf('String') > -1
}

// 将字符串转换成byte数组
function stringToBytes (str) {
  var ch; var st; var re = []
  for (var i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i)
    st = []
    do {
      st.push(ch & 0xFF)
      ch = ch >> 8
    }

    while (ch)
    re = re.concat(st.reverse())
  }
  return re
}
