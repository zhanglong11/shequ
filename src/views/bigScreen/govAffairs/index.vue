<template>
  <div>
    <div class="left">
      <!-- 重点人员 start -->
      <BigCard :icon="require('../images/title/title2.png')" title="重点人员">
        <div class="key-personnel">
          <div v-for="(item, i) in dataList" :key="i" class="personnel-item">
            <div class="title">{{ item.personAttributionName }}</div>
            <EchartsBar
              :id="`comprehensiveControlBar_${i}`"
              :isLegend="false"
              :xAxis="item.xAxis"
              :isUnit="false"
              :dataList="item.dataList"
            />
          </div>
        </div>
      </BigCard>
      <!-- 重点人员 end -->
    </div>

    <div class="center">
      <!-- 事件统计 start -->
      <IncidentInfoChart />
      <!-- 事件统计 end -->

      <!-- 重点区域 start -->
      <KeyRegionInfoChart />
      <!-- 重点区域 end -->
    </div>

    <div class="right">
      <!-- 通知公告 start -->
      <BigCard overflow :icon="require('../images/title/title7.png')" title="通知公告">
        <Grid v-if="request" ref="table" :request="request" :isPagination="false" height="100%">
          <vxe-table-column title="公告标题" field="title" />
          <vxe-table-column title="公告类型" field="typeName" />
          <vxe-table-column title="发布时间" field="createTime" formatter="ymd" />
        </Grid>
      </BigCard>
      <!-- 通知公告 end -->

      <!-- 诉求建议 start -->
      <BigCard class="suggestions-card" :icon="require('../images/title/title6.png')" title="诉求建议">
        <div class="suggestions">
          <div class="personnel-item">
            <div class="title">居民诉求</div>
            <EchartsPie v-if="appealList" id="complaintPie" legendPosition="right" :dataList="appealList" />
          </div>
          <div class="personnel-item">
            <div class="title">居民意见</div>
            <EchartsPie v-if="opinionList" id="suggestionsPie" legendPosition="right" :dataList="opinionList" />
          </div>
        </div>
      </BigCard>
      <!-- 诉求建议 end -->
    </div>
  </div>
</template>

<script>
import BigCard from '../components/BigCard' // 卡片
import EchartsPie from '../components/EchartsPie' // 环形图
import EchartsBar from '../components/EchartsBar' // 柱状图
import IncidentInfoChart from '../components/EchartsComponents/IncidentInfoChart' // 事件统计
import KeyRegionInfoChart from '../components/EchartsComponents/KeyRegionInfoChart' // 重点区域

import Api from '../api/govAffairs'
import talentApi from '../api/talent'
const keyPersonnelColors = [
  ['#ff6961', '#ff9254'],
  ['#529dfd', '#98c9fc'],
  ['#70c1b4', '#0fd797'],
  ['#f2b617', '#f3d584'],
  ['#f56ac2', '#ffbbe6']
]
export default {
  components: {
    BigCard,
    EchartsPie,
    EchartsBar,
    IncidentInfoChart,
    KeyRegionInfoChart
  },
  data() {
    // 这里存放数据
    return {
      request: '',
      dataList: [],
      appealList: '',
      opinionList: ''
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
  },
  // 方法集合
  methods: {
    // 初始化
    init() {
      this.getGovernmentKeyPersonList()
      this.getGovernmentAppealOpinionCount()
      this.getInformList()
    },
    // 重点人员
    async getGovernmentKeyPersonList() {
      // const list = [
      //   // 综合治理
      //   {
      //     personAttributionName: '综合治理',
      //     xAxis: ['矫正人员', '吸毒人员', '劳改人员', '妨碍治安人员', '刑满释放人员'],
      //     dataList: [
      //       [
      //         {
      //           value: 6,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[0][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[0][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[0][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[0][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[0][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[0][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[0][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[0][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[0][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[0][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         }
      //       ]
      //     ]
      //   },
      //   // 民政
      //   {
      //     personAttributionName: '民政',
      //     xAxis: [
      //       '80-89岁高龄老人',
      //       '90-99岁高龄老人',
      //       '100岁以上高龄老人',
      //       '低保人员',
      //       '困难残疾人员',
      //       '重度残疾人员'
      //     ],
      //     dataList: [
      //       [
      //         {
      //           value: 70,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[1][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[1][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 18,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[1][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[1][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[1][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[1][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 20,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[1][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[1][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 20,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[1][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[1][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 42,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[1][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[1][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         }
      //       ]
      //     ]
      //   },
      //   // 计生
      //   {
      //     personAttributionName: '计生',
      //     xAxis: ['育龄妇女数', '已婚育龄妇女数', '独生子女', '生育二胎', '残疾儿童'],
      //     dataList: [
      //       [
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[2][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[2][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[2][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[2][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[2][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[2][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[2][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[2][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[2][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[2][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         }
      //       ]
      //     ]
      //   },
      //   // 文化宣传
      //   {
      //     personAttributionName: '文化宣传',
      //     xAxis: ['歌唱类', '舞蹈类', '曲艺类', '棋牌类', '书法类'],
      //     dataList: [
      //       [
      //         {
      //           value: 21,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[3][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[3][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 37,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[3][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[3][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 15,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[3][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[3][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 19,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[3][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[3][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 23,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[3][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[3][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         }
      //       ]
      //     ]
      //   },
      //   // 武装部
      //   {
      //     personAttributionName: '武装部',
      //     xAxis: ['伤残军人', '军人家属', '烈士家属', '退伍军人', '复员军人'],
      //     dataList: [
      //       [
      //         {
      //           value: 6,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[4][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[4][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[4][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[4][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[4][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[4][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[4][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[4][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         },
      //         {
      //           value: 0,
      //           itemStyle: {
      //             color: {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 0,
      //               y2: 1,
      //               colorStops: [
      //                 {
      //                   offset: 0,
      //                   color: keyPersonnelColors[4][0] // 0% 处的颜色
      //                 },
      //                 {
      //                   offset: 1,
      //                   color: keyPersonnelColors[4][1] // 100% 处的颜色
      //                 }
      //               ]
      //             }
      //           }
      //         }
      //       ]
      //     ]
      //   }
      // ]
      // this.dataList = list
      const result = await Api.getGovernmentKeyPersonList()
      const datas = result.data
      datas.forEach((e, i) => {
        const xAxis = []
        const dataList = [[]]
        for (const key in e.keyPersonInfo) {
          const item = e.keyPersonInfo[key]
          xAxis.push(key)
          dataList[0].push({
            value: item,
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
                    color: keyPersonnelColors[i][0] // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: keyPersonnelColors[i][1] // 100% 处的颜色
                  }
                ]
              }
            }
          })
        }
        e.xAxis = xAxis
        e.dataList = dataList
      })
      this.dataList = datas
    },
    // 通知公告-列表
    async getInformList() {
      const result = await talentApi.queryInformList()
      const datas = result.data || []
      this.request = async () => {
        const records = _.filter(datas, e => e.parentType !== 'module_9')
        return {
          records,
          total: datas.length
        }
      }
    },
    // 投诉建议
    async getGovernmentAppealOpinionCount() {
      const result = await Api.getGovernmentAppealOpinionCount()
      const datas = result.data
      this.appealList = [
        { value: datas.appealTodo, name: '未处理' },
        { value: datas.appealDone, name: '已处理' }
      ]
      this.opinionList = [
        { value: datas.opinionTodo, name: '未处理' },
        { value: datas.opinionDone, name: '已处理' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../common.scss';
@import './govAffairs.scss';
</style>
