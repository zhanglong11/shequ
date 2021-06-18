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
    yAxis: {
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
        ['#ff6961', '#ff9455'],
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
          showBackground: true,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
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
          emphasis: {
            itemStyle: {
              color: wrapColors[i][0]
            }
          },
          data: e
        })
      })
      this.option = {
        grid: {
          top: '3%',
          left: '3%',
          right: '3%',
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
          itemWidth: 14,
          itemGap: 20
        },
        xAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#ccc'
            },
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: this.yAxis,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          inverse: true
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
