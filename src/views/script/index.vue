<template lang="html">
  <Row :gutter="10" class="rel">
    <Col span="10">
      <Card :bordered="false">
        <Tabs value="error" @on-click="onChangeTab">
          <TabPane label="错误" name="error">
            <log-list 
              :list="errorList" 
              :active-id="detail.objectId"
              type="script"
              @on-checked="onChecked"
            ></log-list>
          </TabPane>
          <TabPane label="警告" name="warn">
            <log-list 
              :list="warnList" 
              :active-id="detail.objectId"
              type="script"
              @on-checked="onChecked"
            ></log-list>
          </TabPane>
          <TabPane label="信息" name="info">
             <log-list 
              :list="infoList" 
              :active-id="detail.objectId"
              type="script"
              @on-checked="onChecked"
            ></log-list>
          </TabPane>
          <TabPane label="调试" name="debug">
            <log-list 
              :list="debugList" 
              :active-id="detail.objectId"
              type="script"
              @on-checked="onChecked"
            ></log-list>
          </TabPane>
        </Tabs>
      </Card>
    </Col>
    <Col span="14">
      <Card :bordered="false">
        <log-detail :detail="detail" type="script"></log-detail>
      </Card>
    </Col>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>

<script>
import Api from '@/api'
import LogList from '@/components/log-list'
import LogDetail from '@/components/log-detail'

export default {
  data () {
    return {
      type: 'error',
      logs: [],
      detail: {},
      spinShow: false
    }
  },
  components: {
    LogList,
    LogDetail
  },
  mounted () {
    this.get7DaysLog(this.type)
  },
  computed: {
    errorList () {
      return this.logs.filter(v => v.level === 'error')
    },
    warnList () {
      return this.logs.filter(v => v.level === 'warn')
    },
    infoList () {
      return this.logs.filter(v => v.level === 'info')
    },
    debugList () {
      return this.logs.filter(v => v.level === 'debug')
    }
  },
  methods: {
    test () {
      window.alert(1)
    },
    get7DaysLog (type) {
      this.spinShow = true
      Api.logScript.get7DaysLog().then(res => {
        this.spinShow = false
        this.logs = res
        this.type = 'error'
        this.detail = this.errorList[0] || {}
      }).catch(e => { this.spinShow = false })
    },
    onChecked (detail) {
      this.detail = detail
    },
    onChangeTab (name) {
      this.type = name
      this.detail = this[`${name}List`][0] || {}
    }
  }
}
</script>

<style lang="less">
.ui-list-empty {
    text-align: center;
    line-height: 50px;
    color: #888;
}
</style>

// <Row class="script-logitem">
//   <Col span="20" class="script-logitem-msg">jQuery is not defined</Col>
//   <Col span="4" class="tr">
//     <span class="script-logitem-num">2</span>
//     <Icon class="script-logitem-arrow" type="ios-arrow-right"></Icon>
//   </Col>
//   <div class="script-logitem-indicator"><div class="script-logitem-indicator-baffle" style="transform: translateX(5%)"></div></div>
// </Row>