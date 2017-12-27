import user from './user'
import AV from '@/common/av'

const getListByTime = (type, startTime, endTime) => {
  const query = new AV.Query(`tb_mobile_${type}`)

  startTime && query.greaterThanOrEqualTo('createdAt', startTime)
  endTime && query.lessThanOrEqualTo('createdAt', endTime)

  return query.find().then(list => list.map(v => v.toJSON()))
}

export default {
  user,
  getListByTime
}
