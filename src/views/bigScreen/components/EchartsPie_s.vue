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
    title: {
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
        'rgba(255,105,97,0.2)',
        'rgba(255,186,39,0.2)',
        'rgba(253,213,106,0.2)',
        'rgba(75,145,247,0.2)',
        'rgba(115,221,255,0.2)',
        'rgba(48,225,160,0.2)'
      ]
      const wrapList = []
      this.dataList.forEach((e, i) => {
        const item = Object.assign({}, e, {
          itemStyle: {
            color: wrapColors[i]
          }
        })
        wrapList.push(item)
      })

      const legend = {
        bottom: 0,
        left: 'center',
        icon: 'roundRect',
        itemWidth: 14,
        itemGap: 20
      }
      let center = ['50%', '42%']
      console.log(1111, this.legendPosition)
      if (this.legendPosition === 'right') {
        legend.top = 'middle'
        legend.right = 0
        legend.bottom = 'auto'
        legend.left = 'auto'
        legend.orient = 'vertical'
        center = ['44%', '50%']
      }
      this.option = {
        title: {
          text: this.title,
          left: 'center',
          top: 0,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        color: ['#ff6961', '#ffba27', '#fdd56a', '#4b91f7', '#73ddff', '#30e1a0'],
        legend,
        series: [
          {
            name: '',
            type: 'pie',
            radius: [15, 90],
            labelLine: {
              length: 0,
              length2: 15
            },
            center,
            roseType: 'area',

            label: {
              formatter: '{per|{d}%}',
              rich: {
                per: {
                  color: '#333'
                }
              }
            },
            data: this.dataList
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
  height: 100%;
  height: 100%;
}
</style>
