import store from 'store'
import * as types from '../types'

const mutations = {
  [types.TOGGLE_SIDEBAR] (state, data) {
    const targetState = !state.sidebarOpened
    store.set('sidebarStatus', ~~targetState)
    state.sidebarOpened = targetState
  },

  [types.ADD_HISTORY_TAG] (state, data) {
    const { params, query, name, meta } = data
    if (state.historyTags.some(v => v.name === name)) return
    // 最多只保存 8 个页面的历史记录
    if (state.historyTags.length === 8) {
      state.historyTags.splice(1, 1)
    }
    state.historyTags.push({ name, title: meta.title, query, params })
  },

  [types.DEL_HISTORY_TAG] (state, data) {
    const res = state.historyTags.filter(v => v.name === data.name)[0]
    if (!res) return
    state.historyTags.splice(state.historyTags.indexOf(res), 1)
  },

  [types.INIT_PAGES_TAGS] (state, data) {
    state.historyTags = data.filter(v => v.title === '首页')
    state.pagesTags = data
  },

  [types.UPDATE_BREADCRUMB] (state, data) {
    state.breadCrumb.length > 1 && state.breadCrumb.splice(1)

    if (data.length) {
      state.breadCrumb = state.breadCrumb.concat(data)
    }
  },

  [types.TOGGLE_FULL_SCREEN] (state, data) {
    if (!data.changeState) {
      const main = document.getElementById('app')
      if (state.isFullScreen) {
        const prop = ['exitFullscreen', 'mozCancelFullScreen', 'webkitCancelFullScreen', 'msExitFullscreen']
          .filter(v => document[v])[0]
        prop && document[prop]()
      } else {
        const prop = ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullScreen', 'msRequestFullscreen']
        .filter(v => main[v])[0]
        prop && main[prop]()
      }
    } else {
      state.isFullScreen = !state.isFullScreen
    }
  },

  [types.CHANGE_SYSTEM] (state, data) {
    state.currentSystem = data
  },

  [types.SET_OPENED_MENUS] (state, data) {
    state.openedMenus = data
  },

  [types.CLEARE_OPENED_MENUS] (state) {
    state.openedMenus = []
    console.log(state.openedMenus)
  },

  [types.GET_JS_CHARTDATA] (state, data) {
    state.jsChartData = data
    store()
  },

  [types.GET_API_CHARTDATA] (state, data) {
    state.apiChartData = data
  },

  [types.GET_EVENT_CHARTDATA] (state, data) {
    state.eventChartData = data
  },

  [types.JS_CHART_LOADING] (state, data) {
    state.jsChartLoading = data
  },

  [types.API_CHART_LOADING] (state, data) {
    state.apiChartLoading = data
  },

  [types.EVENT_CHART_LOADING] (state, data) {
    state.eventChartLoading = data
  }

}

export default mutations

// 路由信息的获取方式 (路由信息已经同步到store)
// state.route.path   // current path (string)
// state.route.params // current params (object)
// state.route.query  // current query (object)
