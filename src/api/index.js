import user from './user'
import AV from '@/common/av'
import Utils from '@/common/utils'
import { events } from '@/config'

// 获取日志列表
const getLogList = ({ type, startTime, endTime, props = [], groupName, chartData }) => {
  const query = new AV.Query(`tb_mobile_${type}`)

  // 时间筛选
  query.greaterThanOrEqualTo('createdAt', startTime)
  query.lessThanOrEqualTo('createdAt', endTime)

  // 按时间降序
  query.descending('createdAt')

  // 指定字段
  props.length && query.select(props)

  return query.find().then(list => {
    return Utils.buildChartData({
      list,
      groupName,
      chartData,
      startTime,
      endTime
    })
  })
}

// 获取事件触发数量
const getCount = ({ tblName, startTime, endTime }) => {
  const query = new AV.Query(`tb_mobile_event_${tblName}`)

  // 时间筛选
  query.greaterThanOrEqualTo('createdAt', startTime)
  query.lessThanOrEqualTo('createdAt', endTime)

  return query.count()
}

// const getCountByCloumnName

const getEventList = async ({ startTime, endTime }) => {
  const res = []

  const eventNames = Object.keys(events)
  for (const tbl of eventNames) {
    try {
      const count = await getCount({ tblName: tbl, startTime, endTime })
      console.log('count')
      console.log(count)
      res[events[tbl]] = count
      res.push({ name: events[tbl], key: tbl, count: count })
    } catch (e) {
      console.log(e)
      res.push({ name: events[tbl], key: tbl, count: 0 })
    }
  }

  return res
}

// 获取日志列表
const getJsLogList = ({ startTime, endTime, title = '', message = '', level, limit, page }) => {
  const query = new AV.Query(`tb_mobile_script`)

  // 时间筛选
  query.greaterThanOrEqualTo('createdAt', startTime)
  query.lessThanOrEqualTo('createdAt', endTime)

  // 按时间降序
  query.descending('createdAt')

  title && query.contains('title', title)
  message && query.contains('message', message)
  query.equalTo('level', level)

  // 分页
  query.limit(limit)
  query.skip((page - 1) * limit)
  return Promise.all([query.find().then(list => list.map(v => v.toJSON())), query.count()])
}

// 获取API调用日志列表
const getApiLogList = ({ startTime, endTime, title = '', message = '', type, limit, page }) => {
  const query = new AV.Query(`tb_mobile_ajax`)

  // 时间筛选
  query.greaterThanOrEqualTo('createdAt', startTime)
  query.lessThanOrEqualTo('createdAt', endTime)

  // 按时间降序
  query.descending('createdAt')

  // 分页
  query.limit(limit)
  query.skip((page - 1) * limit)

  title && query.contains('title', title)
  message && query.contains('message', message)
  query.equalTo('type', type)

  return Promise.all([query.find().then(list => list.map(v => v.toJSON())), query.count()])
}

const getEventListByName = ({ event, startTime, endTime, limit, page }) => {
  const query = new AV.Query(`tb_mobile_event_${event}`)

  // 时间筛选
  query.greaterThanOrEqualTo('createdAt', startTime)
  query.lessThanOrEqualTo('createdAt', endTime)

  // 按时间降序
  query.descending('createdAt')

  // 分页
  query.limit(limit)
  query.skip((page - 1) * limit)
  return Promise.all([query.find().then(list => list.map(v => v.toJSON())), query.count()])
}

export default {
  user,
  getLogList,
  getCount,
  getJsLogList,
  getApiLogList,
  getEventList,
  getEventListByName
}
