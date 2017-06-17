/**
 * Created by leevscript on 2017/6/17.
 */
let rHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
let rRgb = /^(rgba?)\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i
let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

class Utils {
  constructor() {

  }

  /*
   * 颜色转换
   * color 转换前的颜色 取值可以是rgb, 16进制, 10进制数字
   * opacity 透明度 取值0-1
   * 返回值为对象 属性为hex: 16进制格式, rgb: rgb格式颜色, decimal: 十进制颜色
   * */
  colorTransform(color, opacity) {
    let hex, rgb, decimal
    if (color && rHex.test(color)) {
      hex = color
      rgb = this.colorHtoR(color, opacity)
      decimal = parseInt(color.slice(1), 16)
    } else if (color && rRgb.test(color)) {
      rgb = color
      hex = this.colorRtoH(color, opacity)
      decimal = parseInt(hex.slice(1), 16)
    } else if (typeof color === 'number') {
      decimal = color
      hex = color.toString(16)
      while (hex.length < 6) {
        hex = "0" + hex
      }
      hex = '#' + hex
      rgb = this.colorHtoR(hex, opacity)
    } else {
      return null
    }
    return {hex, rgb, decimal}
  }

  colorHtoR(color, opacity) {
    let colorChange = []
    if (color.length === 4) color = color.replace(/(\w)/g, '$1$1')
    for (let i = 1; i < 7; i += 2)
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)))
    if (typeof opacity === 'number') colorChange.push(opacity)
    return `rgb${colorChange.length === 4 ? 'a' : ''}(${colorChange.join(",")})`
  }

  colorRtoH(color, opacity) {
    let hex = '#'
    let rgbArr = rRgb.exec(color)
    let _tmp = ''
    for (let i = 2; i < rgbArr.length; i++) {
      _tmp = Number(rgbArr[i]).toString(16)
      _tmp = _tmp.length === 1 ? _tmp + _tmp : _tmp
      hex += _tmp
    }
    return hex
  }

  /*
   * 日期转换
   * date Date时间对象
   * fmt 转换格式 例如 "yyyy-MM-dd hh:mm:ss.S"
   * */
  format(date, fmt) {
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "w+": week[date.getDay()], //星期
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    return fmt;
  }

  /*
   * H5图片压缩
   * 利用canvas进行图片压缩处理
   * src 图片路径 可以为base64字符串
   * callback 回调函数 将压缩后的图片输出
   * */
  compressImg(src, callback) {
    let image = new Image()
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext('2d')
    image.src = src
    image.onload = () => {
      let w = image.naturalWidth
      let h = image.naturalHeight //H5新属性，获取图片原始宽高
      canvas.width = w
      canvas.height = h
      ctx.drawImage(image, 0, 0, w, h, 0, 0, w, h)
      var base64 = canvas.toDataURL("image/jpeg", 0.3)
      callback(base64)
    }
  }
}

export default new Utils()
//window.$utils = new Utils()






