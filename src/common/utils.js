/**
 * 项目工具类
 */
import moment from 'moment'
moment.locale('zh-cn')
import _ from 'lodash'

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

  startOfDay (date = new Date()) {
    return moment(date).startOf('day').toDate()
  },

  endOfDay (date = new Date()) {
    return moment(date).endOf('day').toDate()
  },

  // 根据时间段获取起始时间
  getTimeSlot (type) {
    const endOfTotday = moment().endOf('day').toDate()
    const yesterday = moment().add(-1, 'days')

    return {
      'today': {
        startTime: moment().startOf('day').toDate(),
        endTime: endOfTotday
      },
      'yesterday': {
        startTime: yesterday.startOf('day').toDate(),
        endTime: yesterday.endOf('day').toDate()
      },
      'week': {
        startTime: moment().add(-6, 'days').startOf('day').toDate(),
        endTime: endOfTotday
      }
    }[type]
  },

  // 构建图表数据
  buildChartData ({ list, groupName, chartData, startTime, endTime }) {
    const isDay = moment(endTime).diff(moment(startTime), 'days') >= 1
    const isWeek = moment().add(-6, 'days').startOf('day').toDate() - startTime <= 0
    const isToday = moment().startOf('day').toDate() - startTime === 0

    let formatStr = ''
    if (!isDay) {
      formatStr = 'hh:mm'
    } else if (isWeek) {
      formatStr = 'ddd'
    } else {
      formatStr = 'MM/DD'
    }

    const data = list.map(v => {
      const time = moment(v.get('createdAt')).format(formatStr)
      return { createdAt: time, [groupName]: v.get(groupName) }
    })

    const groupByTimeObj = _.groupBy(data, 'createdAt')

    Object.keys(groupByTimeObj).forEach(v => {
      groupByTimeObj[v] = _.countBy(groupByTimeObj[v], groupName)
    })

    const levelKeys = Object.keys(chartData)
    Object.keys(groupByTimeObj).forEach(v => {
      levelKeys.forEach(n => chartData[n].push(groupByTimeObj[v][n] || 0))
    })

    return {
      isToday,
      nums: _.countBy(data, groupName),
      chartData: {
        xAxis: Object.keys(groupByTimeObj),
        ...chartData
      }
    }
  }
}
