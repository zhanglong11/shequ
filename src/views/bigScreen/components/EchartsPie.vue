<template>
  <div class="chart-con">
    <div class="total" :class="legendPosition">
      <p class="number">{{ total }}</p>
      <p>总数</p>
    </div>
    <VChart :ref="id" class="chart" :option="option" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    // 图例位置
    legendPosition: {
      type: String,
      default: 'bottom'
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
      option: {},
      total: 0
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
        'rgba(255,105,97,0.2)',
        'rgba(255,186,39,0.2)',
        'rgba(253,213,106,0.2)',
        'rgba(75,145,247,0.2)',
        'rgba(115,221,255,0.2)',
        'rgba(48,225,160,0.2)'
      ]
      const wrapList = []
      let total = 0
      this.dataList.forEach((e, i) => {
        total += e.value || 0
        const item = Object.assign({}, e, {
          itemStyle: {
            color: wrapColors[i]
          }
        })
        wrapList.push(item)
      })
      this.total = total

      const legend = {
        bottom: 0,
        left: 'center',
        icon: 'roundRect',
        itemWidth: 14,
        itemGap: 20
      }
      let center = ['50%', '38%']
      if (this.legendPosition === 'right') {
        legend.top = 'middle'
        legend.right = 0
        legend.bottom = 'auto'
        legend.left = 'auto'
        legend.orient = 'vertical'
        center = ['44%', '50%']
      }
      this.option = {
        tooltip: {
          trigger: 'item'
        },
        color: ['#ff6961', '#ffba27', '#fdd56a', '#4b91f7', '#73ddff', '#30e1a0'],
        legend,
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            z: 3,
            labelLine: {
              length: 6,
              length2: 5
            },
            center,
            label: {
              formatter: '{per|{d}%}',
              rich: {
                per: {
                  color: '#333'
                }
              }
            },
            data: this.dataList
          },
          {
            name: '',
            type: 'pie',
            radius: ['30%', '61%'],
            z: 2,
            center,
            tooltip: {
              show: false
            },
            label: {
              show: false
            },
            data: wrapList
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
.chart-con {
  height: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .total {
    margin-top: -70px;
    &.right {
      margin-top: 0;
      margin-left: -40px;
    }
    p {
      margin: 0;
      padding: 0;
      font-size: 13px;
      text-align: center;
      &.number {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
.chart {
  height: 100%;
  height: 100%;
  position: absolute !important;
  top: 0;
  left: 0;
}
</style>
