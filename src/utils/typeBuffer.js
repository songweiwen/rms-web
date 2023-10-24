
/* eslint-disable */
const DATASIZE = 128; // 固定一包的长度 不可修改
// let sourceFile = document.getElementById("source_file"); // 拟定的文件
var modelArray = []; // 存放一个文件处理后的对象集合


// 操作数据包的结构体。 index = 当前包索引，data = 文件数据- 原始， encodeData = 处理后的数据，直接使用此数据发送即可
export const ExportData = function (index, data, encodeData, encodeLength) {
    this.index = index;
    this.data = data;
    this.encodeData = encodeData;
    this.encodeLength = encodeLength;
}

// 创建 对数据计算操作
export const createData = function (file){
    modelArray = [];
    // 从某处获得 file -
    let sourceFile = file
    console.log(sourceFile );
    sourceFile.arrayBuffer().then(buffer => {
        let bytes = new Uint8Array(buffer);
        console.log(bytes.length);
        const dataCount =Math.trunc( bytes.length / DATASIZE + 1);
        console.log(dataCount);
        let startIndex = 0
        let endIndex = 0
        for (let i = 0 ; i < dataCount; i++) {
            startIndex = i * DATASIZE;
            endIndex = (i + 1) * DATASIZE
            var data;
            // 切片
            i === (dataCount -1) ? data = bytes.slice(startIndex, bytes.length): data = bytes.slice(startIndex,endIndex);
            let model = new ExportData( i, // 这里存的是索引是0  看个人习惯是1还是0 如果修改此处 +1
                                        data,
                             buf2hex(encodeBytesToData(data, dataCount, i)) + buf2hex(data),
                                data.length + 6); // 数据包 + 6个字节  = 当前包  总包数
            modelArray.push(model);
        }
    });
    return modelArray // 返回到页面 这里
    console.log(modelArray);
}

// 按照通信协议重新组装数据
export const encodeBytesToData = function (data, toTalCount, index){
    return intToBytes2(toTalCount).concat(intToBytes2(index + 1)).concat(intToBytes2(data.length));
}

// int 转 bytes数组 2字节
export const intToBytes2 = function (a) {
    return [(a >> 8) & 0xFF,a & 0xFF];
}

// bytes数组 2字节  转 int
export const bytes2ToInt = function (a) {
    return (a[0] << 8) + a[1];
}

// bytes数组 转 16进制字符串
export const buf2hex = function(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

// js 响应按钮转换部分  == index.html
/* let convertButton = document.getElementById("convert_button");
convertButton.addEventListener("click", () => {
    if(sourceFile.files.length === 0) {
        alert("Add A Source File");
        return;
    }
    createData();
}); */
/* eslint-disable no-eval */