import AV from '@/common/av'
import Utils from '@/common/utils'

const SEVEN_DAYS_AGO = Utils.getSevenDaysAgo()
const TODAY = Utils.getTodayZero()

export default {

  get7DaysLog () {
    var query = new AV.Query('tb_mobile_script')
    query.greaterThan('createdAt', SEVEN_DAYS_AGO)
    return query.find().then(list => {
      if (!list.length) return []
      return list.map(v => v.toJSON())
    })
  },

  getTodayLogLive (onUpadte) {
    const jsLog = new AV.Query('tb_mobile_script').greaterThan('createdAt', TODAY)

    // 监听更新
    jsLog.subscribe().then(function (liveQuery) {
      liveQuery.on('create', () => {
        jsLog.find().then(list => {
          onUpadte(list.map(v => v.toJSON()))
        })
      })
    })

    return jsLog.find().then(list => {
      return list.map(v => v.toJSON())
    })
  },

  get7DaysLogLive (onUpadte) {
    const jsLog = new AV.Query('tb_mobile_script').greaterThan('createdAt', SEVEN_DAYS_AGO)

    // 监听更新
    jsLog.subscribe().then(function (liveQuery) {
      liveQuery.on('create', () => {
        jsLog.find().then(list => {
          onUpadte(list.map(v => v.toJSON()))
        })
      })
    })

    return jsLog.find().then(list => {
      return list.map(v => v.toJSON())
    })
  }
}
