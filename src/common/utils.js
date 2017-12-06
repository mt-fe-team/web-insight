/**
 * 项目工具类
 */
import moment from 'moment'
moment.locale('zh-cn')

export default {
  // 设置页面标题
  setTitle (title) {
    document.title = title || 'Web日志分析系统'
  },
  // 从路由及用户获取侧边栏菜单列表
  getMenusByUser (user, routers) {
    routers = routers.filter(v => v.inSidebar)
    // 去掉component属性，减少state的缓存
    return this.withoutComponent(routers)
  },
  // 去掉 component 属性
  withoutComponent (routes) {
    let res = []
    res = routes.map(v => {
      v.component && delete v.component
      if (v.children) {
        res = res.concat(this.withoutComponent(v.children))
      }
      return v
    })
    return res
  },
  // 获取所有页面描述
  getPagesTags (pagesRouter) {
    let tags = []
    pagesRouter.forEach(v => {
      if (v.children) {
        tags = tags.concat(this.getPagesTags(v.children))
      } else {
        tags.push({ name: v.name, title: v.meta.title })
      }
    })
    return tags
  },
  // 获取当前页面导航信息
  getBreadcrumbData (currentRouter) {
    let matched = currentRouter.matched
    if (!matched[0].redirect || matched[0].name === 'home') matched = matched.slice(1)
    if (matched[0].name === 'home-dashboard') return []
    return matched.map(v => {
      return { title: v.meta.title, name: v.name, path: '' }
    })
  },
  // 获取7天之前的时间
  getSevenDaysAgo () {
    return moment().add(-7, 'days').toDate()
  },
  // 获取当天零晨的时间
  getTodayZero () {
    return moment(moment().format('YYYY-MM-DD 00:00:00')).toDate()
  }
}
