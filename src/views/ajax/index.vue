<template lang="html">
  <Row :gutter="10" class="rel">
    <Col span="10">
      <Card :bordered="false">
        <Tabs value="error" @on-click="onChangeTab">
          <TabPane label="错误" name="error">
            <log-list 
              :list="errorList" 
              :active-id="detail.objectId"
              type="ajax"
              @on-checked="onChecked"
            ></log-list>
          </TabPane>
          <TabPane label="失败" name="fail">
            <log-list 
              :list="failList" 
              :active-id="detail.objectId"
              type="ajax"
              @on-checked="onChecked"
            ></log-list>
          </TabPane>
          <TabPane label="成功" name="success">
             <log-list 
              :list="successList" 
              :active-id="detail.objectId"
              type="ajax"
              @on-checked="onChecked"
            ></log-list>
          </TabPane>
        </Tabs>
      </Card>
    </Col>
    <Col span="14">
      <Card :bordered="false">
        <log-detail :detail="detail" type="ajax"></log-detail>
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
      spinShow: false,
      detail: {}
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
      return this.logs.filter(v => v.type === 'error')
    },
    failList () {
      return this.logs.filter(v => v.type === 'fail')
    },
    successList () {
      return this.logs.filter(v => v.type === 'success')
    }
  },
  methods: {
    get7DaysLog (type) {
      this.spinShow = true
      Api.logAjax.get7DaysLog().then(res => {
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
