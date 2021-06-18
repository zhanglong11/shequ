import _ from 'lodash'
export { default as remove } from './remove'
export { userEncryption } from './userEncryption'
export { default as toFlat } from './toFlat'
export { default as toTree } from './toTree'
export { default as treeFilter } from './treeFilter'
export { default as treeMap } from './treeMap'
export { default as treeForEach } from './treeForEach'
export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.ENV === 'production'
export const textSearch = (source, value) => _.toLower(source).includes(_.toLower(value))
export default {
  // 获取月初与月末 日期，返回两种时间格式
  getDateMonth(date) {
    const dateFirter = new Date(date)
    let dateLast = new Date(date)
    dateFirter.setDate(1)
    let currentMonth = dateLast.getMonth()
    const nextMonth = ++currentMonth
    const nextMonthFirstDay = new Date(dateLast.getFullYear(), nextMonth, 1)
    const oneDay = 1000 * 60 * 60 * 24
    dateLast = new Date(nextMonthFirstDay - oneDay)
    return {
      first: this.getDateAll(dateFirter),
      last: this.getDateAll(dateLast),
      firstDate: dateFirter,
      lastDate: dateLast
    }
  },
  // 获取年月日时分秒
  getDateAll(date, type) {
    const year = date.getFullYear()
    // day获取当前几号，不足10补0
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    // month获取当前月份的日期，不足10补0
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
    let newDate = year + '-' + month + '-' + day
    if (type === 'datetime') {
      newDate += ' ' + hours + ':' + minutes + ':' + seconds
    }
    if (type === 'dateTimeObject') {
      return {
        data: newDate,
        time: hours + ':' + minutes + ':' + seconds
      }
    }
    return newDate
  },
  // 16进制颜色转Rgb色
  colorToRgb(hexColor, opacity = 1) {
    // 16进制颜色值的正则
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 把颜色值变成小写
    let color = hexColor.toLowerCase()
    if (reg.test(color)) {
      // 如果只有三位的值，需变成六位，如：#fff => #ffffff
      if (color.length === 4) {
        let colorNew = '#'
        for (let i = 1; i < 4; i += 1) {
          colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
        }
        color = colorNew
      }
      // 处理六位的颜色值，转为RGB
      const colorChange = []
      for (let i = 1; i < 7; i += 2) {
        colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
      }
      const newColor = `RGBA(${colorChange.join(',')},${opacity})`
      return newColor
    } else {
      return color
    }
  }
}
