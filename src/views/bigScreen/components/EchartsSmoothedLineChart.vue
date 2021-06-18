<template>
  <VChart :ref="id" class="chart" :option="option" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    id: {
      type: String,
      default: ''
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
  watch: {
    dataList(oldVal, newVal) {
      if (newVal) {
        this.setOptions()
      }
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
      // const wrapColors = [
      //   'rgba(255,105,97,0.2)',
      //   'rgba(255,186,39,0.2)',
      //   'rgba(253,213,106,0.2)',
      //   'rgba(75,145,247,0.2)',
      //   'rgba(115,221,255,0.2)',
      //   'rgba(48,225,160,0.2)'
      // ]
      // const wrapList = []
      // this.dataList.forEach((e, i) => {
      //   const item = Object.assign({}, e, {
      //     itemStyle: {
      //       color: wrapColors[i]
      //     }
      //   })
      //   wrapList.push(item)
      // })

      // const legend = {
      //   bottom: 0,
      //   left: 'center',
      //   icon: 'roundRect',
      //   itemWidth: 14,
      //   itemGap: 20
      // }
      // let center = ['50%', '44%']
      // console.log(1111, this.legendPosition)
      // if (this.legendPosition === 'right') {
      //   legend.top = 'middle'
      //   legend.right = 0
      //   legend.bottom = 'auto'
      //   legend.left = 'auto'
      //   legend.orient = 'vertical'
      //   center = ['44%', '50%']
      // }
      this.option = {
        title: {
          subtext: '单位'
        },
        color: this.id === 'partySmoothed' ? '#ff794e' : '#73b2ff',
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: false
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        grid: {
          left: 40,
          top: 40,
          bottom: 30
        },
        series: [
          {
            name: '',
            type: 'line',
            smooth: true,
            data: this.dataList,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.id === 'partySmoothed' ? '#f3c1c2' : '#ccdef9'
                  },
                  {
                    offset: 1,
                    color: 'rgba(245,245,245,0)'
                  }
                ])
              }
            }
          }
        ]
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
  width: 100%;
  height: 100%;
}
</style>
