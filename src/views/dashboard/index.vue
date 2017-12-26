<template>
  <div>
    <div class="mb10">
      <Row :gutter="20">
        <Col span="6">
          <info-card color="#ffd572" iconType="ios-eye" :endVal="jsWarnNum" desc="脚本警告次数" />
        </Col>
        <Col span="6">
          <info-card color="#f25e43" iconType="upload" :endVal="jsErrorNum" desc="脚本错误次数" />
        </Col>
        <Col span="6">
          <info-card color="#ffd572" iconType="shuffle" :endVal="ajaxFailNum" desc="API请求失败次数" />
        </Col>
        <Col span="6">
          <info-card color="#f25e43" iconType="android-person-add" :endVal="ajaxErrorNum" desc="API请求异常次数" />
        </Col>
      </Row>
    </div>
    <div class="mb10 h200">
      <script-live-chart :data="jsLogLiveChartData"/>
    </div>
    <Row :gutter="20">
      <Col span="8">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="android-map"></Icon>
          最近一周API调用异常统计
        </p>
        <div class="data-source-row h200">
          <visite-volume></visite-volume>
        </div>
      </Card>
      </Col>
      <Col span="8" class="padding-left-10">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="ios-pulse-strong"></Icon>
          最近一周脚本日志统计
        </p>
        <div class="data-source-row h200">
          <data-source-pie
            :error="jsErrorNum"
            :warn="jsWarnNum"
            :info="jsInfoNum"
            :debug="jsDebugNum">
          </data-source-pie>
        </div>
      </Card>
      </Col>
      <Col span="8" class="padding-left-10">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="android-wifi"></Icon>
          最近一周用户事件触发次数统计
        </p>
        <div class="data-source-row h200">
          <user-flow></user-flow>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
// import ScriptLiveChart from '@/components/charts/line-chart'
// import LineChart from '@/components/charts/line-chart'
import InfoCard from './components/info-card'
import ScriptLiveChart from './components/script-live-chart'
import DataSourcePie from './components/data-source-pie'
import UserFlow from './components/user-flow'
import VisiteVolume from './components/visite-volume'

import Api from '@/api'
import moment from 'moment'

export default {
  name: 'Dashboard',
  data () {
    return {
      jsErrorNum: 0,
      jsWarnNum: 0,
      jsInfoNum: 0,
      jsDebugNum: 0,
      ajaxErrorNum: 0,
      ajaxFailNum: 0,
      jsLogLiveChartData: {
        xAxis: [],
        error: [],
        warn: [],
        info: [],
        debug: []
      },
      jsList: [],
      ajaxList: []
    }
  },
  components: {
    // LineChart,
    ScriptLiveChart,
    InfoCard,
    DataSourcePie,
    UserFlow,
    VisiteVolume
  },
  mounted () {
    Api.logAjax.get7DaysLogLive(this.updateAjax).then(list => {
      this.ajaxList = list
      this.formatAjaxData(list)
    })
    Api.logScript.get7DaysLogLive(this.updateScript).then(list => {
      this.jsList = list
      this.formatJsData(list)
      this.getJs7Days4Chart(list)
    })
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
