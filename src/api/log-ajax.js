import AV from '@/common/av'
import Utils from '@/common/utils'

// const SEVEN_DAYS_AGO = Utils.getSevenDaysAgo()
// const TODAY = Utils.getToday()

export default {
  list ({ startTime, endTime }) {
    const query = new AV.Query('tb_mobile_ajax')

    startTime && query.greaterThanOrEqualTo('createdAt', startTime)
    endTime && query.lessThanOrEqualTo('createdAt', endTime)

    return query.find().then(list => list.map(v => v.toJSON()))
  }
}
