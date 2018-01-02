import actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
import store from 'store'
import { storeKeys } from '@/config'

const state = {
  sidebarOpened: !!+store.get('sidebarStatus'),
  historyTags: [],
  pagesTags: [],
  currentSystem: 'Mobile',
  breadCrumb: [{ title: '首页', name: 'home-dashboard', path: '/dashboard' }],
  isFullScreen: false,
  openedMenus: [],
  jsChartData: store.get(storeKeys.jsLogChart) || {},
  jsChartLoading: true,
  apiChartData: store.get(storeKeys.apiLogChart) || {},
  apiChartLoading: true,
  eventChartData: store.get(storeKeys.eventLogChart) || {},
  eventChartLoading: true
}

export default{
  state,
  actions,
  getters,
  mutations
}
