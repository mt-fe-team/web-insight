import AV from '@/common/av'
import Utils from '@/common/utils'

const SEVEN_DAYS_AGO = Utils.getSevenDaysAgo()

const EVENTS = [
  'service-order'
]

const querys = EVENTS.map(v => {
  const query = new AV.Query(`tb_mobile_${v}`)
  query.greaterThan('createdAt', SEVEN_DAYS_AGO)
  return query
})

export default {
  getEventsData () {
    querys.map(v => v.find()).then(res => {
      console.log(res)
      // 统计七天内的总数量，以及每天的数量
    })
  }
}
