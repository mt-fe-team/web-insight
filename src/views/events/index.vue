<template lang="html">
  <Card shadow :padding="20">
    <div slot="title" class="ui-card-title">
      事件触发详情
    </div>
    <div slot="extra" style="margin-top: -10px;">
      <DatePicker class="w200" type="daterange"  v-model="rangeTime" :options="pickerOptions" placement="bottom-end" placeholder="请选择时间段" ></DatePicker>
    </div>

    <Row :gutter="20" type="flex">
      <Col span="6">
        <div class="events-list-tit" v-if="eventList.length">
          <div class="events-list-tit-item ell" v-for="item in eventList" :key="item.key" :class="{active: searchPms.event == item.key}">
            <span class="tit-item-name">{{item.name}}</span>
            <span class="tit-item-num">{{item.count}}</span>
          </div>
        </div>
      </Col>
      <Col span="18">
        <div class="mb20">
          <Table :loading="tblLoading" :columns="columns" :data="data"></Table>
        </div>
        <div class="tr" v-show="total">
          <Page :total="total" :page-size="searchPms.limit" @on-change="changePage"></Page>
        </div>
      </Col>
    </Row>
  </Card>
</template>

<script>
import Api from '@/api'
import Utils from '@/common/utils'
import moment from 'moment'

// const month3 = moment().add(-3, 'months')
// const initStartTime = Utils.startOfDay(month3)
// const initEndTime = Utils.endOfDay()

const initTime = Utils.getTimeSlot('today')
const initStartTime = initTime.startTime
const initEndTime = initTime.endTime

export default {
  data () {
    return {
      tblLoading: false,
      total: 0,
      eventList: [],
      columns: [],
      data: [],
      eventName: '',
      rangeTime: [initStartTime, initEndTime],
      searchPms: {
        startTime: null,
        endTime: null,
        event: '',
        page: 1,
        limit: 30
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今日',
            value () {
              const { startTime, endTime } = Utils.getTimeSlot('yesterday')
              return [startTime, endTime]
            }
          },
          {
            text: '昨日',
            value () {
              const { startTime, endTime } = Utils.getTimeSlot('yesterday')
              return [startTime, endTime]
            }
          },
          {
            text: '最近一周',
            value () {
              const { startTime, endTime } = Utils.getTimeSlot('week')
              return [startTime, endTime]
            }
          }
        ]
      }
    }
  },
  mounted () {
    // 获取各事件的发生数量
    // 获取默认选中的事件列表
    // const [startTime, endTime] = this.rangeTime
    // Api.getEventListByName({ eventName: 'serviceorder', startTime, endTime, groupBy: 'serviceId' })
    const [startTime, endTime] = this.rangeTime
    this.loadEventList({ startTime, endTime }).then(res => {
      if (res.length) {
        this.searchPms.event = res[0].key
        // 获取一个事件的详情列表
        this.loadListByEventName()
      }
    })
  },
  methods: {
    loadEventList () {
      const [startTime, endTime] = this.rangeTime
      return Api.getEventList({ startTime, endTime }).then(res => {
        this.eventList = res
        return res
      })
    },
    loadListByEventName () {
      const [startTime, endTime] = this.rangeTime
      this.searchPms.startTime = startTime
      this.searchPms.endTime = endTime
      Api.getEventListByName(this.searchPms).then(data => {
        const [list, count] = data
        this.total = count
        this.columns = Object.keys(list[0]).filter(v => v !== 'updatedAt' && v !== 'objectId').map(v => {
          if (v === 'createdAt') {
            return {
              title: v,
              key: v,
              render: (h, params) => {
                return h('div', [
                  h('div', moment(params.row.createdAt).format('YYYY-MM-DD')),
                  h('div', moment(params.row.createdAt).format('hh:mm:ss'))
                ])
              }
            }
          } else {
            return {
              title: v,
              key: v
            }
          }
        })
        this.data = list
      })
    },
    changeCurrEvent (event) {
      if (event === this.searchPms.event) return
      this.searchPms.event = event
      this.searchPms.page = 1
      this.loadListByEventName()
    },
    changePage (p) {
      this.searchPms.page = p
      this.loadListByEventName()
    }
  }
}
</script>
<style lang="less">
.events-list-tit {
  border: 1px solid #DDDEE1;
  &-item:not(:last-child) {
    border-bottom: 1px solid #DDDEE1;
  }
}
.events-list-tit-item {
  padding: 8px 60px 8px 6px;
  position: relative;
  .tit-item-num { 
    display: block; 
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    width: 60px;
    padding:8px 8px 8px 0;
    text-align: right;
  }
  &.active {
    color: #fff;
    background-color: #1890ff;
  }
}
</style>
