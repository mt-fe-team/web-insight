<template>
  <Card :padding="0" :bordered="false">
    <Row>
      <Col :style="{backgroundColor: color, color: 'white'}" span="8">
        <Row type="flex" align="middle" justify="center" class="h100">
          <Icon :type="iconType" :size="iconSize"></Icon>
        </Row>
      </Col>
      <Col span="16">
        <Row type="flex" align="middle" justify="center" class="h100">
          <div class="tc">
            <span class="info-card-num" :style="{color: color}">
              <count-to ref="count" :startVal="0" :endVal="endVal" :duration="3000" />
            </span>
            <div class="info-card-desc">{{desc}}</div>
          </div>
        </Row>
      </Col>
    </Row>
  </Card>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'inforCard',
  components: {
    CountTo
  },
  props: {
    idName: String,
    endVal: Number,
    color: String,
    iconType: String,
    desc: String,
    iconSize: {
      type: Number,
      default: 40
    }
  },
  watch: {
    'endVal' (to) {
      this.$refs.count.start()
    }
  }
}
</script>

<style lang="less">
.info-card{
  &-num {
    font-size: 30px;
    font-weight: 700;
  }
  &-desc {
    font-size: 12px;
    color: #c8c8c8;
  }
}
</style>

