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
      const wrapColors = ['rgba(243,108,94,0.2)', 'rgba(250,205,137,0.2)', 'rgba(206,199,255,0.2)']
      const wrapList = []
      this.dataList.forEach((e, i) => {
        const item = Object.assign({}, e, {
          itemStyle: {
            color: wrapColors[i]
          }
        })
        wrapList.push(item)
      })
      this.option = {
        tooltip: {
          trigger: 'item'
        },
        color: ['#f36c5e', '#facd89', '#cec7ff'],
        legend: {
          bottom: '5%',
          left: 'center',
          icon: 'circle',
          itemGap: 20
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
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
            radius: ['50%', '56%'],
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
.chart {
  height: 100%;
  height: 100%;
}
</style>
