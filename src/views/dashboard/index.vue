<template>
  <div>
    <Card :padding="0" class="mb20">
      <div slot="title" class="ui-card-title">
        <Icon type="ios-pulse-strong"></Icon>
        脚本日志统计
      </div>
      <div slot="extra" style="margin-top: -10px;">
        <Button type="text" size="large">最近7天</Button>
        <Button type="text" size="large">昨日</Button>
        <Button type="text" size="large">今日</Button>
        <!-- <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker> -->
      </div>
      <div>
        <Row >
          <Col span="4 bdr-r">
            <Row class="jslog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__rd"></i> 错误</Col>
                <Col span="16" class="f24 tr">12</Col>
            </Row>
            <Row class="jslog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__or"></i> 警告</Col>
                <Col span="16" class="f24 tr">3</Col>
            </Row>
            <Row class="jslog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__bl"></i> 调试</Col>
                <Col span="16" class="f24 tr">6</Col>
            </Row>
            <Row class="jslog-num-info">
                <Col span="8"><i class="ui-dot-state"></i> 日志</Col>
                <Col span="16" class="f24 tr">0</Col>
            </Row>
          </Col>
          <Col span="20 pt20">
            <js-line-chart height="220px" :data="jsChartData" id="jslogChart"/>
          </Col>
        </Row>
      </div>
    </Card>
  
    <Card :padding="0" class="mb20">
      <div slot="title" class="ui-card-title">
        <Icon type="ios-pulse-strong"></Icon>
        API调用统计
      </div>
      <div slot="extra" style="margin-top: -10px;">
        <Button type="text" size="large">最近7天</Button>
        <Button type="text" size="large">昨日</Button>
        <Button type="text" size="large">今日</Button>
        <!-- <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker> -->
      </div>
      <div>
        <Row>
          <Col span="4 bdr-r">
            <Row class="apilog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__rd"></i> 失败</Col>
                <Col span="16" class="f24 tr">2</Col>
            </Row>
            <Row class="apilog-num-info bdr-b">
                <Col span="8"><i class="ui-dot-state ui-dot-state__or"></i> 异常</Col>
                <Col span="16" class="f24 tr">34</Col>
            </Row>
            <Row class="apilog-num-info">
                <Col span="8"><i class="ui-dot-state"></i> 日志</Col>
                <Col span="16" class="f24 tr">2</Col>
            </Row>
          </Col>
          <Col span="20 pt20">
            <api-line-chart height="180px" :data="ajaxChartData" id="ajaxlogChart"/>
          </Col>
        </Row>
      </div>
    </Card>

    <Card :padding="0" class="mb20">
      <div slot="title" class="ui-card-title">
        <Icon type="ios-pulse-strong"></Icon>
        事件触发统计
      </div>
      <div slot="extra" style="margin-top: -10px;">
        <Button type="text" size="large">最近7天</Button>
        <Button type="text" size="large">昨日</Button>
        <Button type="text" size="large">今日</Button>
        <!-- <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker> -->
      </div>
      <div>
        <Row>
          <Col span="4 p10">
              <table class="eventlog-tbl-info">
                <colgroup>
                  <col width="70%">
                </colgroup>
                <tr><td>客服转化订单数</td><td>20</td></tr>
                <tr><td>添加体检人次数</td><td>20</td></tr>
                <tr><td>完善信息次数</td><td>20</td></tr>
              </table>
          </Col>
          <Col span="20" class="bdr-l" style="height: 500px;">
            <EventBarChart :data="eventChartData"/>
          </Col>
        </Row>
      </div>
    </Card>

  </div>
</template>

<script>
import JsLineChart from './components/js-line-chart'
import ApiLineChart from './components/api-line-chart'
import EventBarChart from './components/event-bar-chart'

// import Api from '@/api'
import moment from 'moment'

