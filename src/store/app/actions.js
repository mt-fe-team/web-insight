import Utils from '@/common/utils'
import Api from '@/api'
import * as types from '../types'
import { storeKeys } from '@/config'
import store from 'store'

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
  },

  [types.GET_JS_CHARTDATA] (context, payload) {
    const { startTime, endTime } = payload

    context.commit(types.JS_CHART_LOADING, true)
    return Api.getLogList({
      type: 'script',
      startTime,
      endTime,
      props: ['level'],
      groupName: 'level',
      chartData: { error: [], debug: [], warn: [], info: [] }
    }).then(res => {
      res.isToday && store.set(storeKeys.jsLogChart, res)
      context.commit(types.GET_JS_CHARTDATA, res)
      context.commit(types.JS_CHART_LOADING, false)
    }).catch(() => {
      context.commit(types.JS_CHART_LOADING, false)
    })
  },

  async [types.GET_API_CHARTDATA] (context, payload) {
    const { startTime, endTime } = payload

    context.commit(types.API_CHART_LOADING, true)
    try {
      const res = await Api.getLogList({
        type: 'ajax',
        startTime,
        endTime,
        props: ['type'],
        groupName: 'type',
        chartData: { error: [], fail: [], success: [] }
      })
      res.isToday && store.set(storeKeys.apiLogChart, res)
      context.commit(types.GET_API_CHARTDATA, res)
    } catch (e) { }

    context.commit(types.API_CHART_LOADING, false)
  },

  async [types.GET_EVENT_CHARTDATA] (context, payload) {
    // const res = [{name:'', key: '', count: 0}]
    let res = []

    context.commit(types.EVENT_CHART_LOADING, true)
    res = await Api.getEventList(payload)
    context.commit(types.EVENT_CHART_LOADING, false)

    const cData = {
      nums: res,
      chartData: {
        yAxis: res.map(v => v.name),
        data: res.map(v => v.count)
      }
    }

    store.set(storeKeys.eventLogChart, cData)
    context.commit(types.GET_EVENT_CHARTDATA, cData)
  }
}

export default actions
