import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import store from '@/store'
import * as types from '@/store/types'
import Auth from '@/common/auth'
import Utils from '@/common/utils'
import pagesRouter from './pages'
import storejs from 'store'

import Login from '@/views/login'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/locking',
    name: 'locking',
    meta: { title: '锁屏中' },
    component: _import('locking/index')
  },
  ...pagesRouter
  // {
  //   path: '/500',
  //   name: 'error500',
  //   meta: { title: '500-服务器错误' },
  //   component: _import('error-pages/500')
  // }, {
  //   path: '/401',
  //   name: 'error401',
  //   meta: { title: '401-权限不足' },
  //   component: _import('error-pages/401')
  // }, {
  //   path: '/*',
  //   name: 'error404',
  //   meta: { title: '404-页面不存在' },
  //   component: _import('error-pages/404')
  // }
]

/**
 * icon: 一级菜单的图标
 * inSidebar: 是否显示在侧边栏中
 * meta: { role: 'admin', title: '首页' } 页面信息，一般存储 角色权限及页面标题
 */
const route = new Router({ routes })

store.dispatch(types.INIT_PAGES_TAGS, pagesRouter)

route.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const isLogged = Auth.isLogged()
  const toLogin = to.name === 'login'
  const isLocking = storejs.get('locking') === '1'
  const toLocking = to.name === 'locking'

  // 锁屏判断
  if (isLocking && !toLocking) {
    next(false)
    return route.replace({ name: 'locking' })
  }

  // 已登录
  if (isLogged) {
    Utils.setTitle(to.meta.title)
    if (!store.getters.username) store.dispatch(types.FETCH_USER, routes)
    toLogin ? next({ name: 'home' }) : next()
  // 未登录
  } else {
    (toLogin || toLocking) ? next() : next({ name: 'login' })
  }
})

route.afterEach(() => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default route
