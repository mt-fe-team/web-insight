<template>
  <div style="width:100%;height:100%;" id="data_source_con">
  </div>
</template>

<script>
const echarts = require('echarts')

export default {
  name: 'dataSourcePie',
  data () {
    return {
      chart: null
    }
  },
  props: {
    error: {
      type: Number,
      default: 0
    },
    warn: {
      type: Number,
      default: 0
    },
    info: {
      type: Number,
      default: 0
    },
    debug: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.chart = echarts.init(document.getElementById('data_source_con'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['error', 'warn', 'info', 'debug']
        },
        series: [
          {
            name: '日志级别',
            type: 'pie',
            radius: '66%',
            center: ['50%', '60%'],
            data: [
              { value: this.error, name: 'error', itemStyle: { normal: { color: '#f25e43' }}},
              { value: this.warn, name: 'warn', itemStyle: { normal: { color: '#ffd58f' }}},
              { value: this.info, name: 'info', itemStyle: { normal: { color: '#abd5f2' }}},
              { value: this.debug, name: 'debug', itemStyle: { normal: { color: '#ab8df2' }}}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.chart.setOption(option)
      window.addEventListener('resize', () => {
        this.chart.resize()
      })
    })
  },
  methods: {
    updateChart (type, num) {
      if (!this.chart) return
      const option = this.chart.getOption()
      const idx = ['error', 'warn', 'info', 'debug'].indexOf(type)
      option.series[0].data[idx].value = num
      this.chart.setOption(option)
    }
  },
  watch: {
    'error' (num) {
      this.updateChart('error', num)
    },
    'warn' (num) {
      this.updateChart('warn', num)
    },
    'info' (num) {
      this.updateChart('info', num)
    },
    'debug' (num) {
      this.updateChart('debug', num)
    }
  }
}
</script>
