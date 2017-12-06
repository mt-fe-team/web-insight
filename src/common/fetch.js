/**
 * 封装axios的通用请求
 * eg: axios.get(url)(data[, config]).then().catch()
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数
 * @param  {object}   config    其它配置，如：{loading: true}，则请求时添加显式的loaing
 * config配置说明：如果设置为ture，则请求时会显示相应的 toast 或 alert
 * { toastLoading: true, toastSuccess: false, toastError: false, alertSuccess: false, alertError: false }
 */
import axios from 'axios'
import NProgress from 'nprogress'
import config from '@/config'

NProgress.configure({ showSpinner: false })

// import * as settings from 'config/settings'

// 是否有必要注入到Vue实例中，看以后的具体情况，应尽量避免在组件中直接发送数据请求
// import Vue from 'vue'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios);

// 全局设置
axios.defaults.baseURL = config.baseConfig.baseURL
axios.defaults.timeout = 30 * 1000
axios.defaults.responseType = 'json'
axios.defaults.xsrfCookieName = config.baseConfig.xsrfToken
axios.defaults.xsrfHeaderName = config.baseConfig.xsrfToken

// 设置失败的状态码范围
// axios.defaults.validateStatus = function (status) { return status >= 200 && status < 300 }
// 设置所有的post请求以formdata的方式提交
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const methods = [ 'get', 'post', 'delete', 'head', 'put', 'patch' ]
const methodsNeedParams = [ 'get', 'delete', 'head' ]

const fetch = { }

methods.forEach(method => {
  fetch[method] = (url = '', data = { }, config = { }) => {
    NProgress.start()
    // 这里可以对请求数据做一些处理（发送之前）

    const needPms = methodsNeedParams.indexOf(method) > -1

    const axionsOpt = { url, method }
    axionsPms[ needPms ? 'params' : 'data' ] = pms

    return axios(axionsOpt).then(res => {
      NProgress.done()
      return Promise.resolve(res)
    }).catch(err => {
      NProgress.done()
      return Promise.reject(err)
    })
  }
})

export default fetch
