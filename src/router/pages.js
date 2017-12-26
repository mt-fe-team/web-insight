import Layout from '@/layouts/default'
import Dashboard from '@/views/dashboard/index'

const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/dashboard',
    icon: 'ios-speedometer-outline',
    inSidebar: true,
    meta: { title: '数据概览' },
    children: [
      { path: 'dashboard', name: 'home-dashboard', component: Dashboard, meta: { title: '首页' }}
    ]
  }, {
    path: '/ajax',
    name: 'ajax',
    inSidebar: true,
    component: Layout,
    icon: 'ios-lightbulb-outline',
    meta: { title: '异步请求' },
    children: [
      { path: 'index', name: 'ajax-index', component: _import('ajax/index'), meta: { title: '异步请求' }}
    ]
  }, {
    path: '/script',
    name: 'script',
    icon: 'ios-flask-outline',
    inSidebar: true,
    component: Layout,
    meta: { title: '脚本日志' },
    children: [
      { path: 'index', name: 'script-index', component: _import('script/index'), meta: { title: '脚本日志' }}
    ]
  }, {
    path: '/events',
    name: 'events',
    inSidebar: true,
    component: Layout,
    icon: 'ios-shuffle',
    meta: { title: '自定义事件' },
    children: [
      { path: 'index', name: 'events-index', component: _import('events/index'), meta: { title: '自定义事件' }}
    ]
  }, {
    path: '/error-pages',
    name: 'error-pages',
    inSidebar: true,
    icon: 'bug',
    component: Layout,
    redirect: '/401',
    meta: { title: '错误页面' },
    children: [
      { path: '401', name: 'err401', component: _import('error-pages/401'), meta: { title: '401' }},
      { path: '500', name: 'err500', component: _import('error-pages/500'), meta: { title: '500' }},
      { path: '404', name: 'err404', component: _import('error-pages/404'), meta: { title: '404' }}
    ]
  }
]