export default {
  name: 'Dashboard',
  data () {
    return {
      jsInfo: {
        errorNum: 0,
        warnNum: 0,
        infoNum: 0,
        debugNum: 0,
        startTime: 0,
        endTime: 0
      },
      ajaxInfo: {
        errorNum: 0,
        failNum: 0,
        list: [],
        startTime: 0,
        endTime: 0
      },
      eventInfo: {
        serviceOrderNum: 0,
        list: []
      },

      jsChartData: {
        xAxis: [],
        error: [],
        warn: [],
        info: [],
        debug: []
      },
      ajaxChartData: {
        xAxis: [],
        error: [],
        warn: []
      },
      eventChartData: {
        xAxis: [],
        error: []
      }
    }
  },
  components: {
    JsLineChart, EventBarChart, ApiLineChart
  },
  mounted () {
    // const { jsInfo, ajaxInfo, eventInfo } = this
    // Api.getListByTime('script', jsInfo.startTime, jsInfo.endTime).then(list => {
    //   console.log(list)
    // })

    // Api.getListByTime('ajax', jsInfo.startTime, jsInfo.endTime).then(list => {
    //   console.log(list)
    // })

    // Api.logAjax.get7DaysLogLive(this.updateAjax).then(list => {
    //   this.ajaxList = list
    //   this.formatAjaxData(list)
    // })
    // Api.logScript.get7DaysLogLive(this.updateScript).then(list => {
    //   this.jsList = list
    //   this.formatJsData(list)
    //   this.getJs7Days4Chart(list)
    // })
  },
  methods: {
    updateAjax (list) {
      this.ajaxList = list
      this.formatAjaxData(list)
    },
    updateScript (list) {
      this.jsList = list
      this.formatJsData(list)
      this.getJs7Days4Chart(list)
    },
    formatJsData (list) {
      const countRes = list.reduce((p, n) => {
        p[n.level]++
        return p
      }, { error: 0, warn: 0, info: 0, debug: 0 })

      this.jsErrorNum = countRes.error
      this.jsWarnNum = countRes.warn
      this.jsInfoNum = countRes.info
      this.jsDebugNum = countRes.debug
    },
    formatAjaxData (list) {
      const countRes = list.reduce((p, n) => {
        p[n.type]++
        return p
      }, { error: 0, fail: 0, isuccessnfo: 0 })

      this.ajaxErrorNum = countRes.error
      this.ajaxFailNum = countRes.fail
    },
    getJs7Days4Chart (list) {
      const timeArr = [
        moment().add(-6, 'days'),
        moment().add(-5, 'days'),
        moment().add(-4, 'days'),
        moment().add(-3, 'days'),
        moment().add(-2, 'days'),
        moment().add(-1, 'days'),
        moment()
      ]

      const rows = list.reduce((p, n) => {
        if (moment(n.createdAt).isBefore(timeArr[1])) {
          p.d1.push(n)
        } else if (moment(n.createdAt).isBefore(timeArr[2])) {
          p.d2.push(n)
        } else if (moment(n.createdAt).isBefore(timeArr[3])) {
          p.d3.push(n)
        } else if (moment(n.createdAt).isBefore(timeArr[4])) {
          p.d4.push(n)
        } else if (moment(n.createdAt).isBefore(timeArr[5])) {
          p.d5.push(n)
        } else if (moment(n.createdAt).isBefore(timeArr[6])) {
          p.d6.push(n)
        } else {
          p.d7.push(n)
        }
        return p
      }, { d1: [], d2: [], d3: [], d4: [], d5: [], d6: [], d7: [] })

      Object.keys(rows).forEach(v => {
        if (rows[v].length) {
          rows[v] = rows[v].reduce((p, n) => {
            p[n.level]++
            return p
          }, { error: 0, warn: 0, debug: 0, info: 0 })
        } else {
          rows[v] = { error: 0, warn: 0, debug: 0, info: 0 }
        }
      })

      const res = Object.keys(rows).reduce((p, n) => {
        p.error.push(rows[n].error)
        p.warn.push(rows[n].warn)
        p.info.push(rows[n].info)
        p.debug.push(rows[n].debug)
        return p
      }, { error: [], warn: [], info: [], debug: [] })

      res.xAxis = timeArr.map(v => v.format('MM-DD'))
      this.jsLogLiveChartData = res
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
  height: 70px;
  padding: 0 15px;
  line-height: 70px;
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

