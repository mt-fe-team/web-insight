<template>
  <div>
    <Card :padding="0" class="mb20" shadow>
      <div slot="title" class="ui-card-title">
        <Icon type="ios-pulse-strong"></Icon>
        脚本日志统计
      </div>
      <div slot="extra" style="margin-top: -10px;">
        <Button type="text" size="large" :class="{'c-bl': jsTimeType == 'week'}" @click="changeTime('js','week')">最近7天</Button>
        <Button type="text" size="large" :class="{'c-bl': jsTimeType == 'yesterday'}" @click="changeTime('js','yesterday')">昨日</Button>
        <Button type="text" size="large" :class="{'c-bl': jsTimeType == 'today'}" @click="changeTime('js','today')">今日</Button>
        <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" :clearable="false"
        v-model="jsRangeTime" @on-change="changeRangeTime('js')"></Date-picker>
        <a class="dib pl10" href="#" @click.prevent="refreshChart('js')">
            <Icon type="ios-loop-strong f16"></Icon>
        </a>
      </div>
      <div>
        <Row >
          <Col span="4 bdr-r">
            <Row class="jslog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__rd"></i> 错误</Col>
                <Col span="16" class="f24 tr">
                  <counter :endVal="jsErrorNum" />
                </Col>
            </Row>
            <Row class="jslog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__or"></i> 警告</Col>
                <Col span="16" class="f24 tr">
                  <counter :endVal="jsWarnNum" />
                </Col>
            </Row>
            <Row class="jslog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__bl"></i> 调试</Col>
                <Col span="16" class="f24 tr">
                  <counter :endVal="jsDebugNum" />
                </Col>
            </Row>
            <Row class="jslog-num-info">
                <Col span="8"><i class="ui-dot-state"></i> 日志</Col>
                <Col span="16" class="f24 tr">
                  <counter :endVal="jsInfoNum" />
                </Col>
            </Row>
          </Col>
          <Col span="20 pt20">
            <js-bar-chart height="220px" :data="jsChartData" :loading="jsChartLoading" id="jslogChart"/>
          </Col>
        </Row>
      </div>
    </Card>
  
    <Card :padding="0" class="mb20" shadow>
      <div slot="title" class="ui-card-title">
        <Icon type="ios-pulse-strong"></Icon>
        API调用统计
      </div>
      <div slot="extra" style="margin-top: -10px;">
        <Button type="text" size="large" :class="{'c-bl': apiTimeType == 'week'}" @click="changeTime('api','week')">最近7天</Button>
        <Button type="text" size="large" :class="{'c-bl': apiTimeType == 'yesterday'}" @click="changeTime('api','yesterday')">昨日</Button>
        <Button type="text" size="large" :class="{'c-bl': apiTimeType == 'today'}" @click="changeTime('api','today')">今日</Button>
        <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" :clearable="false"
          v-model="apiRangeTime" @on-change="changeRangeTime('api')"
        ></Date-picker>
        <a class="dib pl10" href="#" @click.prevent="refreshChart('api')">
            <Icon type="ios-loop-strong f16"></Icon>
        </a>
      </div>
      <div>
        <Row>
          <Col span="4 bdr-r">
            <Row class="apilog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__rd"></i> 失败</Col>
                <Col span="16" class="f24 tr"><counter :endVal="apiErrorNum" /></Col>
            </Row>
            <Row class="apilog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__or"></i> 异常</Col>
                <Col span="16" class="f24 tr"><counter :endVal="apiFailNum" /></Col>
            </Row>
            <Row class="apilog-num-info">
                <Col span="8"><i class="ui-dot-state ui-dot-state__gr"></i> 成功</Col>
                <Col span="16" class="f24 tr"><counter :endVal="apiSuccessNum" /></Col>
            </Row>
          </Col>
          <Col span="20 pt20">
            <api-bar-chart height="220px" :data="apiChartData" :loading="apiChartLoading" id="apilogChart"/>
          </Col>
        </Row>
      </div>
    </Card>

    <Card :padding="0" class="mb20" shadow>
      <div slot="title" class="ui-card-title">
        <Icon type="ios-pulse-strong"></Icon>
        事件触发统计
      </div>
      <div slot="extra" style="margin-top: -10px;">
        <Button type="text" size="large" :class="{'c-bl': eventTimeType == 'week'}" @click="changeTime('event','week')">最近7天</Button>
        <Button type="text" size="large" :class="{'c-bl': eventTimeType == 'yesterday'}" @click="changeTime('event','yesterday')">昨日</Button>
        <Button type="text" size="large" :class="{'c-bl': eventTimeType == 'today'}" @click="changeTime('event','today')">今日</Button>
        <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" :clearable="false"
        v-model="eventRangeTime" @on-change="changeRangeTime('event')"
        ></Date-picker>
        <a class="dib pl10" href="#" @click.prevent="refreshChart('event')">
            <Icon type="ios-loop-strong f16"></Icon>
        </a>
      </div>
      <div>
        <Row>
          <Col span="4 p10">
              <table class="eventlog-tbl-info">
                <colgroup>
                  <col width="70%">
                </colgroup>
                <tr v-for="item in eventNums" :key="item.key"><td class="ell" :title="item.name">{{item.name}}</td><td>{{item.count}}</td></tr>
              </table>
          </Col>
          <Col span="20" class="bdr-l" style="height: 500px;">
            <EventBarChart :data="eventChartData" :loading="eventChartLoading" id="eventChart"/>
          </Col>
        </Row>
      </div>
    </Card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Utils from '@/common/utils'
