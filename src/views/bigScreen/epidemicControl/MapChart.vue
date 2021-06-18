<template>
  <div id="map-chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from 'echarts'
import china from './china.json'
export default {
  props: {
    option: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      chart: null, // domObject
      fixedData: [
        {
          name: '南海诸岛',
          value: 0
        },
        {
          name: '北京市',
          value: 0
        },
        {
          name: '天津市',
          value: 0
        },
        {
          name: '上海市',
          value: 0
        },
        {
          name: '重庆市',
          value: 0
        },
        {
          name: '河北省',
          value: 0
        },
        {
          name: '河南省',
          value: 0
        },
        {
          name: '云南省',
          value: 0
        },
        {
          name: '辽宁省',
          value: 0
        },
        {
          name: '黑龙江省',
          value: 0
        },
        {
          name: '湖南省',
          value: 0
        },
        {
          name: '安徽省',
          value: 0
        },
        {
          name: '山东省',
          value: 0
        },
        {
          name: '新疆维吾尔自治区',
          value: 0
        },
        {
          name: '江苏省',
          value: 0
        },
        {
          name: '浙江省',
          value: 0
        },
        {
          name: '江西省',
          value: 0
        },
        {
          name: '湖北省',
          value: 0
        },
        {
          name: '广西壮族自治区',
          value: 0
        },
        {
          name: '甘肃省',
          value: 0
        },
        {
          name: '山西省',
          value: 0
        },
        {
          name: '内蒙古自治区',
          value: 0
        },
        {
          name: '陕西省',
          value: 0
        },
        {
          name: '吉林省',
          value: 0
        },
        {
          name: '福建省',
          value: 0
        },
        {
          name: '贵州省',
          value: 0
        },
        {
          name: '广东省',
          value: 0
        },
        {
          name: '青海省',
          value: 0
        },
        {
          name: '西藏自治区',
          value: 0
        },
        {
          name: '四川省',
          value: 0
        },
        {
          name: '宁夏回族自治区',
          value: 0
        },
        {
          name: '海南省',
          value: 0
        },
        {
          name: '台湾省',
          value: 0
        },
        {
          name: '香港特别行政区',
          value: 0
        },
        {
          name: '澳门特别行政区',
          value: 0
        }
      ],
      fixedOption: {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            // console.log(params)
            if (!params.value) {
              return '该地区暂无数据'
            }
            // return params.seriesName + '<br />' + params.name + '：' + params.value
            return params.name + '<br />' + '确诊病例：' + params.value
          },
          confine: true
        },
        visualMap: {
          type: 'piecewise',
          // min: 0,
          // max: 10000,
          pieces: [
            { min: 10000, label: '≥10000人', color: '#871d29' },
            { min: 1000, max: 9999, label: '1000-9999人', color: '#e9544e' },
            { min: 100, max: 999, label: '100-999人', color: '#fe8664' },
            { min: 10, max: 99, label: '10-99人', color: '#ffbb98' },
            { min: 1, max: 9, label: '1-9人', color: '#ffe2d2' },
            { min: 0, max: 0, label: '0人', color: '#ececec' }
          ],
          // text: ['高', '低'],
          showLabel: true,
          realtime: false,
          calculable: true,
          itemWidth: 16,
          itemHeight: 10
          // inRange: {
          //   color: ['#ffffff', '#e9544e']
          // }
        },
        // geo: [
        //   {
        //     map: 'china',
        //     regions: [
        //       {
        //         name: '南海诸岛',
        //         itemStyle: {
        //           // 隐藏地图
        //           normal: {
        //             opacity: 0, // 为 0 时不绘制该图形
        //           }
        //         },
        //         label: {
        //           show: false // 隐藏文字
        //         }
        //       }
        //     ]
        //   }
        // ],
        series: [
          {
            name: '',
            type: 'map',
            zoom: 1.4,
            selectedMode: false,
            label: {
              show: false
            },
            // roam: true,
            // center: [104.97, 35.71],
            center: [104.97, 37.71],
            mapType: 'china',
            // geoIndex: 0,
            itemStyle: {
              // normal: {label: {show: true}},
              emphasis: { label: { show: true } }
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    option: {
      handler: function (val) {
        if (this.chart && val) {
          const option = _.cloneDeep(this.fixedOption)
          const newData = _.cloneDeep(this.fixedData)
          for (let i = 0; i < val.length; i++) {
            for (let j = 0; j < newData.length; j++) {
              if (newData[j].name.indexOf(val[i].name) !== -1) {
                newData[j].value = val[i].total.confirm
                break
              }
            }
          }
          option.series[0].data = newData
          // option.visualMap.max = _.orderBy(newData, 'value', 'desc')[0].value

          // console.log(newData)
          this.chart.setOption(option)
        }
      },
      deep: true
    }
  },

  mounted() {
    echarts.registerMap('china', china)
    this.drawChart()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeFun)
    this.resizeFun = null
  },
  methods: {
    drawChart() {
      this.chart = echarts.init(document.getElementById('map-chart'))
      const option = _.cloneDeep(this.fixedOption)
      option.series[0].data = _.cloneDeep(this.fixedData)
      this.chart.setOption(option)
      window.addEventListener('resize', this.resizeFun)
    },
    resizeFun() {
      this.chart.resize()
    }
  }
}
</script>

<style lang="less" scoped></style>
