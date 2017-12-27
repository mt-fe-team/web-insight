<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'

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
      default: {
        xAxis: [moment().format('MM-DD')],
        error: [0],
        warn: [0],
        info: [0],
        debug: [0]
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
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['错误', '警告', '调试', '日志'],
          right: '4%'
        },
        grid: {
          left: '3%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.data.timeData,
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
        }],
        yAxis: [{
          type: 'value',
          name: '单位（条）',
          nameTextStyle: {
            color: '#333'
          },
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
        }],
        axis: {
          lineStyle: {
            color: '#F6F6F6'
          }
        },
        series: [{
          name: '错误',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          itemStyle: {
            normal: {
              color: '#ec3a43',
              borderWidth: 12
            }
          },
          data: this.data.error
        }, {
          name: '警告',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          itemStyle: {
            normal: {
              color: '#ff5b05',
              borderWidth: 12
            }
          },
          data: this.data.warn
        }, {
          name: '日志',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          itemStyle: {
            normal: {
              color: '#d9d9d9',
              borderWidth: 12
            }
          },
          data: this.data.info
        }, {
          name: '调试',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          itemStyle: {
            normal: {
              color: '#1890ff',
              borderWidth: 12
            }
          },
          data: this.data.debug
        }]
      })

      // this.$nextTick(() => {
      //   window.addEventListener('resize', () => this.chart.resize())
      // })
    }
  },
  watch: {
    'data' (newData) {
      if (!this.chart) return
      const option = this.chart.getOption()
      option.xAxis[0].data = newData.xAxis
      option.series[0].data = newData.error
      option.series[1].data = newData.warn
      option.series[2].data = newData.info
      option.series[3].data = newData.debug
      this.chart.setOption(option)
    }
  }
}
</script>
