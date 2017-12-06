import AV from '@/common/av'
import Utils from '@/common/utils'

const SEVEN_DAYS_AGO = Utils.getSevenDaysAgo()
// const TODAY = Utils.getToday()

export default {

  get7DaysLog () {
    var query = new AV.Query('tb_mobile_ajax')
    query.greaterThan('createdAt', SEVEN_DAYS_AGO)
    return query.find().then(list => {
      return list.map(v => v.toJSON())
    })
  },

  get7DaysLogLive (onUpadte) {
    const ajaxLog = new AV.Query('tb_mobile_ajax').greaterThan('createdAt', SEVEN_DAYS_AGO)

    // 监听更新
    ajaxLog.subscribe().then(function (liveQuery) {
      liveQuery.on('create', () => {
        ajaxLog.find().then(list => {
          onUpadte(list.map(v => v.toJSON()))
        })
      })
    })

    return ajaxLog.find(function (list) {
      return list.map(v => v.toJSON())
    })
  }
}
