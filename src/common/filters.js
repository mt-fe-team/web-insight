/**
 * 数据过滤或格式化
 * 单独提取出来，是为了多项目，多环境通用，比如：可以将此代码做版本管理，发布至NPM，多项目安装使用一份filter
 */
import moment from 'moment'
moment.locale('zh-cn')

export default {
  toFixed2 (num) {
    return num ? num.toFixed(2) : '0.00'
  },
  formatPrice (num) {
    return (num / 1000).toFixed(2)
  },
  formatDateTime (data, str) {
    if (!(data instanceof Date)) data = new Date(data)
    return moment(data).format(str || 'YYYY-MM-DD HH:mm:ss')
  },
  formatDate (data, str) {
    if (!(data instanceof Date)) data = new Date(data)
    return moment(data).format(str || 'L')
  },
  dateFromNow (data, str) {
    if (!(data instanceof Date)) data = new Date(data)
    return moment(data).fromNow()
  }
}
