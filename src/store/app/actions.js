import Utils from '@/common/utils'
import * as types from '../types'

const actions = {
  [types.TOGGLE_SIDEBAR] (context, payload) {
    context.commit(types.TOGGLE_SIDEBAR)
  },

  [types.ADD_HISTORY_TAG] (context, payload) {
    context.commit(types.ADD_HISTORY_TAG, payload)
  },

  [types.DEL_HISTORY_TAG] (context, payload) {
    context.commit(types.DEL_HISTORY_TAG, payload)
  },

  [types.INIT_PAGES_TAGS] (context, payload) {
    const tags = Utils.getPagesTags(payload)
    context.commit(types.INIT_PAGES_TAGS, tags)
  },

  [types.UPDATE_BREADCRUMB] (context, payload) {
    console.log(payload)
    if (payload.length >= 2) {
      context.commit(types.SET_OPENED_MENUS, [payload[0].name])
    } else {
      context.commit(types.CLEARE_OPENED_MENUS)
    }
    context.commit(types.UPDATE_BREADCRUMB, payload)
  }
}

export default actions
