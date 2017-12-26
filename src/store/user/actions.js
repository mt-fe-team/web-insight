import api from '@/api'
import * as types from '../types'
import Utils from '@/common/utils'

const actions = {
  [types.LOGIN] (context, payload) {
    return api.user.login(payload).then(res => {
      return res.toJSON()
    })
  },

  [types.LOGOUT] (context, payload) {
    return api.user.logout(payload).then(res => {
      context.commit(types.LOGOUT, res)
      return res
    })
  },

  [types.FETCH_USER] (context, payload) {
    let user = api.user.getUser()
    user = user ? user.toJSON() : {}
    context.commit(types.FETCH_USER, user)
    context.dispatch(types.INIT_SIDEBAR_MENUS, { user, routers: payload })
  },

  [types.INIT_SIDEBAR_MENUS] (context, payload) {
    const sidebarMenus = Utils.getMenusByUser(payload.user, payload.routers)
    context.commit(types.INIT_SIDEBAR_MENUS, sidebarMenus)
  }
}

export default actions
