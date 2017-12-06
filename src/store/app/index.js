import Cookies from 'js-cookie'
import actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

const state = {
  sidebarOpened: !!+Cookies.get('sidebarStatus'),
  historyTags: [],
  pagesTags: [],
  currentSystem: 'Mobile',
  breadCrumb: [{ title: '首页', name: 'home-dashboard', path: '/dashboard' }],
  isFullScreen: false
}

export default{
  state,
  actions,
  getters,
  mutations
}
