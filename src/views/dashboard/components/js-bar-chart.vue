<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
// import moment from 'moment'

const animationDuration = 3000

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
          xAxis: null,
          error: null,
          warn: null,
          info: null,
          debug: null
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
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          icon: 'rect',
          itemGap: 13,
          itemWidth: 14,
          itemHeight: 14,
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
          data: this.data.xAxis,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#E6E6E6',
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 14,
              color: '#333'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 10,
            fontFamily: 'Arial',
            textStyle: {
              fontSize: 14,
              color: '#333'
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: ['#E9E9E9'],
              type: 'dotted'
            }
          }
        }],
        series: [{
          name: '错误',
          data: this.data.error,
          type: 'bar',
          stack: 'group',
          barWidth: '20%',
          animationDuration,
          itemStyle: {
            normal: {
              color: 'rgba(236, 58, 67, 0.7)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter (p) {
                  return p.value > 4 ? p.value : ''
                }
              }
            }
          }
        }, {
          name: '警告',
          data: this.data.warn,
          type: 'bar',
          stack: 'group',
          barWidth: '20%',
          animationDuration,
          itemStyle: {
            normal: {
              color: 'rgba(255, 153, 19, 0.7)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter (p) {
                  return p.value > 4 ? p.value : ''
                }
              }
            }
          }
        }, {
          name: '调试',
          data: this.data.debug,
          type: 'bar',
          stack: 'group',
          barWidth: '20%',
          animationDuration,
          itemStyle: {
            normal: {
              color: 'rgba(24, 144, 255, 0.7)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter (p) {
                  return p.value > 4 ? p.value : ''
                }
              }
            }
          }
        }, {
          name: '日志',
          data: this.data.info,
          type: 'bar',
          stack: 'group',
          barWidth: '20%',
          animationDuration,
          itemStyle: {
            normal: {
              color: 'rgba(217, 217, 217, 1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter (p) {
                  return p.value > 4 ? p.value : ''
                }
              }
            }
          }
        }]
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
      option.series[0].data = newData.error
      option.series[1].data = newData.warn
      option.series[2].data = newData.info
      option.series[3].data = newData.debug

      this.$nextTick(() => {
        this.chart.setOption(option)
        this.hideLoading()
      })
    },
    'loading' (newVal) {
      newVal && this.showLoading()
    }
  }
}
</script>
