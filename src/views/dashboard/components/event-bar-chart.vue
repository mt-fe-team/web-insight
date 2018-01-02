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
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {
          yAxis: null,
          data: null
        }
      }
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
          itemWidth: 14,
          itemHeight: 14,
          right: '4%'
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
                color: '#E6E6E6',
                width: 2
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
            data: this.data.yAxis,
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
                color: '#E6E6E6',
                width: 2
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
            data: this.data.data,
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

      // this.showLoading()
    },
    showLoading () {
      this.chart && this.chart.showLoading({ title: '正在努力加载中', color: '#2D8CF0' })
    },
    hideLoading () {
      this.chart && this.chart.hideLoading()
    }
  },
  watch: {
    'data' (newData) {
      if (!this.chart) return
      const option = this.chart.getOption()
      option.xAxis[0].data = newData.xAxis
      option.series[0].data = newData.data

      this.$nextTick(() => {
        this.chart.setOption(option)
        this.hideLoading()
      })
    },
    'loading' (newVal) {
      newVal ? this.showLoading() : this.hideLoading()
    }
  }
}
</script>
