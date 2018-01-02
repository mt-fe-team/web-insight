<template lang="html">
  <Card shadow :padding="20">
    <div slot="title" class="ui-card-title">
      API请求日志列表
    </div>
    <Row class="mb20" :gutter="20">
       <Col span="8">
        <div data-flex>
          <div class="w75 lh32">页面标题:</div>
          <div data-cell><Input placeholder="请输入页面标题" v-model="searchPms.title"></Input></div>
        </div>
      </Col>
      <Col span="8">
        <div data-flex>
          <div class="w75 lh32">消息内容:</div>
          <div data-cell><Input placeholder="请输入消息内容" v-model="searchPms.message"></Input></div>
        </div>
      </Col>
      <Col span="8">
        <div data-flex>
          <div class="w75 lh32">发生时间:</div>
          <div data-cell>
            <DatePicker class="pct100" type="daterange"  v-model="rangeTime" :options="pickerOptions" placement="bottom-end" placeholder="请选择时间段" ></DatePicker>
          </div>
        </div>
      </Col>
      <Col span="24" class="tr mt15">
        <Button type="primary" @click="search">查询</Button>
        <Button @click="reset">重置</Button>
      </Col>
    </Row>

    <div class="tr mb10">
      <ButtonGroup>
        <Button :type="searchPms.type == 'error' ? 'error' : 'ghost'" @click="changetype('error')">错误</Button>
        <Button :type="searchPms.type == 'fail' ? 'warning' : 'ghost'" @click="changetype('fail')">异常</Button>
        <Button :type="searchPms.type == 'success' ? 'success' : 'ghost'" @click="changetype('success')">成功</Button>
      </ButtonGroup>
    </div>

    <div class="mb20">
      <Table :loading="tblLoading" :columns="columns" :data="data"></Table>
    </div>

    <div class="tr" v-show="total">
        <Page :total="total" :page-size="searchPms.limit" @on-change="changePage"></Page>
    </div>
  </Card>
</template>

<script>
import Api from '@/api'
import Utils from '@/common/utils'
import ExpandRow from './components/expand-row'
import moment from 'moment'

// const month3 = moment().add(-3, 'months')
// const initStartTime = Utils.startOfDay(month3)
// const initEndTime = Utils.endOfDay()

const initTime = Utils.getTimeSlot('today')
const initStartTime = initTime.startTime
const initEndTime = initTime.endTime

export default {
  components: { ExpandRow },
  data () {
    return {
      tblLoading: true,
      total: 0,
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(ExpandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '发生时间',
          key: 'createdAt',
          render: (h, params) => {
            return h('div', [
              h('div', moment(params.row.createdAt).format('YYYY-MM-DD')),
              h('div', moment(params.row.createdAt).format('hh:mm:ss'))
            ])
          }
        },
        {
          title: '接口',
          key: 'api'
        },
        {
          title: '耗时(ms)',
          key: 'duration'
        },
        {
          title: '发生页面',
          key: 'page'
        },
        {
          title: '页面标题',
          key: 'title',
          render: (h, params) => {
            return params.row.title || '-'
          }
        },
        {
          title: '浏览器 & 系统',
          key: 'browser',
          render: (h, params) => {
            return params.row.browser + params.row.os
          }
        }
      ],
      data: [],
      rangeTime: [initStartTime, initEndTime],
      searchPms: {
        startTime: null,
        endTime: null,
        title: '',
        message: '',
        type: 'error',
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
    this.loadList()
  },
  methods: {
    changetype (type) {
      if (type === this.searchPms.type) return
      this.searchPms.type = type
      this.loadList()
    },
    search () {
      this.btnLoading = true
      this.loadList()
    },
    reset () {
      this.searchPms.title = ''
      this.searchPms.message = ''
      this.searchPms.page = 0
      this.rangeTime = [initStartTime, initEndTime]
      this.loadList()
    },
    changePage (p) {
      this.searchPms.page = p
    },
    loadList (isBtn) {
      // 获取 错误类型的 异常数据
      this.tblLoading = true
      this.searchPms.startTime = this.rangeTime[0]
      this.searchPms.endTime = this.rangeTime[1]
      return Api.getApiLogList(this.searchPms).then(res => {
        this.data = res[0]
        this.total = res[1]
        this.tblLoading = false
        isBtn && (this.btnLoading = false)
        return res
      }).catch(e => {
        console.warn(e)
        this.tblLoading = false
        isBtn && (this.btnLoading = false)
        throw e
      })
    }
  }
}
</script>