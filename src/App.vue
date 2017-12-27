<template>
  <div id="app" class="app-wrapper">
    <router-view/>
  </div>
</template>

<script>
import Api from '@/api'
import moment from 'moment'
import { events } from '@/config'

export default {
  name: 'app',
  mounted () {
    // 获取所有今日的数据，并缓存
    const startTime = moment(moment().format('YYYY-MM-DD 00:00:00')).toDate()

    // 各事件列表
    events.map(v => {
      Api.getListByTime(`event_${v}`, startTime).then(list => {
        console.log(v, list)
      })
    })

    // 脚本日志
    Api.getListByTime('script', startTime).then(list => {
      console.log('script', list)
    })

    // api日志
    Api.getListByTime('ajax', startTime).then(list => {
      console.log('ajax', list)
    })
  }
}
</script>

<style lang="less">
@import './assets/css/index.less'; // 全局自定义的css样式
.lock-screen-back{
    border-radius: 50%;
    z-index: -1;
    box-shadow: 0 0 0 0 #667aa6 inset;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    transition: all 3s;
}
.app-wrapper {
  height: 100%;
  width: 100%;
}
</style>
