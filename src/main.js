// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import 'iview/dist/styles/iview.css'

import filters from '@/plugins/filters'
import types from '@/plugins/types'

Vue.config.productionTip = false

// 注册iView的组件为全局组件
Vue.use(iView)
// 注册过滤器
Vue.use(filters)
// Action Types 都挂载到Vue原型上，获取：this.$$types.SIDEBAR_OPEN
Vue.use(types)
// 同步路由信息到store
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  mounted () {
    // 监听ESC键退出全屏事件
    ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(v => {
      document.addEventListener(v, () => {
        this.$store.commit(this.$$types.TOGGLE_FULL_SCREEN, { changeState: true })
      })
    })
  }
})
