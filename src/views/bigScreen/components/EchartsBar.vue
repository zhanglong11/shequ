<template>
  <VChart :ref="id" class="chart" :option="option" />
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    // 是否显示Y轴
    isYAxis: {
      type: Boolean,
      default: true
    },
    xAxis: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 是否显示图例
    isLegend: {
      type: Boolean,
      default: true
    },
    // 显示单位
    isUnit: {
      type: Boolean,
      default: true
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    // 这里存放数据
    return {
      option: {}
    }
  },
  created() {
    this.setOptions()
  },
  mounted() {
    window.addEventListener('resize', this.init)
  },
  // 方法集合
  methods: {
    // 设置数据
    setOptions() {
      const wrapColors = [
        ['#fa4d42', '#f3c0bc'],
        ['#6383fa', '#c5cff3']
      ]
      const series = []
      this.dataList.forEach((e, i) => {
        let name = ''
        if (this.isLegend) {
          name = i === 0 ? '处理中' : '已处理'
        }
        series.push({
          type: 'bar',
          name,
          barWidth: 10,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: wrapColors[i][0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: wrapColors[i][1] // 100% 处的颜色
                }
              ]
            }
          },
          data: e
        })
      })
      this.option = {
        grid: {
          top: this.isUnit ? 30 : '3%',
          left: this.isYAxis ? '3%' : 0,
          right: 0,
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item'
          // axisPointer: {
          //   type: 'cross'
          // }
        },
        legend: {
          show: this.isLegend,
          top: 0,
          left: 'right',
          icon: 'rect',
          itemWidth: 12,
          itemHeight: 5,
          itemGap: 20
        },
        xAxis: {
          type: 'category',
          data: this.xAxis,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        yAxis: {
          type: 'value',
          // show: this.isYAxis,
          name: this.isUnit ? '单位' : '',
          nameTextStyle: {
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#ccc'
            },
            show: true
          },
          axisLabel: {
            show: this.isYAxis
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series
      }
    },
    // 初始化
    init() {
      this.$refs[this.id] && this.$refs[this.id].resize()
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
.chart {
  height: 100%;
  height: 100%;
}
</style>