import Counter from '@/components/counter'
import JsBarChart from './components/js-bar-chart'
import ApiBarChart from './components/api-bar-chart'
import EventBarChart from './components/event-bar-chart'

export default {
  name: 'Dashboard',
  data () {
    const { startTime, endTime } = Utils.getTimeSlot('today')
    return {
      jsTimeType: 'today',
      apiTimeType: 'today',
      eventTimeType: 'today',
      initStartTime: startTime,
      initEndTime: endTime,
      jsRangeTime: [startTime, endTime],
      apiRangeTime: [startTime, endTime],
      eventRangeTime: [startTime, endTime]
    }
  },
  components: {
    JsBarChart, EventBarChart, ApiBarChart, Counter
  },
  computed: {
    ...mapGetters([
      'jsErrorNum',
      'jsWarnNum',
      'jsDebugNum',
      'jsInfoNum',
      'jsChartData',
      'apiErrorNum',
      'apiFailNum',
      'apiSuccessNum',
      'apiChartData',
      'jsChartLoading',
      'apiChartLoading',
      'eventChartLoading',
      'eventNums',
      'eventChartData'
    ])
  },
  mounted () {
    const { startTime, endTime } = Utils.getTimeSlot('today')
    this.$store.dispatch(this.$$types.GET_JS_CHARTDATA, { startTime, endTime })
    this.$store.dispatch(this.$$types.GET_API_CHARTDATA, { startTime, endTime })
    this.$store.dispatch(this.$$types.GET_EVENT_CHARTDATA, { startTime, endTime })
  },
  methods: {
    changeTime (type, state) {
      if (type === 'js' && state === this.jsTimeType) return
      if (type === 'api' && state === this.apiTimeType) return
      if (type === 'event' && state === this.eventTimeType) return

      const { startTime, endTime } = Utils.getTimeSlot(state)
      switch (type) {
        case 'js':
          this.jsTimeType = state
          this.jsRangeTime = [startTime, endTime]
          this.$store.dispatch(this.$$types.GET_JS_CHARTDATA, { startTime, endTime })
          break
        case 'api':
          this.apiTimeType = state
          this.apiRangeTime = [startTime, endTime]
          this.$store.dispatch(this.$$types.GET_API_CHARTDATA, { startTime, endTime })
          break
        case 'event':
          this.eventTimeType = state
          this.eventRangeTime = [startTime, endTime]
          this.$store.dispatch(this.$$types.GET_EVENT_CHARTDATA, { startTime, endTime })
          break
      }
    },

    changeRangeTime (type) {
      this.$nextTick(() => {
        let st, et, TYPE
        if (type === 'js') {
          this.jsTimeType = ''
          st = this.jsRangeTime[0]
          et = this.jsRangeTime[1]
          TYPE = this.$$types.GET_JS_CHARTDATA
        } else if (type === 'api') {
          this.apiTimeType = ''
          st = this.apiRangeTime[0]
          et = this.apiRangeTime[1]
          TYPE = this.$$types.GET_API_CHARTDATA
        } else {
          this.eventTimeType = ''
          st = this.eventRangeTime[0]
          et = this.eventRangeTime[1]
          TYPE = this.$$types.GET_EVENT_CHARTDATA
        }

        this.$store.dispatch(TYPE, { startTime: Utils.startOfDay(st), endTime: Utils.endOfDay(et) })
      })
    },

    refreshChart (type) {
      let startTime, endTime, TYPE
      if (type === 'js') {
        [startTime, endTime] = this.jsRangeTime
        TYPE = this.$$types.GET_JS_CHARTDATA
      } else if (type === 'api') {
        [startTime, endTime] = this.apiRangeTime
        TYPE = this.$$types.GET_API_CHARTDATA
      } else {
        [startTime, endTime] = this.eventRangeTime
        TYPE = this.$$types.GET_EVENT_CHARTDATA
      }

      this.$store.dispatch(TYPE, { startTime, endTime })
    }
  }
}
</script>

<style lang="less">
@import '../../assets/css/var.less';

.jslog-num-info {
  height: 60px;
  padding: 0 15px;
  line-height: 60px;
  font-size: 16px;
}
.apilog-num-info {
  height: 80px;
  padding: 0 15px;
  line-height: 80px;
  font-size: 16px;
}
.ui-dot-state{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: #d9d9d9;
  &__rd {background-color: @brand-error;}
  &__bl {background-color: @brand-info;}
  &__or {background-color: @brand-warning;}
  &__gr {background-color: @brand-success;}
}
.eventlog-tbl-info {
  width: 100%;
  table-layout: fixed;
  td { padding: 10px 5px; font-size: 16px;}
  tr > td:last-child {text-align: right}
}
.ui-card-title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
</style>

