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
    context.commit(types.UPDATE_BREADCRUMB, payload)
  }

}

export default actions
