import * as types from '../types'

const mutations = {
  [types.LOGOUT] (state, data) {
    state.account = {}
  },

  [types.FETCH_USER] (state, data) {
    state.account = data
  },

  [types.INIT_SIDEBAR_MENUS] (state, data) {
    state.menus = data
  }
}

export default mutations
