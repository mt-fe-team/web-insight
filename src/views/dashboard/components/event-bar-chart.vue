<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
// import moment from 'moment'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['事件触发次数'],
          x: 'right'
        },
        calculable: true,
        grid: {
          left: '3%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                color: '#d9d9d9'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#333333'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['客服转化订单数', '添加体检人次数', '完善信息次数'],
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
                color: '#333333'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#d9d9d9'
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#d9d9d9']
              }
            }
          }
        ],
        series: [
          {
            name: '事件触发次数',
            type: 'bar',
            data: [20, 80, 5],
            barWidth: 40,
            barMaxWidth: 40,
            itemStyle: {
              normal: {
                color: '#83bff6'
              },
              emphasis: {
                color: '#2D8CF0'
              }
            }
          }
        ]
      })

      // this.$nextTick(() => {
      //   window.addEventListener('resize', () => this.chart.resize())
      // })
    }
  },
  watch: {
    'data' (newData) {
      // if (!this.chart) return
      // const option = this.chart.getOption()
      // option.xAxis[0].data = newData.xAxis
      // option.series[0].data = newData.error
      // option.series[1].data = newData.warn
      // option.series[2].data = newData.info
      // option.series[3].data = newData.debug
      // this.chart.setOption(option)
    }
  }
}
</script>
