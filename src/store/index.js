/**
 * 注册 vuex 应用状态管理器
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import config from '@/config'
import app from './app'
import user from './user'

Vue.use(Vuex)

// 在开发环境中使用严格模式 https://vuex.vuejs.org/zh-cn/strict.html
const debug = process.env.NODE_ENV !== 'production'

// 按业务划分应用状态
export default new Vuex.Store({
  modules: {
    app,
    user
  },
  strict: debug
})
